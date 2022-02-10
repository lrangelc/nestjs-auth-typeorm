import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
    postgresUrl: process.env.DATABASE_URL,
    postgres: {
      host: process.env.POSTGRES_HOST,
      dbName: process.env.POSTGRES_DB,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    },
    mysql: {
      host: process.env.MYSQL_HOST,
      dbName: process.env.MYSQL_DB,
      port: parseInt(process.env.MYSQL_PORT, 10),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    },
    sqlserver: {
      host: process.env.SQLSERVER_HOST,
      dbName: process.env.SQLSERVER_DB,
      port: parseInt(process.env.SQLSERVER_PORT, 10),
      user: process.env.SQLSERVER_USER,
      password: process.env.SQLSERVER_PASSWORD,
    },
  };
});
