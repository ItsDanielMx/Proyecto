const express = require("express");
const router = express.Router();

//Archivo
// const CartManager = require("../controllers/cart.manager");
// const managerCart = new CartManager();

//Firebase
// const CartManager = require("../daos/firebase/firebase.cart.manager");
// const managerCart = new CartManager();

//Mongo
const CartManager = require("../daos/mongo/mongo.cart.manager");
const managerCart = new CartManager();

router.post("/", (req, res) => {
  if (
    !req.body.title ||
    !req.body.price ||
    !req.body.thumbnail ||
    !req.body.code ||
    !req.body.stock
  )
    return res.send({ error: "Data is required" });
  managerCart
    .CreateCart(req.body) //Firebase/Mongo
    // .create(req.body) //Archivo
    .then((result) => res.send(result))
    .catch((err) => res.send({ error: 0, description: err }));
});

router.delete("/:id", (req, res) => {
  managerCart
    .DeleteCartById(req.params.id) //Firebase/Mongo
    // .delete(req.params.id) //Archivo
    .then((result) => res.send(result))
    .catch((err) => res.send({ error: 0, description: err }));
});

router.get("/:id/productos", (req, res) => {
  managerCart
    .FindCartById(req.params.id) //Firebase/Mongo
    // .findById(req.params.id) //Archivo
    .then((result) => res.send(result))
    .catch((err) => res.send({ error: 0, description: err }));
});

router.post("/:id/productos", async (req, res) => {
  if (
    !req.body.title ||
    !req.body.price ||
    !req.body.thumbnail ||
    !req.body.code ||
    !req.body.stock
  )
    return res.send({ error: "Data is required" });
  managerCart
    .AddProduct(req.params.id, req.body) //Firebase/Mongo
    // .update(req.params.id, req.body) //Archivo
    .then((result) => res.send(result))
    .catch((err) => res.send({ error: 0, description: err }));
});

router.delete("/:id/productos/:id_prod", (req, res) => {
    managerCart
      .DeleteProductInCartById(req.params.id, req.params.id_prod) //Firebase/Mongo
      // .deleteProduct(req.params.id, req.params.id_prod) //Archivo
      .then((result) => res.send(result))
      .catch((err) => res.send({ error: 0, description: err }));
  });

module.exports = router
