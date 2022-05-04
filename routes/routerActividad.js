const express = require("express");
const router = express.Router();

const Joi = require("joi");
const { Calendario, Usuario, Actividad } = require("../models/relations");

const middleware = require("../jwt/middleware");


//GET actividad by ID
router.get("/:id", function (req, res) {
  Actividad.findByPk(req.params.id).then((response) => {
    if (response === null) {
      return res
        .status(404)
        .send("La actividad con el ID indicado no fue encontrada.");
    }
    res.send(response);
  });
});


//POST create actividad
router.post("/", middleware.checkToken, function (req, res) {
    const { error } = validate(req.body);
  
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
  
    Actividad.create(req.body).then((result) => {
      res.send(result);
    });
  });


//PUT update actividad by id
router.put("/:id", middleware.checkToken, function (req, res) {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  Actividad.update(req.body, { where: { id: req.params.id } }).then(
    (response) => {
      if (response[0] !== 0) {
        res.send({ message: "Actividad actualizada." });
      } else {
        res.status(404).send({
          message: "La actividad con el ID indicado no fue encontrada.",
        });
      }
    },
  );
});

//DELETE actividad by id
router.delete("/:id", middleware.checkToken, function (req, res) {
  Actividad.destroy({
    where: {
      id: req.params.id,
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
});

//Validacion
const validate = (user) => {
  const schema = Joi.object({
    id: Joi.number(),
    fecha: Joi.date().required(),
    hora_inicio: Joi.string().max(7).required(),
    hora_fin: Joi.string().max(7).required(),
    descripcion: Joi.string().required(),
    prioridad: Joi.string().required(),
    estado: Joi.string().required(),
  });
  return schema.validate(user);
};

module.exports = router;