import dbConnectionService from './DbConnectionService';
import dbQueryService from './DbQueryService';
import logger from './LoggerService';
/* eslint class-methods-use-this:off */

class RatingsService {
  async postRatings(emotionId) {
    const connection = await dbConnectionService.pool.getConnectionAsync();
    try {
      const dbRatingsQuery = dbQueryService.queries.postRatings;
      await connection.queryAsync(dbRatingsQuery, {
        EmotionId: emotionId,
      });
      return {
        message: 'You are successfuly rated',
      };
    } catch (error) {
      logger.error({
        error: 'PostRatingsError', stack: error.stack,
      });
      throw error;
    } finally {
      connection.release();
    }
  }
}
export default new RatingsService();
