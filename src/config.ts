export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    username: process.env.MONGO_INITDB_ROOT_USERNAME,
    password: process.env.MONGO_INITDB_ROOT_PASSWORD,
    dbName: process.env.MONGO_DB,
    dbHost: process.env.MONGO_HOST,
    dbPort: parseInt(process.env.MONGO_PORT, 10),
    dbConnection: process.env.MONGO_CONNECTION,
  },
});
