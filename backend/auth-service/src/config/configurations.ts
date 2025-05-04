import { defaultValues } from 'src/constants/app.constants';

export default () => ({
  appPort: parseInt(process.env.APP_PORT!, 10) || defaultValues.APP_PORT,
  nodeEnv: process.env.NODE_ENV || defaultValues.NODE_ENV,
  database: {
    type: process.env.DB_TYPE || defaultValues.database.DB_TYPE,
    host: process.env.DB_HOST || defaultValues.database.DB_HOST,
    port: parseInt(process.env.DB_PORT!, 10) || defaultValues.database.DB_PORT,
    username: process.env.DB_USER || defaultValues.database.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE || defaultValues.database.DB_DATABASE,
  },
  jwt: {
    secret: process.env.JWT_SECRET || defaultValues.JWT_SECRET,
    expiresIn:
      process.env.JWT_EXPIRATION_TIME || defaultValues.JWT_EXPIRATION_TIME,
  },
  jwtRefresh: {
    secret: process.env.JWT_SECRET || defaultValues.JWT_SECRET,
    expiresIn:
      process.env.JWT_REFRESH_EXPIRATION_TIME ||
      defaultValues.JWT_REFRESH_EXPIRATION_TIME,
  },
});
