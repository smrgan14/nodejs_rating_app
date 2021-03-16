/* eslint "class-methods-use-this": "off" */
import googleAuthService from '../Service/GoogleOAuthService';

export default async (req, res, next) => {
  try {
    if (req.path === '/config' && req.method === 'GET') {
      next();
    } else if (req.path === '/rating/create' && req.method === 'POST') {
      next();
    } else {
      let token = req.headers.authorization;
      if (token) {
        token = token.replace('Bearer ', '');
        const verifyToken = await googleAuthService.verifyGoogleToken(token);
        if (verifyToken) {
          res.setHeader('Authorization', `Bearer ${token}`);
          next();
        } else {
          const tokens = await googleAuthService.refreshAccesToken(token);
          res.setHeader('Authorization', `Bearer ${tokens.id_token}`);
          next();
        }
      } else {
        res.status(401).json({ message: 'Token is not provided.' });
      }
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
