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
        foreignKey: "Plan_app_Acronym",
      });
      this.hasMany(Task, {
        foreignKey: "Task_app_Acronym",
      });
    }
  }
  Application.init(
    {
      appAcronym: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        autoIncrement: false,
        primaryKey: true,
        field: "App_Acronym",
      },
      appDescription: {
        type: DataTypes.STRING(4096),
        field: "App_Description",
      },
      appRnumber: { type: DataTypes.INTEGER, field: "App_Rnumber" },
      appStartDate: { type: DataTypes.DATEONLY, field: "App_startDate" },
      appEndDate: { type: DataTypes.DATEONLY, field: "App_endDate" },

      appPermitOpen: { type: DataTypes.STRING, field: "App_Permit_Open" },
      appPermitToDoList: {
        type: DataTypes.STRING,
        field: "App_Permit_toDoList",
      },
      appPermitDoing: { type: DataTypes.STRING, field: "App_Permit_Doing" },
      appPermitDone: { type: DataTypes.STRING, field: "App_Permit_Done" },
    },
    {
      sequelize,
      modelName: "Application",
      timestamps: false,
    }
  );
  return Application;
};
