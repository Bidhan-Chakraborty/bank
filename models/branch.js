'use strict';
module.exports = (sequelize, DataTypes) => {
  const Branch = sequelize.define('branch', {
    id : {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    bank_id: {
      type : DataTypes.BIGINT(20),
      allowNull : false
    },
    branch: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ifsc: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    district: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    timestamps: false,
    underscored: true,
    paranoid: false,
    tableName : 'branches'
  });
  Branch.associate = function(models) {
    Branch.belongsTo(models.bank, { as: 'bank', foreignKey: 'bank_id', targetKey: 'id' })
  };
  return Branch;
};