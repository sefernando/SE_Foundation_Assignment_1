"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsToMany(User, {
        through: "Users_Groups",
        foreignKey: "groupId",
        timestamps: false,
      });
    }
  }
  Group.init(
    {
      groupName: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    {
      sequelize,
      modelName: "Group",
      timestamps: false,
    }
  );
  return Group;
};
