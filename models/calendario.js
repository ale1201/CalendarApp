const { DataTypes, Model } = require("sequelize");
const sequelize = require("../lib/sequelize");

const Usuario = require("./usuario");

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

Calendario.Usuario = Calendario.belongsTo(Usuario, {
  foreignKey: {
    allowNull: true,
  },
});

Calendario.sync()

module.exports = Calendario;
