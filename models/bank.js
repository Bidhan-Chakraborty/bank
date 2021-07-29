'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bank = sequelize.define('bank', {
    id : {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    timestamps: false,
    underscored: true,
    paranoid: false,
    tableName : 'banks'
  });
  Bank.associate = function(models) {
    Bank.hasMany(models.branch, { as: 'branches', foreignKey: 'bank_id', targetKey: 'id' })
  };
  return Bank;
};