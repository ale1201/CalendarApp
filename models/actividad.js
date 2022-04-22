const { DataTypes, Model } = require("sequelize");
const sequelize = require("../lib/sequelize");

const Seguro = require("./seguro");
const LineaVeterinaria = require("./lineaveterinaria");

class Actividad extends Model { }

Actividad.init(
  {
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hora_inicio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hora_fin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      prioridad: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Actividad",
  },
);




module.exports = Actividad;