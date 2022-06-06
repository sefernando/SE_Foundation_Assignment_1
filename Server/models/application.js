"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Plan, Task }) {
      // define association here
      this.hasMany(Plan, {
        foreignKey: "app_acronym",
      });

      this.hasMany(Task, {
        foreignKey: "app_acronym",
      });
    }
  }
  Application.init(
    {
      acronym: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        autoIncrement: false,
        primaryKey: true,
        field: "acronym",
      },
      description: {
        type: DataTypes.STRING(4096),
        field: "description",
      },
      rNumber: { type: DataTypes.INTEGER, field: "rNumber" },
      startDate: { type: DataTypes.DATEONLY, field: "startDate" },
      endDate: { type: DataTypes.DATEONLY, field: "endDate" },

      permitOpen: { type: DataTypes.STRING, field: "permit_open" },
      permitToDoList: {
        type: DataTypes.STRING,
        field: "permit_toDoList",
      },
      permitDoing: { type: DataTypes.STRING, field: "permit_doing" },
      permitDone: { type: DataTypes.STRING, field: "permit_done" },
      permitCreate: { type: DataTypes.STRING, field: "permit_create" },
    },
    {
      sequelize,
      modelName: "Application",
      timestamps: false,
    }
  );
  return Application;
};
