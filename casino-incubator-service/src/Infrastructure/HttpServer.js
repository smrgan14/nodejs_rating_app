import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import io from 'socket.io';
import ratingRouter from '../Router/RatingRouter';
import authMiddleware from '../Middleware/AuthMiddleware';
import statisticsRouter from '../Router/StatisticsRouter';
import configRouter from '../Router/ConfigRouter';
import userRouter from '../Router/UserRouter';
import logger from '../Service/LoggerService';
import config from '../config';
import emitterService from '../Service/EmitterService';
import loginRouter from '../Router/LoginRouter';

class HttpServer {
  constructor(options = {}) {
    this.port = options.port || config.serverPort;
    this.app = express();
    this.server = http.createServer(this.app);
    this.socket = this.createSocketInstance();
  }

  start() {
    this.register();
    this.server.listen(this.port, () => {
      logger.info('Server started');
    });
    this.setEventListeners();
  }

  register() {
    this.app.use(bodyParser());
    this.app.use(cors());
    this.app.get('/', (req, res) => {
      res.json({
        message: 'Casino Team Server',
      });
    });
    this.app.use('/login', loginRouter);

    this.app.use(authMiddleware);
    this.app.use('/rating', ratingRouter);
    this.app.use('/config', configRouter);
    this.app.use('/statistics', statisticsRouter);
    this.app.use('/user', userRouter);
  }

  createSocketInstance() {
    const socketIo = io(this.server);

    socketIo.on('error', (error) => {
      logger.error({
        error: 'SocketError', stack: error,
      });
    });

    return socketIo;
  }

  setEventListeners() {
    emitterService.on('settingsChanged', (data) => {
      this.socket.emit('settings', data);
    });
  }
}

export default new HttpServer();
