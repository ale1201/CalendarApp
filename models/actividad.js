const { DataTypes, Model } = require("sequelize");
const sequelize = require("../lib/sequelize");

const Usuario = require("./usuario");

class Actividad extends Model { }

Actividad.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    day: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hourIni: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hourFin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    priority: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      estado: {
        type: DataTypes.STRING,
        allowNull: true,
      },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Actividad",
  },
);

Actividad.Usuario = Actividad.belongsTo(Usuario, {
  foreignKey: {
    allowNull: true,
  },
});

Actividad.sync()

module.exports = Actividad;