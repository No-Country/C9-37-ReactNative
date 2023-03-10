const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  sequelize.define(
    "pet",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      breed: {
        type: DataTypes.STRING,
        allowNull: false
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      timestamps: false
    }
  );
};
