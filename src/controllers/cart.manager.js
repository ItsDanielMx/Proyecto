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

  update = async (elem, id) => {
    let data = await fs.promises.readFile(pathToFile, "utf-8");
    const isFound = data.findIndex(o => o.id == id)
    if (isFound == -1) {
      return { error: 0, description: "Carrito no encontrado" };
    } else {
      data[isFound] = {...elem, id}
        try {
          await fs.promises.writeFile(
            pathToFile, JSON.stringify(data, null, 2)
          )
        } catch (error) {
          return { error: 0, description: "No se ha encontrado la base de datos" };
        }
    }
  }

  deleteProduct = async (id, idProduct) => {
    //findById
    id = parseInt(id);
    if (fs.existsSync(pathToFile)) {
      let data = await fs.promises.readFile(pathToFile, "utf-8");
      let carts = JSON.parse(data);
      let product = carts.find((item) => item.id === id);
      if (!product) return { error: 0, description: "Carrito no encontrado" };

      //delete (?)
      idProduct = parseInt(idProduct);
      let isFound = false;
      let newCart = product.filter((product) => product.idProduct !== idProduct);
      if (product.length !== newCart.length) isFound = true;
      if (!isFound) return { error: 0, description: "Producto no encontrado" };
      await fs.promises.writeFile(pathToFile, JSON.stringify(newCart, null, 2));
      product = newCart;
      return product;
    } else {
      return { error: 0, description: "No se ha encontrado la base de datos" };
    }
  };
}

module.exports = CartManager;
