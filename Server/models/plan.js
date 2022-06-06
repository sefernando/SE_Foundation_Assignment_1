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
        foreignKey: "task_plan",
      });
    }
  }
  Plan.init(
    {
      mvpName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        autoIncrement: false,
        primaryKey: true,
        field: "mvp_name",
      },
      startDate: { type: DataTypes.DATEONLY, field: "startDate" },
      endDate: { type: DataTypes.DATEONLY, field: "endDate" },
    },
    {
      sequelize,
      modelName: "Plan",
      timestamps: false,
    }
  );
  return Plan;
};
