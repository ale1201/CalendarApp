const express = require("express");
const router = express.Router();

const Joi = require("joi");
const { Usuario, Actividad } = require("../models/relations");

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

//GET usuario by email. If not, then post
router.get("/email/:email", function (req, res) {
  Usuario.findOne({
    where: {
      email: req.params.email,
    },
  }).then((response) => {
    if (response === null) {
      res.send(null);
    }
    console.log(response)
    res.send(response);
  });
});


//POST create usuario when no exists
router.post("/email", function (req, res) {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error);
  }
  Usuario.findOne({
    where: {
      email: req.body.email,
    },
    }).then((response) => {
    if (response === null) {
      req.body.puntos = 0;
    Usuario.create(req.body)
    .then((result) => res.send(result))
    .catch((error) => {
        console.log(error)
        res.status(403).send(error);
    });

    }
    else{
      res.send(response);
    }
    
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
router.patch("/:id", function (req, res) {
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
router.delete("/:id", function (req, res) {
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

//POST actividad by usuario id
router.post("/:idUsuario/actividad", middleware.checkToken, function (req, res) {
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
    Actividad.create(body).then((actividad) => {
      actividad.setUsuario(user).then((result) => res.json(result));
    });
  });
});

//GET all actividades by usuario id
router.get("/:idUsuario/actividades", function (req, res) {
  Actividad.findAll({
    where: {
      UsuarioId: req.params.idUsuario,
    },
  }).then((response) => {
    if (response.length === 0) {
      res.send(
        "No existen actividades para el usuario con id " + req.params.idUsuario,
      );
    }
    else
      res.send(response);
  });
});

//GET actividad by id from usuario by user id
router.get(
  "/:idUsuario/actividad/:idActividad",
  middleware.checkToken,
  function (req, res) {
    Actividad.findOne({
      where: {
        id: req.params.idActividad,
        UsuarioId: req.params.idUsuario,
      },
    }).then((result) => {
      if (result === null) {
        res.status(404).send("La actividad no existe en este usuario");
      }
      res.send(result);
    });
  },
);

//UPDATE actividad by id from usuario by id
router.put(
  "/:idUsuario/actividad/:idActividad",
  middleware.checkToken,
  function (req, res) {
    Actividad.update(req.body, {
      where: {
        id: req.params.idActividad,
        UsuarioId: req.params.idUsuario,
      },
    }).then((response) => {
      if (response[0] !== 0) {
        res.send({ message: "Actividad actualizada." });
      } else {
        res.status(404).send({
          message: "La actividad con el ID indicado no fue encontrado.",
        });
      }
    });
  },
);

//DELETE actividad by id from usuario by id
router.delete(
  "/:idUsuario/actividad/:idActividad",
  middleware.checkToken,
  function (req, res) {
    Actividad.destroy({
      where: {
        id: req.params.idActividad,
        UsuarioId: req.params.idUsuario,
      },
    }).then((response) => {
      if (response === 1) {
        res.status(204).send();
      } else {
        res.status(404).send({
          message: "La actividad con el ID indicado no fue encontrado.",
        });
      }
    });
  },
);


//Validacion
const validate = (user) => {
  const schema = Joi.object({
    id: Joi.number(),
    username: Joi.string().max(50),
    imagen: Joi.string(),
    email: Joi.string(),
    semestre: Joi.number(),
    puntos: Joi.number(),
    sal: Joi.string(),
  });
  return schema.validate(user);
};

module.exports = router;
