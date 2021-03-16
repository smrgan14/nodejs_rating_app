import express from 'express';
import configController from '../Controller/ConfigController';

const config = express.Router();

config.get('/', configController.getSettings);
config.put('/update', configController.updateSettings);

export default config;
