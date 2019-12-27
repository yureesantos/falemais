import Sequelize, { Model } from 'sequelize';

class Price extends Model {
  static init(sequelize) {
    super.init(
      {
        source: Sequelize.INTEGER,
        destination: Sequelize.INTEGER,
        price: Sequelize.DOUBLE,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Price;
