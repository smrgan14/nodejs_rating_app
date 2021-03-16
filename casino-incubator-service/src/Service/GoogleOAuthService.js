/* eslint "class-methods-use-this": "off" */
import { google } from 'googleapis';
import jwtdecode from 'jwt-decode';
import config from '../config';
import userService from './UserService';

class GoogleOAuthService {
  constructor() {
    this.googleConfig = {
      clientId: config.googleAuth.clientId,
      clientSecret: config.googleAuth.clientSecret,
      redirect: config.googleAuth.redirect,
    };
    this.defaultScope = ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'];
    this.authObject = this.createOAuthObject();
  }

  createOAuthObject() {
    return new google.auth.OAuth2(
      this.googleConfig.clientId,
      this.googleConfig.clientSecret,
      this.googleConfig.redirect,
    );
  }

  getConnectionUrl(auth) {
    return auth.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: this.defaultScope,
    });
  }

  getGoogleAuthUrl() {
    return this.getConnectionUrl(this.authObject);
  }

  async getGoogleTokens(code) {
    try {
      const response = await this.authObject.getToken(code);
      const email = this.getGoogleEmail(response.tokens.id_token);
      userService.putTokens(email, response.tokens.refresh_token);
      return response.tokens;
    } catch (error) {
      throw error;
    }
  }

  async getGoogleUserInfo(token) {
    this.authObject.setCredentials({ access_token: token });
    const OAuth2 = google.oauth2({
      auth: this.authObject,
      version: 'v2',
    });

    const user = await OAuth2.userinfo.get();
    return user.data;
  }

  getGoogleEmail(token) {
    const decodedToken = jwtdecode(token);
    return decodedToken.email;
  }

  decodeGoogleToken(token) {
    return jwtdecode(token);
  }

  async checkGoogleToken(accessToken) {
    try {
      const tokenInfo = await this.authObject.getTokenInfo(accessToken);
      return tokenInfo;
    } catch (err) {
      throw err;
    }
  }

  async verifyGoogleToken(token) {
    try {
      const result = await this.authObject.verifyIdToken(
        {
          idToken: token,
          audience: this.authObject.clientId,
        },
      );
      return result.getPayload();
    } catch (error) {
      return false;
    }
  }

  async refreshGoogleToken(refreshToken) {
    try {
      const result = await this.authObject.refreshToken(refreshToken);
      return result.tokens;
    } catch (error) {
      throw error;
    }
  }

  async refreshAccesToken(accessToken) {
    try {
      const userEmail = await this.getGoogleEmail(accessToken);
      const refreshToken = await userService.getRefreshTokenByEmail(userEmail);
      const tokens = await this.refreshGoogleToken(refreshToken);
      return tokens;
    } catch (error) {
      error.message = 'Invalid token provided.';
      throw error;
    }
  }
}

export default new GoogleOAuthService();
