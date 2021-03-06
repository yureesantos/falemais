import Sequelize from 'sequelize';

import Plan from '../app/models/Plan';
import Call from '../app/models/Call';
import Price from '../app/models/Price';

import databaseConfig from '../config/database';

const models = [Plan, Call, Price];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
