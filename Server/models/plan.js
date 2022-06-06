"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Task }) {
      // define association here
      this.hasMany(Task, {
        foreignKey: "Task_plan",
      });
    }
  }
  Plan.init(
    {
      planMVPName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        autoIncrement: false,
        primaryKey: true,
        field: "Plan_MVP_name",
      },
      planStartDate: { type: DataTypes.DATEONLY, field: "Plan_startDate" },
      planEndDate: { type: DataTypes.DATEONLY, field: "Plan_endDate" },
    },
    {
      sequelize,
      modelName: "Plan",
      timestamps: false,
    }
  );
  return Plan;
};
