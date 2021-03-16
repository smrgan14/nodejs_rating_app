require('dotenv').config();

export default {
  environment: process.env.NODE_ENV || 'development',
  serverPort: process.env.SERVER_PORT || 8080,
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
  },
  googleAuth: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirect: process.env.GOOGLE_CLIENT_REDIRECT,
  },
};
