const express = require("express");
const router = express.Router();

const Manager = require("../controllers/product.manager");
const manager = new Manager();

let isAdmin = true;

router.get("/", (req, res) => {
  manager
    .findAll()
    .then((result) => res.send(result))
    .catch((err) => res.send({ error: 0, description: err }));
});

router.get("/:id", (req, res) => {
  if (isNaN(req.params.id))
    return res
      .status(404)
      .send({
        error: -2,
        description: `ruta ${req.baseUrl}${req.url} metodo ${req.method} no implementad@`,
      });
  manager
    .findById(req.params.id)
    .then((result) => res.send(result))
    .catch((err) => res.send({ error: 0, description: err }));
});

router.post("/", (req, res) => {
  if (isAdmin === true) {
    if (
      !req.body.title ||
      !req.body.price ||
      !req.body.thumbnail ||
      !req.body.code ||
      !req.body.stock
    )
      return res.send({ error: "Data is required" });
    manager
      .create(req.body)
      .then((result) => res.send(result))
      .catch((err) => res.send({ error: 0, description: err }));
  } else {
    res.send({ error: 2, description: "You dont have permission to do this" });
  }
});

router.put("/", (req, res) => {
  if (isAdmin === true) {
    if (isNaN(req.params.id))
      return res
        .status(404)
        .send({
          error: -2,
          description: `ruta ${req.baseUrl}${req.url} metodo ${req.method} no implementad@`,
        });
    if (
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
  } else {
    res.send({ error: 2, description: "You dont have permission to do this" });
  }
});

router.delete("/:id", (req, res) => {
  if (isAdmin === true) {
    manager
      .delete(req.params.id)
      .then((result) => res.send(result))
      .catch((err) => res.send({ error: 0, description: err }));
  } else {
    res.send({ error: 2, description: "You dont have permission to do this" });
  }
});

module.exports = router;
