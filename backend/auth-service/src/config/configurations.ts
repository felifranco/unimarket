import { defaultValues } from 'src/constants/auth.constants';

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
  },
});
