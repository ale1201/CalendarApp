const sequelize = require("../lib/sequelize");
const Actividad = require("./actividad");
const Calendario = require("./calendario");
const Usuario = require("./usuario");

//Usuario
Usuario.hasMany(Calendario);

//Calendario
Calendario.hasMany(Actividad);
Calendario.belongsTo(Usuario)

//Actividad
Actividad.belongsTo(Calendario);

sequelize.sync();

module.exports = {
    Usuario,
    Calendario,
    Actividad,
  };