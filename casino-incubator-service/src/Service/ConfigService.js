import translationService from './TranslationsService';
import dbConnectionService from './DbConnectionService';
import dbQueryService from './DbQueryService';
import logger from './LoggerService';
import emitterService from './EmitterService';

/* eslint "class-methods-use-this":"off" */
class ConfigService {
  async getSettings() {
    const connection = await dbConnectionService.pool.getConnectionAsync();

    try {
      const dbSettingsQuery = dbQueryService.queries.getSettings;
      const dbEmotionsQuery = dbQueryService.queries.getEmotions;
      const dbSettingsQueryResult = await connection.queryAsync(dbSettingsQuery);
      const dbEmotionsQueryResult = await connection.queryAsync(dbEmotionsQuery);
      const translationsResult = translationService.getTranslations();
      return {
        config: {
          emotions: dbEmotionsQueryResult,
          numberOfEmotions: dbSettingsQueryResult[0].NumberOfEmotions,
          messageTimeOut: dbSettingsQueryResult[0].MessageTimeout,
          ratingMessage: dbSettingsQueryResult[0].Message,
          translations: translationsResult,
        },
      };
    } catch (error) {
      logger.error({
        error: 'GetSettingsError', stack: error.stack,
      });
      throw error;
    } finally {
      connection.release();
    }
  }

  async updateSettings(numberOfEmotions, ratingMessage, messageTimeOut) {
    const connection = await dbConnectionService.pool.getConnectionAsync();

    try {
      const dbUpdateConfigQuery = dbQueryService.queries.putConfiguration;
      await connection.queryAsync(dbUpdateConfigQuery, {
        NumberOfEmotions: numberOfEmotions,
        Message: ratingMessage,
        MessageTimeout: messageTimeOut,
      });

      emitterService.emit('settingsChanged', {
        config:
          {
            numberOfEmotions,
            ratingMessage,
            messageTimeOut,
          },
      });

      return {
        message: 'Configuration update completed',
      };
    } catch (error) {
      logger.error({
        error: 'UpdateSettingsError', stack: error.stack,
      });
      throw error;
    } finally {
      connection.release();
    }
  }
}

export default new ConfigService();
