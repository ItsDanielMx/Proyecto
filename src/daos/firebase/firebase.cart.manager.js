const db = require('./firebase.config')
const query = db.collection("Carritos");
const uidGenerator = require('node-unique-id-generator')

class CartManagerFirebase {
  
  CreateCart = async (product) => {
    try {
      const doc = query.doc();
      await doc.collection("Productos").add(product);
      await doc.create({idCart: uidGenerator.generateGUID()})
      return{message: "Se ha creado el carrito"};
    } catch (error) {
      return { error: 0, description: "Error al acceder a la base de datos" };
    }
  };

  FindCartById = async (id) => {
    try {
      // let id = "Uc6vxqqI4dEKkHDpHFd4";
      const doc = query.doc(id);
      const item = await doc.get();
      const response = item.data();
      return response;
    } catch (error) {
      return { error: 0, description: "Error al acceder a la base de datos" };
    }
  };

  AddProduct = async (id, product) => {
    try {
      // let id = "62OBJ0I9Fxs7soqciPqk";
      const doc = query.doc(id).collection("Productos");
      doc.add(product);
      return{message: "Se ha agregado el producto"};
    } catch (error) {
      return { error: 0, description: "Error al acceder a la base de datos" };
    }
  };

  DeleteCartById = async (id) => {
    try {
      // let id = "Uc6vxqqI4dEKkHDpHFd4";
      query.doc(id).delete();
      return {message: "Se ha borrado el carrito"};
    } catch (error) {
      return { error: 0, description: "Error al acceder a la base de datos" };
    }
  };

  DeleteProductInCartById = async (idCart, idProduct) => {
    try {
      // let idCart = "62OBJ0I9Fxs7soqciPqk";
      // let idProduct = "yWcsjChK1UMi0tLMZl3Q";
      const doc = query
        .doc(idCart)
        .collection("Productos")
        .doc(idProduct);
      await doc.delete();
      return{message: "Se ha borrado el producto"};
    } catch (error) {
      return { error: 0, description: "Error al acceder a la base de datos" };
    }
  };
}

module.exports = CartManagerFirebase