const fs = require("fs");

const pathToFile = "./src/data/carts.json";

class CartManager {
  create = async (cart) => {
    try {
      let id = 1;
      if (fs.existsSync(pathToFile)) {
        let data = await fs.promises.readFile(pathToFile, "utf-8");
        let carts = JSON.parse(data);
        if (carts.length > 0) id = carts[carts.length - 1].id + 1;
        cart = {
          id,
          timestamp: new Date().toDateString(),
          ...cart,
        };
        carts.push(cart);
        await fs.promises.writeFile(pathToFile, JSON.stringify(carts, null, 2));
      } else {
        cart = {
          id,
          timestamp: new Date().toDateString(),
          ...cart,
        };
        await fs.promises.writeFile(pathToFile, JSON.stringify([cart], null, 2));
      }
      return cart;
    } catch (err) {
      return { error: 0, description: "Error al acceder a la base de datos" };
    }
  };

  delete = async (id) => {
    id = parseInt(id);
    if (fs.existsSync(pathToFile)) {
      let isFound = false;
      let data = await fs.promises.readFile(pathToFile, "utf-8");
      let carts = JSON.parse(data);
      let newCarts = carts.filter((item) => item.id !== id);
      if (carts.length !== newCarts.length) isFound = true;
      if (!isFound) return { error: 0, description: "Carrito no encontrado" };
      await fs.promises.writeFile(
        pathToFile,
        JSON.stringify(newCarts, null, 2)
      );
      carts = newCarts;
      return carts;
    } else {
      return { error: 0, description: "No existe la base de datos" };
    }
  };

  findById = async (id) => {
    id = parseInt(id);
    if (!fs.existsSync(pathToFile))
      return { error: 0, description: "No existe la base de datos" };
    let data = await fs.promises.readFile(pathToFile, "utf-8");
    let carts = JSON.parse(data);
    let cart = carts.find((item) => item.id === id);
    if (!cart) return { error: 0, description: "Carrito no encontrado" };
    return cart;
  };

  update = async (id, product) => {
    try {
      id = parseInt(id)
      if (!fs.existsSync(pathToFile)) return { error: 0, description: "No existe la base de datos" }
      let data = await fs.promises.readFile(pathToFile, "utf-8")
      let carts = JSON.parse(data)
      let cart = carts.find((item) => item.id === id);
      if (!cart) return { error: 0, description: "Carrito no encontrado" }
      cart.products.push(product)
      let newCarts = carts.map(item => {
        if (item.id === id) {
          return cart
        } else {
          return item
        }
      })
      await fs.promises.writeFile(pathToFile, JSON.stringify(newCarts, null, 2))
      return newCarts
    } catch (err) {
      return { error: 0, description: "Error al acceder a la base de datos" };
    }
    
  }
/*
  deleteProduct = async (id, idProduct) => {
    //findById
    id = parseInt(id);
    if (fs.existsSync(pathToFile)) {
      let data = await fs.promises.readFile(pathToFile, "utf-8");
      let carts = JSON.parse(data);
      let cart = carts.find((item) => item.id === id);
      if (!cart) return { error: 0, description: "Carrito no encontrado" };

      //delete (?)
      idProduct = parseInt(idProduct);
      let isFound = false;
      let newCart = cart.filter((product) => product.idProduct !== idProduct);
      if (cart.length !== newCart.length) isFound = true;
      if (!isFound) return { error: 0, description: "Producto no encontrado" };
      await fs.promises.writeFile(pathToFile, JSON.stringify(newCart, null, 2));
      cart = newCart;
      return cart;
    } else {
      return { error: 0, description: "No se ha encontrado la base de datos" };
    }
  };*/
  deleteProduct = async (idCart, idProduct) => {
    try {
      idCart = parseInt(idCart)
      idProduct = parseInt(idProduct)
      if (!fs.existsSync(pathToFile)) return { error: 0, description: "No existe la base de datos" }
      let data = await fs.promises.readFile(pathToFile, "utf-8")
      let isFound = false
      let carts = JSON.parse(data)
      let cart = carts.find((item) => item.id === idCart);
      if (!cart) return { error: 0, description: "Carrito no encontrado" }
      let newProducts = cart.products.filter(item => item.id !== idProduct)
      if (cart.products.length !== newProducts.length) isFound = true
      if (!isFound) return { error: 0, description: "Producto no encontrado" }
      let newCart = carts.map(item => {
        if (item.id === idCart) {
          cart.products = []
          cart.products.push(newProducts)
          return cart
        } else {
          return item
        }
      })
      await fs.promises.writeFile(pathToFile, JSON.stringify(newCart, null, 2))
      return newCart
    } catch (err){
      return { error: 0, description: "Error al acceder a la base de datos" };
    }
  }
}

module.exports = CartManager;
