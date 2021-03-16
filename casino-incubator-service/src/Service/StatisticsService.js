import _ from 'lodash';
import moment from 'moment';
import dbConnectionService from './DbConnectionService';
import dbQueryService from './DbQueryService';
import logger from './LoggerService';
/* eslint "class-methods-use-this": "off", "arrow-body-style": "off" */

class StatisticsService {
  async getTodayStats(tzOffset) {
    const statistics = {};
    const connection = await dbConnectionService.pool.getConnectionAsync();
    try {
      const date = moment().format('YYYY-MM-DD');
      const dbQuery = dbQueryService.queries.getStatisticsToday;
      const dbQueryResults = await connection.queryAsync(dbQuery, {
        date,
        tzOffset,
      });

      statistics.todayRatings = this.createTodayStatObject(dbQueryResults);
    } catch (error) {
      logger.error({
        error: 'GetTodayStatsError', stack: error.stack,
      });
      throw error;
    } finally {
      connection.release();
    }

    return statistics;
  }

  createTodayStatObject(result) {
    const todayRatings = [];
    const date = moment.utc().startOf('day').toISOString();
    let hourObject = {};

    for (let hour = 0; hour < 24; hour += 1) {
      hourObject = { date, hour };
      hourObject.emotions = _.map(_.filter(result, item => item.Hour === hour), (obj) => {
        return {
          id: obj.EmotionId,
          name: obj.Name,
          count: obj.NumberOfRatings,
        };
      });
      if (hourObject.emotions.length > 0) {
        todayRatings.push(hourObject);
      }
    }

    return todayRatings;
  }

  async getPeriodStats(dateFrom, dateTo, tzOffset) {
    const statistics = {};
    const connection = await dbConnectionService.pool.getConnectionAsync();

    try {
      const dbQuery = dbQueryService.queries.getStatisticsByPeriod;
      const dbQueryResults = await connection.queryAsync(dbQuery, {
        dateFrom,
        dateTo,
        tzOffset,
      });

      statistics.reportRatings = this.createPeriodObject(dbQueryResults, tzOffset);
    } catch (error) {
      logger.error({
        error: 'GetPeriodStatsError', stack: error.stack,
      });
      throw error;
    } finally {
      connection.release();
    }

    return statistics;
  }

  createPeriodObject(result, tzOffset) {
    const datesArray = [];
    const dates = _.uniq(_.map(result, obj => obj.Date));
    for (let i = 0; i < dates.length; i += 1) {
      const date = {};
      let emotions = [];
      let happinesFactor = {};
      date.date = dates[i];

      emotions = _.map(
        _.filter(result, item => item.Date === date.date),
        o => ({
          id: o.EmotionId,
          name: o.Name,
          count: o.EmotionsCounts,
        }),
      );

      date.date = moment(dates[i]).utcOffset(tzOffset).toISOString();
      happinesFactor = _.sumBy(emotions, o => o.count);
      date.happinesFactor = happinesFactor / emotions.length;
      date.emotions = _.orderBy(emotions, item => item.id);

      datesArray.push(date);
    }

    return datesArray;
  }
}

export default new StatisticsService();
