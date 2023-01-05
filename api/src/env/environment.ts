import { TypeOrmModuleOptions } from '@nestjs/typeorm';

interface Config {
  db: TypeOrmModuleOptions;
  secret: string;
}

export const env: Config = {
  db: {
    username: 'admin',
    password: 'password',
    database: 'db',
    host: 'localhost',
    port: 5430,
    synchronize: true,
    type: 'postgres',
    entities: ["dist/**/*.entity{.ts,.js}"]
  },
  secret: 'lolkek',
};
