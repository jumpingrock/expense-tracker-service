module.exports = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'etdb',
    port: 5432,
    host: 'postgres',
    dialect: 'postgres',
    seederStorage: 'sequelize',
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PWD,
    database: 'test-etdb',
    host: process.env.DB_HOSTNAME,
    dialect: 'postgres',
    dialectOptions: {
      socketPath: process.env.DB_HOSTNAME,
    },
    seederStorage: 'sequelize',
  },
  staging: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PWD,
    database: 'stg-etdb',
    host: process.env.DB_HOSTNAME,
    dialect: 'postgres',
    dialectOptions: {
      socketPath: process.env.DB_HOSTNAME,
    },
    seederStorage: 'sequelize',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
};
