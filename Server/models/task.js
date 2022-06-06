"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Task.init(
    {
      taskName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        autoIncrement: false,
        primaryKey: true,
        field: "Task_name",
      },
      taskDescription: {
        type: DataTypes.STRING(4096),
        field: "Task_Description",
      },
      taskNotes: {
        type: DataTypes.TEXT,
        field: "Task_notes",
        get() {
          return this.getDataValue("taskNotes").split(";");
        },
        set(val) {
          this.setDataValue("taskNotes", val.join(";"));
        },
      },
      taskId: {
        type: DataTypes.STRING,
        field: "Task_Id",
      },
      taskState: {
        type: DataTypes.STRING,
        field: "Task_state",
      },
      taskCreator: {
        type: DataTypes.STRING,
        field: "Task_creator",
      },
      taskOwner: {
        type: DataTypes.STRING,
        field: "Task_owner",
      },
      taskCreateDate: {
        type: DataTypes.STRING,
        field: "Task_createDate",
      },
    },
    {
      sequelize,
      modelName: "Task",
      timestamps: false,
    }
  );
  return Task;
};
