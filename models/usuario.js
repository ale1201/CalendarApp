const { DataTypes, Model } = require("sequelize");
const sequelize = require("../lib/sequelize");
const bcrypt = require("bcrypt-nodejs");

class Usuario extends Model { }

Usuario.init(
  {
    username: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    semestre: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    puntos: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    sal: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Usuario",
  },
);

Usuario.generateHash = function (password, salt) {
  if (salt) {
    return bcrypt.hashSync(password, salt, null);
  } else {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  }
};

Usuario.beforeCreateSal = function (password) { 
  const generatedSalt = bcrypt.genSaltSync(8);
  const hashedPass = Usuario.generateHash(password, generatedSalt);
  contrasena = hashedPass;
  sal = generatedSalt;
  return [hashedPass, generatedSalt]
};

Usuario.beforeUpdate((user) => {
  if (user.contrasena) {
    const generatedSalt = bcrypt.genSaltSync(8);
    const hashedPass = Usuario.generateHash(user.contrasena, generatedSalt);
    user.contrasena = hashedPass;
    user.sal = generatedSalt;
  }
});



Usuario.sync()

module.exports = Usuario;
