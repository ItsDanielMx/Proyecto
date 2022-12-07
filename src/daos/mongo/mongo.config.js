const mongoose = require("mongoose");

const uri = `mongodb+srv://ItsDanielMx:ItsDanielMx@codercluster.8nj1cn5.mongodb.net/?retryWrites=true&w=majority`;

module.exports = () => {
  const client = () => {
    mongoose.connect(
      uri,
      {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err) => {
        if (err) {
          console.log("Error al acceder a la base de datos");
        } else {
          console.log("Conectado a la base de datos!");
        }
      }
    );
  };
  client()
};

/* ESTO ERA LO QUE TENIA ANTES PARA CONECTAR Y HACER PRUEBAS Y FUNCIONABA, ES EL MISMO LINK Y TODO
import { MongoClient } from "mongodb";

const host = 'localhost'
const port = '27017'
const username = 'lector'
const password = '123456'

const uri = `mongodb+srv://ItsDanielMx:ItsDanielMx@codercluster.8nj1cn5.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // authSource: "admin",
    // auth: {
    //     username,
    //     password
    // }
})

await client.connect()
*/
