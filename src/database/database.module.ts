import { Module, Global } from '@nestjs/common';
// import { Client } from 'pg';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { host, dbName, port, user, password } = configService.postgres;
        // const { host, dbName, port, user, password } = configService.sqlserver;

        // const { host, dbName, port, user, password } = configService.mysql;
        console.log(host, dbName, port, user, password);

        return {
          type: 'postgres',
          // type: 'mssql',
          // type: 'mysql',
          host,
          port,
          username: user,
          password,
          database: dbName,
          synchronize: false,
          autoLoadEntities: true,
          options: {
            encrypt: false,
          },
        };
        // return {
        //   type: 'mysql',
        //   host: 'localhost',
        //   port: 3306,
        //   username: 'root',
        //   password: '123456',
        //   database: 'my_DB',
        //   entities: [],
        //   synchronize: true,
        //   autoLoadEntities: true,
        // };
      },
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    // {
    //   provide: 'PG',
    //   useFactory: (configService: ConfigType<typeof config>) => {
    //     const { host, dbName, port, user, password } = configService.postgres;
    //     const client = new Client({
    //       host,
    //       database: dbName,
    //       port: port,
    //       user,
    //       password,
    //     });

    //     client.connect();
    //     return client;
    //   },
    //   inject: [config.KEY],
    // },
  ],
  // exports: ['API_KEY', 'PG', TypeOrmModule],
  exports: ['API_KEY', TypeOrmModule],
})
export class DatabaseModule { }
