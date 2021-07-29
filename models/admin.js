'use strict';
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('admin', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        is: /^[a-zA-Z ]+$/i,
      }
    },
    email: {
      type: DataTypes.STRING(100),
      unique : true,
      allowNull: true,
      validate: {
        isEmail: {
          msg: "Email address must be valid"
        }
      }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate : {
        cannotBe : function(value) {
          if (value == '123456') {
            throw new Error("password cannot be 123456");
          }
        }
      }
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: true,
    underscored: true,
    paranoid: true 
  });
  
  return Admin;
};