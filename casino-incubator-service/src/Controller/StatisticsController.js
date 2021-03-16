import statisticsService from '../Service/StatisticsService';

/* eslint "class-methods-use-this": "off" */
class StatisticsController {
  async todayStats(req, res) {
    try {
      const { tzOffset } = req.query;
      const data = await statisticsService.getTodayStats(tzOffset);
      res.status(200).send(data);
    } catch (error) {
      res.status(400).send({ messageDetails: error.message });
    }
  }

  async periodStats(req, res) {
    try {
      const data = await statisticsService.getPeriodStats(
        req.query.dateFrom,
        req.query.dateTo,
        req.query.tzOffset,
      );

      res.status(200).send(data);
    } catch (error) {
      res.status(400).send({ messageDetails: error.message });
    }
  }
}

export default new StatisticsController();
