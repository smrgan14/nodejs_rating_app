import mysql from 'mysql';
import config from '../config';

const options = config.db;

class DbConnectionService {
  constructor() {
    this.pool = mysql.createPool({
      host: options.host,
      user: options.user,
      password: options.password,
      database: options.database,
      port: options.port,
      queryFormat: function queryFormat(query, values) {
        return query.replace(/@(\w+)/g, (txt, key) => {
          if (Object.prototype.hasOwnProperty.call(values, key)) {
            return this.escape(values[key]);
          }

          return txt;
        });
      },
    });
  }
}

export default new DbConnectionService();
