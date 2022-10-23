const express = require("express");
const router = express.Router();

const CartManager = require("../controllers/cart.manager");
const managerCart = new CartManager();

const ProductManager = require('../controllers/product.manager')
const managerProduct = new ProductManager()

router.post("/", (req, res) => {
  managerCart
    .create(req.body)
    .then((result) => res.send(result))
    .catch((err) => res.send({ error: 0, description: err }));
});

router.delete("/:id", (req, res) => {
  managerCart
    .delete(req.params.id)
    .then((result) => res.send(result))
    .catch((err) => res.send({ error: 0, description: err }));
});

router.get("/:id/productos", (req, res) => {
  if (isNaN(req.params.id))
    return res.status(404).send({
      error: -2,
      description: `ruta ${req.baseUrl}${req.url} metodo ${req.method} no implementad@`,
    });
  managerCart
    .findById(req.params.id)
    .then((result) => res.send(result))
    .catch((err) => res.send({ error: 0, description: err }));
});

router.post("/:id/productos", async (req, res) => {
  if (isNaN(req.params.id))
    return res.status(404).send({
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
  managerCart
    .update(req.params.id, req.body)
    .then((result) => res.send(result))
    .catch((err) => res.send({ error: 0, description: err }));
});

router.delete("/:id/productos/:id_prod", (req, res) => {
    managerCart
      .deleteProduct(req.params.id, req.params.id_prod)
      .then((result) => res.send(result))
      .catch((err) => res.send({ error: 0, description: err }));
  });

module.exports = router
