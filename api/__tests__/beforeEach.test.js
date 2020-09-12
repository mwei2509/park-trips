const path = require('path');

const { sequelize } = require('../src/models');

const dbRequiredDirectories = [
  path.join(__dirname, 'controllers'),
  path.join(__dirname, 'models'),
  path.join(__dirname, 'routes')
];

beforeEach(async function () {
  const dbRequired = dbRequiredDirectories.some(dbRequiredDirectory =>
    this.currentTest.file.startsWith(dbRequiredDirectory)
  );

  if (dbRequired) {
    // Remark: sequelize.truncate will perform N separate truncate queries to the database where N is the amount of loaded sequelize models
    //
    // await sequelize.truncate({ force: true, cascade: true });
    //
    // Instead of performing N round-trips to the database we can build a query string and perform one round trip
    // This will help improve test speed since the beforeEach() block is called X times where X is the total number of tests
    //
    // Note: Dynamically create a truncate query based on all known models in sequelize
    let sql = 'TRUNCATE ';
    for (const model in sequelize.models) {
      // for every table name, append that name to truncate command
      sql += '"' + sequelize.models[model].getTableName() + '",';
    }
    sql = sql.substr(0, sql.length - 1); // remove trailing comma
    sql += ' CASCADE';
    await sequelize.query(sql);
  }
});
