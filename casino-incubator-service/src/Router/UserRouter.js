import express from 'express';
import userController from '../Controller/UserController';

const user = express.Router();

user.get('/tokens/:userId', userController.getTokensByUserId);
user.post('/add', userController.postUser);
user.put('/update/:userId', userController.putUser);
user.put('/tokens/update/:userId', userController.putTokens);
export default user;
