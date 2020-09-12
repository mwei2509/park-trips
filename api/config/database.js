require('dotenv').config({ path: '../.env' });

const defaultOptions = {
  dialect: 'postgres',
  username: 'parktrips',
  password: 'parktrips',
  logging: false,
  host: process.env.DB_HOSTNAME || 'localhost',
  migrationStorageTableName: 'sequelize_meta',
  define: { paranoid: true, underscored: true }
};

module.exports = {
  development: {
    ...defaultOptions,
    database: 'parktrips_development',
    logging: console.log
  },
  test: {
    ...defaultOptions,
    database: 'parktrips_test'
  },
  staging: {
    ...defaultOptions,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  production: {
    ...defaultOptions,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
};
