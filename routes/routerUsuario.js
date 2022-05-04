const express = require("express");
const router = express.Router();

const Joi = require("joi");
const { Calendario, Usuario, Actividad } = require("../models/relations");

const middleware = require("../jwt/middleware");

//GET all usuarios sin token middleware.checkToken,
router.get("/", function (req, res) {
  if (req.query.username) {
    Usuario.findOne({ where: { username: req.query.username } }).then(
      (response) => {
        if (response === null) {
          return res
            .status(404)
            .send("Hubo un problema generando los usuarios");
        }
        res.send(response);
      },
    );
  } else {
    Usuario.findAll().then((result) => res.send(result));
  }
});

//GET usuario by ID
router.get("/:id", function (req, res) {
  Usuario.findByPk(req.params.id).then((response) => {
    if (response === null) {
      return res
        .status(404)
        .send("El Usuario con el ID indicado no fue encontrada.");
    }
    res.send(response);
  });
});

//GET usuario by username
router.get("/username/:username", function (req, res) {
  Usuario.findOne({
    where: {
      username: req.params.username,
    },
  }).then((response) => {
    if (response === null) {
      return res
        .status(404)
        .send("El usuario con el usuario indicado no existe.");
    }
    res.send(response);
  });
});

//POST create usuario
router.post("/", function (req, res) {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error);
  }

  Usuario.findOne({
    where: {
      username: req.body.username,
    },
  }).then((response) => {
    if (response === null) {
      req.body.puntos = 0;
      req.body.sal = Usuario.beforeCreateSal(req.body.contrasena)[1]
      req.body.contrasena = Usuario.beforeCreateSal(req.body.contrasena)[0]
      console.log(req.body.contrasena)
  Usuario.create(req.body)
    .then((result) => res.send(result))
    .catch((error) => {
        console.log(error)
        res.status(403).send(error);
      
    });

    }
    else{
      return res
        .status(400)
        .send("El usuario ya existe.");
    }
    
  });

});

//PUT update usuario by id
router.put("/:id", middleware.checkToken, function (req, res) {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  Usuario.update(req.body, { where: { id: req.params.id } }).then(
    (response) => {
      if (response[0] !== 0) {
        res.send({ message: "Usuario actualizado." });
      } else {
        res.status(404).send({
          message: "El usuario con el ID indicado no fue encontrado.",
        });
      }
    },
  );
});

//DELETE usuario by id
router.delete("/:id", middleware.checkToken, function (req, res) {
  Usuario.destroy({
    where: {
      id: req.params.id,
    },
  }).then((response) => {
    if (response === 1) {
      res.status(204).send();
    } else {
      res.status(404).send({
        message: "El usuario con el ID indicado no fue encontrado.",
      });
    }
  });
});

//Relations

//POST Calendario by usuario id
router.post("/:idUsuario/calendario", middleware.checkToken, function (req, res) {
  Usuario.findByPk(req.params.idUsuario).then((user) => {
    if (user === null) {
      return res
        .status(404)
        .send("El Usuario con el ID indicado no fue encontrada.");
    }
    let body = req.body;
    //const { error } = validateReserva(body);
    //if (error) {
    //  return res.status(400).send(error);
    //}
    Calendario.create(body).then((calendario) => {
        calendario.setUsuario(user).then((result) => res.json(result));
    });
  });
});

//GET all calendarios by usuario id
router.get("/:idUsuario/calendario", middleware.checkToken, function (req, res) {
  Calendario.findAll({
    where: {
      UsuarioId: req.params.idUsuario,
    },
  }).then((response) => {
    if (response.length === 0) {
      res.send(
        "No existen calendarios para el usuario con id " + req.params.idUsuario,
      );
    }
    res.send(response);
  });
});

//GET calendario by id from usuario by user id
router.get(
  "/:idUsuario/calendario/:idCalendario",
  middleware.checkToken,
  function (req, res) {
    Calendario.findOne({
      where: {
        id: req.params.idCalendario,
        UsuarioId: req.params.idUsuario,
      },
    }).then((result) => {
      if (result === null) {
        res.status(404).send("El calendario no existe en este usuario");
      }
      res.send(result);
    });
  },
);

//UPDATE calendario by id from usuario by id
router.put(
  "/:idUsuario/calendario/:idCalendario",
  middleware.checkToken,
  function (req, res) {
    Calendario.update(req.body, {
      where: {
        id: req.params.idCalendario,
        UsuarioId: req.params.idUsuario,
      },
    }).then((response) => {
      if (response[0] !== 0) {
        res.send({ message: "Calendario actualizado." });
      } else {
        res.status(404).send({
          message: "El calendario con el ID indicado no fue encontrado.",
        });
      }
    });
  },
);

//DELETE calendario by id from usuario by id
router.delete(
  "/:idUsuario/calendario/:idCalendario",
  middleware.checkToken,
  function (req, res) {
    Calendario.destroy({
      where: {
        id: req.params.idCalendario,
        UsuarioId: req.params.idUsuario,
      },
    }).then((response) => {
      if (response === 1) {
        res.status(204).send();
      } else {
        res.status(404).send({
          message: "El calendario con el ID indicado no fue encontrado.",
        });
      }
    });
  },
);


//Validacion
const validate = (user) => {
  const schema = Joi.object({
    id: Joi.number(),
    username: Joi.string().max(50).required(),
    contrasena: Joi.string().required(),
    semestre: Joi.number().required(),
    puntos: Joi.number(),
    sal: Joi.string(),
  });
  return schema.validate(user);
};

module.exports = router;
