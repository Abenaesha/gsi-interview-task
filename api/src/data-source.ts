import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Buildings } from './entities/Building';
import dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  synchronize: true,
  logging: false,
  entities: [Buildings],
  migrations: [],
  subscribers: [],
});
