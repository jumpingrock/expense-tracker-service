import { models } from './models';
import { Sequelize } from 'sequelize-typescript';
import config from '../../config/config';

const dbConfig = config[process.env.NODE_ENV];
let sequelize = null;

export const DB = {
  init: () => {
    const dbOptions: any = {
      host: dbConfig.host,
      dialect: dbConfig.dialect,
      pool: {
        min: 0,
        max: 5,
        acquire: 30000,
        idle: 10000,
      },
      models,
    };
    if (dbConfig.port) {
      dbOptions.port = dbConfig.port;
    }
    sequelize = new Sequelize(
      dbConfig.database,
      dbConfig.username,
      dbConfig.password,
      dbOptions,
    );
  },
  getInstance: (): Sequelize => {
    if (sequelize) {
      return sequelize;
    }
    throw new Error('Database not initialised');
  },
};
