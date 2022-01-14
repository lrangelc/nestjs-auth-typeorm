import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';
import { ConfigType } from '@nestjs/config';
import config from '../config';

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';

// const client = new Client({
//   host: 'localhost',
//   database: 'my_DB',
//   port: 5432,
//   user: 'root',
//   password: '123456',
// });

// client.connect();
// client.query(`SELECT * FROM tasks`, (err, res) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(res.rows);
// });

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { host, dbName, port, user, password } = configService.postgres;
        const client = new Client({
          host,
          database: dbName,
          port: port,
          user,
          password,
        });

        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'PG'],
})
export class DatabaseModule { }
