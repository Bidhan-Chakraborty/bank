'use strict';
module.exports = (sequelize, DataTypes) => {
  const RefreshToken = sequelize.define('refreshToken', {
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    }
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'refresh_tokens'
  });
  RefreshToken.associate = function(models) {
    // associations can be defined here
  };
  RefreshToken.removeAttribute('id');
  return RefreshToken;
};