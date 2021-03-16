import express from 'express';
import statisticsController from '../Controller/StatisticsController';

const statisticsRouter = express.Router();

statisticsRouter.get('/today', statisticsController.todayStats);
statisticsRouter.get('/period', statisticsController.periodStats);

export default statisticsRouter;
