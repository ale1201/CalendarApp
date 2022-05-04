const { DataTypes, Model } = require("sequelize");
const sequelize = require("../lib/sequelize");

const Calendario = require("./calendario");

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
      estado: {
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

Actividad.Calendario = Actividad.belongsTo(Calendario, {
  foreignKey: {
    allowNull: true,
  },
});

Actividad.sync()

module.exports = Actividad;