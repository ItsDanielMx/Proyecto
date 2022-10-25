const db = require('./firebase.config')
const query = db.collection("Products");

class ProductManagerFirebase {
    
  Create = async (body) => {
    try {
      const doc = query.doc();
      await doc.create(body);
      return{message: "Se ha creado el producto"};
    } catch (error) {
      return { error: 0, description: "Error al acceder a la base de datos" };
    }
  };

  FindAll = async () => {
    try {
      const querySnapshot = await query.get();
      let docs = querySnapshot.docs;

      const response = docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return response
    } catch (error) {
        return { error: 0, description: "Error al acceder a la base de datos" };
    }
  };

  FindById = async (id) => {
    try {
    //   let id = "OQPLIZpv10nocY0F06aX";
      const doc = query.doc(id);
      const item = await doc.get();
      const response = item.data();
      return response
    } catch (error) {
        return { error: 0, description: "Error al acceder a la base de datos" };
    }
  };

  Update = async (id, body) => {
    try {
    //   let id = "OQPLIZpv10nocY0F06aX";
      const doc = query.doc(id);
      const item = await doc.update(body);
      return{message: "Se ha actualizado el stock del producto", item};
    } catch (error) {
        return { error: 0, description: "Error al acceder a la base de datos" };
    }
  };

  Delete = async (id) => {
    try {
    //   let id = "OQPLIZpv10nocY0F06aX";
      query.doc(id).delete();
      return{message: "Se ha borrado el producto"};
    } catch (error) {
        return { error: 0, description: "Error al acceder a la base de datos" };
    }
  };
}

module.exports = ProductManagerFirebase