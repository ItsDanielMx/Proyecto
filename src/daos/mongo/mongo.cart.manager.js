const model = require('./models/cart.model')

class CartManagerMongo {
  CreateCart = async (products) => {
    try {
      await model.create(products)
      return{message: "Se ha creado el carrito"};
    } catch (error) {
        return { error: 0, description: "Error al acceder a la base de datos" };
    }
  };

  FindCartById = async (id) => {
    try {
      const response = await model.find({ idCart: id }).toArray();
      return response
    } catch (error) {
        return { error: 0, description: "Error al acceder a la base de datos" };
    }
  };

  AddProduct = async (id, product) => {
    try {
      let cart = model.find({ idCart: id })
      if (!cart) return { error: 0, description: "Carrito no encontrado" }
      cart.Products.push(product)
      return{message: "Se ha agregado el producto"};
    } catch (error) {
        return { error: 0, description: "Error al acceder a la base de datos" };
    }
  };

  DeleteCartById = async (id) => {
    try {
      await model.deleteOne({ idCart: id });
      return{message: "Se ha borrado el carrito"};
    } catch (error) {
        return { error: 0, description: "Error al acceder a la base de datos" };
    }
  };

  DeleteProductInCartById = async (idCart, idItem) => {
    try {
      let cart = model.find({ idCart: idCart })
      if (!cart) return { error: 0, description: "Carrito no encontrado" }
      const index = cart.products.findIndex((item) => item.id === idItem)
          cart.products.splice(index, 1)
      if (!index) return { error: 0, description: "Producto no encontrado" }
      
        return{message: "Se ha borrado el producto"};
    } catch (error) {
        return { error: 0, description: "Error al acceder a la base de datos" };
    }
  };
}

module.exports = CartManagerMongo