'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('refresh_tokens', {
      email: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      token: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('refresh_tokens');
  }
};