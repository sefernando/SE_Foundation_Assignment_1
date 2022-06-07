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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        autoIncrement: false,
        primaryKey: true,
        field: "name",
      },
      description: {
        type: DataTypes.STRING(4096),
        field: "description",
      },
      notes: {
        type: DataTypes.TEXT,
        field: "notes",
        get() {
          return this.getDataValue("notes").split(";");
        },
        set(val) {
          this.setDataValue("notes", val.join(";"));
        },
      },
      id: {
        type: DataTypes.STRING,
        field: "id",
      },
      state: {
        type: DataTypes.STRING,
        field: "state",
      },
      creator: {
        type: DataTypes.STRING,
        field: "creator",
      },
      owner: {
        type: DataTypes.STRING,
        field: "owner",
      },
      createDate: {
        type: DataTypes.DATEONLY,
        field: "createDate",
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
