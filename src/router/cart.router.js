const express = require("express");
const router = express.Router();

const Manager = require("../controllers/cart.manager");
const manager = new Manager();

router.post("/", (req, res) => {
  manager
    .create(req.body)
    .then((result) => res.send(result))
    .catch((err) => res.send({ error: 0, description: err }));
});

router.delete("/:id", (req, res) => {
  manager
    .delete(req.params.id)
    .then((result) => res.send(result))
    .catch((err) => res.send({ error: 0, description: err }));
});

router.get("/:id", (req, res) => {
  if (isNaN(req.params.id))
    return res.status(404).send({
      error: -2,
      description: `ruta ${req.baseUrl}${req.url} metodo ${req.method} no implementad@`,
    });
  manager
    .findById(req.params.id)
    .then((result) => res.send(result))
    .catch((err) => res.send({ error: 0, description: err }));
});

router.post("/:id", (req, res) => {
  if (isNaN(req.params.id))
    return res.status(404).send({
      error: -2,
      description: `ruta ${req.baseUrl}${req.url} metodo ${req.method} no implementad@`,
    });
  if (
    !req.body.id ||
    !req.body.title ||
    !req.body.price ||
    !req.body.thumbnail ||
    !req.body.code ||
    !req.body.stock
  )
    return res.send({ error: "Data is required" });
  manager
    .update(req.params.id, req.body)
    .then((result) => res.send(result))
    .catch((err) => res.send({ error: 0, description: err }));
});

router.delete("/:id/productos/:id_prod", (req, res) => {
    manager
      .delete(req.params.id, req.params.id_prod)
      .then((result) => res.send(result))
      .catch((err) => res.send({ error: 0, description: err }));
  });

module.exports = router;
