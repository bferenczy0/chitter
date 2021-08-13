'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.messages= this.belongsTo(models.message)
      this.Users = this.belongsTo(models.User)
      // define association here
    }
  };
  reply.init({
    text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'reply',
  });
  return reply;
};