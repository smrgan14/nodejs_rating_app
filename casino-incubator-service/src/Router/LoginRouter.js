import express from 'express';
import loginController from '../Controller/LoginController';

const loginRouter = express.Router();

loginRouter.get('/google', loginController.googleAuth);
loginRouter.get('/google/token', loginController.googleGetTokens);

export default loginRouter;
