'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pronostic = sequelize.define('Pronostic', {
    home_team: DataTypes.STRING,
    away_team: DataTypes.STRING,
    pronostic: DataTypes.STRING,
    matchId: DataTypes.INTEGER,
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
