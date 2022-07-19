const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('turismActivities', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    difficult: {
        type: DataTypes.ENUM((["1 - Very Easy", "2 - Easy", "3 - Intermediate", "4 - Hard", "5 - Very Hard", "Unspecified", ""])),
    },
    duration: {
        type: DataTypes.ENUM((["1 Hour", "2 Hours", "3 Hours", "4 Hours", "More than 5 Hours", "Unspecified", ""])),
    },
    season: {
        type: DataTypes.ENUM(["Summer", "Autumn", "Winter","Spring"]),
        allowNull: false
    },
    country: {
      allowNull: false,
      defaultValue: [],
      type: DataTypes.ARRAY(DataTypes.JSON),
    }
  });
};
