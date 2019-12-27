import Sequelize, { Model } from 'sequelize';

class Call extends Model {
  static init(sequelize) {
    super.init(
      {
        plan_id: Sequelize.INTEGER,
        source: Sequelize.INTEGER,
        destination: Sequelize.INTEGER,
        duration: Sequelize.INTEGER,
        price: Sequelize.DOUBLE,
        normal_price: Sequelize.VIRTUAL,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Plan, { foreignKey: 'plan_id' });
  }
}

export default Call;
