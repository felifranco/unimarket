export default () => ({
  appPort: parseInt(process.env.APP_PORT!, 10) || 3000,
});
