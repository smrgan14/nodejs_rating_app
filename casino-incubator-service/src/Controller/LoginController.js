/* eslint "class-methods-use-this": "off" */
import googleAuthService from '../Service/GoogleOAuthService';

class LoginController {
  googleAuth(req, res) {
    res.send(googleAuthService.getGoogleAuthUrl()).status(200);
  }

  async googleGetTokens(req, res) {
    const { code } = req.query;
    try {
      const tokens = await googleAuthService.getGoogleTokens(code);
      res.json({
        access_token: tokens.id_token,
      }).status(200);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
export default new LoginController();
