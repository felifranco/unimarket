export default () => ({
  appPort: parseInt(process.env.APP_PORT!, 10) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  database: {
    type: process.env.DB_TYPE || "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT!, 10) || 5432,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE || "postgres",
  },
});
