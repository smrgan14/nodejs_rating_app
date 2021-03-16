import dbConnectionService from './DbConnectionService';
import dbQueryService from './DbQueryService';
import logger from './LoggerService';

/* eslint "class-methods-use-this":"off" */
class UserService {
  async postUser(firstName, lastName, email, refreshToken) {
    const connection = await dbConnectionService.pool.getConnectionAsync();
    try {
      const dbPostUserQuery = dbQueryService.queries.postUsers;
      await connection.queryAsync(dbPostUserQuery, {
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        RefreshToken: refreshToken,
      });

      return { message: 'New user is successfully inserted' };
    } catch (error) {
      logger.error({
        error: 'PostUserError',
        stack: error.stack,
      });
      throw error;
    } finally {
      connection.release();
    }
  }

  async putUser(userId, firstName, lastName, email, refreshToken) {
    const connection = await dbConnectionService.pool.getConnectionAsync();
    try {
      const dbPutUserQuery = dbQueryService.queries.putUsers;
      await connection.queryAsync(dbPutUserQuery, {
        UserId: userId,
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        RefreshToken: refreshToken,
      });
      return { message: 'User info is successfuly updated' };
    } catch (error) {
      logger.error({
        error: 'PutUserError',
        stack: error.stack,
      });
      throw error;
    } finally {
      connection.release();
    }
  }

  async putTokens(email, refreshToken) {
    const connection = await dbConnectionService.pool.getConnectionAsync();
    try {
      const dbPutTokens = dbQueryService.queries.putTokens;
      await connection.queryAsync(dbPutTokens, {
        Email: email,
        RefreshToken: refreshToken,
      });
      return { message: 'Tokens are successfuly updated' };
    } catch (error) {
      logger.error({
        error: 'PutTokensError',
        stack: error.stack,
      });
      throw error;
    } finally {
      connection.release();
    }
  }

  async getTokensByUserId(userId) {
    const connection = await dbConnectionService.pool.getConnectionAsync();
    try {
      const dbTokensQuery = dbQueryService.queries.getTokensByUserId;
      const dbResult = await connection.queryAsync(dbTokensQuery, {
        UserId: userId,
      });
      return dbResult;
    } catch (error) {
      logger.error({
        error: 'UserServiceError',
        stack: error.stack,
      });

      throw error;
    } finally {
      connection.release();
    }
  }

  async getUserByEmail(email) {
    const connection = await dbConnectionService.pool.getConnectionAsync();

    try {
      const dbQuery = dbQueryService.queries.getUserByEmail;
      const dbResult = await connection.queryAsync(dbQuery, {
        Email: email,
      });
      return dbResult;
    } catch (error) {
      logger.error({
        error: 'PutUserError',
        stack: error.stack,
      });

      throw error;
    } finally {
      connection.release();
    }
  }

  async getRefreshTokenByEmail(email) {
    const connection = await dbConnectionService.pool.getConnectionAsync();
    try {
      const dbQuery = dbQueryService.queries.getRefreshTokenByEmail;
      const dbResult = await connection.queryAsync(dbQuery, {
        Email: email,
      });
      return dbResult[0].RefreshToken;
    } catch (error) {
      logger.error({
        error: 'PutUserError',
        stack: error.stack,
      });

      throw error;
    } finally {
      connection.release();
    }
  }
}

export default new UserService();
