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
  try {
    const carrito = await managerCart.findById(req.params.id)
    console.log(carrito);
    const producto = await managerProduct.findById(req.body.id)
    carrito.products.push(producto)
    await managerCart.update(carrito, req.params.id)
    res.json(carrito.products)
  } catch {
    return { error: 0, description: "error" };
  }
});

router.delete("/:id/productos/:id_prod", (req, res) => {
    managerCart
      .delete(req.params.id, req.params.id_prod)
      .then((result) => res.send(result))
      .catch((err) => res.send({ error: 0, description: err }));
  });

module.exports = router
