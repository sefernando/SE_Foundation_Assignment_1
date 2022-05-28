"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Group }) {
      // define association here
      this.belongsToMany(Group, {
        through: "Users_Groups",
        foreignKey: "userName",
        timestamps: false,
      });
    }
  }
  User.init(
    {
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        autoIncrement: false,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user",
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: false,
      // tableName: "users"
    }
  );
  return User;
};
