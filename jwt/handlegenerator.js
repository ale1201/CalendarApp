let jwt = require("jsonwebtoken");
const config = require("./config.js");
const { Usuario } = require("../models/relations");

class HandlerGenerator {
  login(req, res) {
    console.log(req.body);
    let username = req.body.username;
    let password = req.body.contrasena;
    let mockedUsername = "toBeImportedFromDB";
    let mockedPassword = "toBeImportedFromDB";
    let mockedSalt = "toBeImportedFromDB";
    Usuario.findAll({
      raw: true,
      limit: 1,
      where: {
        username: username,
      },
    }).then((info_usuario) => {
      if (info_usuario[0] !== null) {
        
        let usuario = info_usuario[0];
        mockedUsername = usuario.username;
        mockedPassword = usuario.contrasena;
        mockedSalt = usuario.sal;
        if (username && password) {
          console.log("miauuu")
          console.log(Usuario.generateHash("123456", "$2a$08$bTeeOH1enkitRRdZJJ80de"))
          password = Usuario.generateHash(password, mockedSalt);
          console.log("miauuusdsf")
          console.log(username, mockedUsername, password, mockedPassword)
          if (username === mockedUsername ) {
            console.log("miauuu")
            let token = jwt.sign({ username: username }, config.secret, {
              expiresIn: "24h",
            });
            res.cookie('token', token, { httpOnly: false, domain: null }).json
              ({
                success: true,
                message: "Login successful!",
                token: token,
              });
          } else {
            res.sendStatus(403).json({
              success: false,
              message: "Incorrect username or password",
            });
          }
        } else {
          res.sendStatus(400).json({
            success: false,
            message: "Authentication error! check request",
          });
        }
      } else {
        res.statusCode = 403;
        res.json({
          success: false,
          message: "Incorrect username or password",
        });
      }
    }).catch((error) => {
      console.log(error.message);
      if (error.message.includes('Cannot read property ')) {
        res.statusCode = 404;
        res.json({
          success: false,
          message: "User not found",
        });
      }
      else {
        res.sendStatus(500).json({
          success: false,
          message: "Internal server error",
        })
      }
    });
  }

  index(req, res) {
    // Retorna una respuesta exitosa con previa validación del token
    res.json({
      success: true,
      message: "Index page",
    });
  }
}

module.exports = HandlerGenerator;
