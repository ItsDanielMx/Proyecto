const model = require('./models/product.model')

class ProductManagerMongo {
  Create = async (product) => {
    try {
      await model.create(product)
      return{message: "Se ha creado el producto"}
    } catch (error) {
      return { error: 0, description: "Error al acceder a la base de datos" };
    }
  };

  FindAll = async () => {
    try {
      const response = await model.find({})
      return response
    } catch (error) {
      return { error: 0, description: "Error al acceder a la base de datos" };
    }
  };

  FindById = async (id) => {
    try {
      const response = await model.find({ idItem: id }).toArray();
      return response
    } catch (error) {
      return { error: 0, description: "Error al acceder a la base de datos" };
    }
  };

  Update = async (id, parameter) => {
    try {
      const item = await model.updateOne(
        { idItem: `${id}` },
        { $set: { parameter } }
      );
      return{message: "Se ha actualizado el stock del producto", item};
    } catch (error) {
      return { error: 0, description: "Error al acceder a la base de datos" };
    }
  };

  Delete = async (id) => {
    try {
      await model.deleteOne({ idItem: `${id}` });
      return{message: "Se ha borrado el producto"};
    } catch (error) {
      return { error: 0, description: "Error al acceder a la base de datos" };
    }
  };
}

module.exports = ProductManagerMongo