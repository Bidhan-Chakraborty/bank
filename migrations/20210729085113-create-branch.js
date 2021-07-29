'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('branches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      bank_id: {
        type: Sequelize.BIGINT(20)
      },
      branch: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      ifsc: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      city: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      state: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      district: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      address: {
        type: Sequelize.STRING(255),
        allowNull: true
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('branches');
  }
};