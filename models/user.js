'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    team: DataTypes.INTEGER,
    followed_matches: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
      models.User.hasMany(models.Pronostic);
      models.User.hasMany(models.MatchNotification);
  };
  return User;
};
