'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Pronostics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      home_team: {
        allowNull: false,
        type: Sequelize.STRING
      },
      away_team: {
        allowNull: false,
        type: Sequelize.STRING
      },
      pronostic: {
        allowNull: false,
        type: Sequelize.STRING
      },
      matchId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      result: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id',
          }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Pronostics');
  }
};
