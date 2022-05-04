const express = require("express");
const router = express.Router();

const Joi = require("joi");
const { Calendario, Usuario, Actividad } = require("../models/relations");

const middleware = require("../jwt/middleware");


//GET usuario by ID
router.get("/:id", function (req, res) {
  Calendario.findByPk(req.params.id).then((response) => {
    if (response === null) {
      return res
        .status(404)
        .send("El Calendario con el ID indicado no fue encontrado.");
    }
    res.send(response);
  });
});


//POST create calendario
router.post("/", middleware.checkToken, function (req, res) {
    const { error } = validate(req.body);
  
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
  
    Calendario.create(req.body).then((result) => {
      res.send(result);
    });
  });


//PUT update usuario by id
router.put("/:id", middleware.checkToken, function (req, res) {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  Calendario.update(req.body, { where: { id: req.params.id } }).then(
    (response) => {
      if (response[0] !== 0) {
        res.send({ message: "Calendario actualizado." });
      } else {
        res.status(404).send({
          message: "El calendario con el ID indicado no fue encontrado.",
        });
      }
    },
  );
});

//DELETE calendario by id
router.delete("/:id", middleware.checkToken, function (req, res) {
  Calendario.destroy({
    where: {
      id: req.params.id,
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
});

//Relations

//POST Actividad by calendario id
router.post("/:idCalendario/actividad", middleware.checkToken, function (req, res) {
  Calendario.findByPk(req.params.idCalendario).then((calendar) => {
    if (calendar === null) {
      return res
        .status(404)
        .send("El calendario con el ID indicado no fue encontrado.");
    }
    let body = req.body;
    //const { error } = validateReserva(body);
    //if (error) {
    //  return res.status(400).send(error);
    //}
    Actividad.create(body).then((actividad) => {
        actividad.setCalendario(calendar).then((result) => res.json(result));
    });
  });
});

//GET all actividad by calendario id
router.get("/:idCalendario/actividad", middleware.checkToken, function (req, res) {
  Actividad.findAll({
    where: {
      CalendarioId: req.params.idCalendario,
    },
  }).then((response) => {
    if (response.length === 0) {
      res.send(
        "No existen actividades para el calendario con id " + req.params.idCalendario,
      );
    }
    res.send(response);
  });
});

//GET actividad by id from calendario by calendario id
router.get(
  "/:idCalendario/actividad/:idActividad",
  middleware.checkToken,
  function (req, res) {
    Actividad.findOne({
      where: {
        id: req.params.idActividad,
        CalendarioId: req.params.idCalendario,
      },
    }).then((result) => {
      if (result === null) {
        res.status(404).send("La actividad no existe en este calendario");
      }
      res.send(result);
    });
  },
);

//UPDATE actividad by id from calendario by id
router.put(
  "/:idCalendario/actividad/:idActividad",
  middleware.checkToken,
  function (req, res) {
    Actividad.update(req.body, {
      where: {
        id: req.params.idActividad,
        CalendarioId: req.params.CalendarioId,
      },
    }).then((response) => {
      if (response[0] !== 0) {
        res.send({ message: "Actividad actualizada." });
      } else {
        res.status(404).send({
          message: "La actividad con el ID indicado no fue encontrada.",
        });
      }
    });
  },
);

//DELETE calendario by id from usuario by id
router.delete(
  "/:idCalendario/actividad/:idActividad",
  middleware.checkToken,
  function (req, res) {
    Actividad.destroy({
      where: {
        id: req.params.idActividad,
        CalendarioId: req.params.idCalendario,
      },
    }).then((response) => {
      if (response === 1) {
        res.status(204).send();
      } else {
        res.status(404).send({
          message: "La actividad con el ID indicado no fue encontrada.",
        });
      }
    });
  },
);

//Validacion
const validate = (user) => {
  const schema = Joi.object({
    id: Joi.number(),
    nombre: Joi.string().max(50).required(),
    color: Joi.string().required(),
  });
  return schema.validate(user);
};

module.exports = router;
