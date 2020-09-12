const { expect } = require('chai');
const sinon = require('sinon');
const models = require('../src/models');
const { sequelize } = models;
const requireDirectory = require('require-directory');

const migrations = requireDirectory(module, '../db/migrations');
const migrationKeys = Object.keys(migrations);

describe('Migrations', () => {
  let stub;
  const queryInterface = sequelize.getQueryInterface();

  beforeEach(() => {
    sinon.stub(queryInterface.sequelize, 'query').resolves([]);
    stub = sinon.stub(queryInterface);
    Object.getOwnPropertyNames(stub).forEach(name => {
      if (typeof stub[name] === 'function') {
        stub[name] = sinon.fake.resolves(true);
      }
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  it('up migrations always return a promise', () => {
    expect(migrationKeys.length).to.be.gt(0);

    for (let i = 0; i < migrationKeys.length; i++) {
      const migrationKey = migrationKeys[i];
      const migration = migrations[migrationKey];
      expect(migration.up, migrationKey).to.exist;
      expect(migration.up(stub, sequelize.Sequelize), migrationKey).to.be.an.instanceof(Promise);
    }
  });

  it('down migrations always return a promise', () => {
    for (let i = 0; i < migrationKeys.length; i++) {
      const migrationKey = migrationKeys[i];
      const migration = migrations[migrationKey];
      expect(migration.down, migrationKey).to.exist;
      expect(migration.down(stub, sequelize.Sequelize), migrationKey).to.be.an.instanceof(Promise);
    }
  });
});
