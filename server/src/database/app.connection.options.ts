import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions'

export const appConnectionOptions: MysqlConnectionOptions = {
  type: 'mysql',
  port: 3306,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  bigNumberStrings: false,
  entities: [
    `${
      process.env.NODE_ENV === 'production' ? 'dist' : '.'
    }/**/**.entity{.ts,.js}`
  ],
  synchronize: true,
  extra: { insecureAuth: true }
}

export const sqliteConnectionOptions: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'test.sqlite',
  entities: [
    `${
      process.env.NODE_ENV === 'production' ? 'dist' : '.'
    }/**/**.entity{.ts,.js}`
  ],
  synchronize: true
}
