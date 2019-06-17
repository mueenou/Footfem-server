'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    description: DataTypes.TEXT,
    matchId: DataTypes.INTEGER,
    comment_author: DataTypes.STRING,
    date: DataTypes.DATE
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
  };
  return Comment;
};