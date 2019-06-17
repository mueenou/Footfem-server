'use strict';
module.exports = (sequelize, DataTypes) => {
  const MatchNotification = sequelize.define('MatchNotification', {
    datetime: DataTypes.DATE,
    isFavorite: DataTypes.BOOLEAN,
    venue: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  MatchNotification.associate = function(models) {
    // associations can be defined here
      models.MatchNotification.belongsTo(models.User, {
        foreignKay: {
          allowNull: false,
        }
      })
  };
  return MatchNotification;
};
