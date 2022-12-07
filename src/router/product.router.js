const express = require("express");
const router = express.Router();

//Archivo
// const Manager = require("../controllers/product.manager");
// const manager = new Manager();

//Firebase
// const ProductManagerFirebase = require("../daos/firebase/firebase.product.manager");
// const manager = new ProductManagerFirebase();

//Mongo
const ProductManagerMongo = require("../daos/mongo/mongo.product.manager");
const manager = new ProductManagerMongo();

let isAdmin = true;

router.get("/", (req, res) => {
  manager
    .FindAll() //Firebase/Mongo
    // .findAll() Archivo
    .then((result) => res.send(result))
    .catch((err) => res.send({ error: 0, description: err }));
});

router.get("/:id", (req, res) => {
  manager
    .FindById(req.params.id) //Firebase/Mongo
    // .findById(req.params.id) //Archivo
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
      .Create(req.body) //Firebase/Mongo
      // .create(req.body) //Archivo
      .then((result) => res.send(result))
      .catch((err) => res.send({ error: 0, description: err }));
  } else {
    res.send({ error: 2, description: "You dont have permission to do this" });
  }
});

router.put("/", (req, res) => {
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
      .Update(req.params.id, req.body) //Firebase/Mongo
      // .update(req.params.id, req.body) //Archivo
      .then((result) => res.send(result))
      .catch((err) => res.send({ error: 0, description: err }));
  } else {
    res.send({ error: 2, description: "You dont have permission to do this" });
  }
});

router.delete("/:id", (req, res) => {
  if (isAdmin === true) {
    manager
      .Delete(req.params.id) //Firebase/Mongo
      // .delete(req.params.id) //Archivo
      .then((result) => res.send(result))
      .catch((err) => res.send({ error: 0, description: err }));
  } else {
    res.send({ error: 2, description: "You dont have permission to do this" });
  }
});

module.exports = router;
