const { DataTypes, Model } = require("sequelize");
const sequelize = require("../lib/sequelize");

const Seguro = require("./seguro");
const LineaVeterinaria = require("./lineaveterinaria");

class Calendario extends Model { }

Calendario.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Calendario",
  },
);


module.exports = Calendario;
