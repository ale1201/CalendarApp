const sequelize = require("../lib/sequelize");
const Actividad = require("./actividad");
const Usuario = require("./usuario");

//Usuario
Usuario.hasMany(Actividad);

//Actividad
Actividad.belongsTo(Usuario);

sequelize.sync();

module.exports = {
    Usuario,
    Actividad,
  };