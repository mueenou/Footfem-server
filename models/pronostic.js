'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pronostic = sequelize.define('Pronostic', {
    home_team: DataTypes.INTEGER,
    away_team: DataTypes.INTEGER,
    pronostic: DataTypes.INTEGER,
    result: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER
  }, {});
  Pronostic.associate = function(models) {
    // associations can be defined here
      models.Pronostic.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
        }
      })
  };
  return Pronostic;
};
