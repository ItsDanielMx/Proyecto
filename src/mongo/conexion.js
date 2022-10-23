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
const db = client.db("LaFilmBoutique")
const dbProductos = db.collection("Productos")
const Productos = await dbProductos.find({price: {$gt: 500}}).toArray()
/*
const agregarProductos = await dbProductos.insertOne({
    title: "PANASONIC VARICAM LT",
    description: "Una camara muy bonita que graba en 4K 60fps",
    code: "A777",
    price: 450,
    stock: 329,
    thumbnail: "https://res.cloudinary.com/itsdanielmx/image/upload/v1653433873/img/Panasonic-Varicam_qhixdc.jpg"
})
*/



console.log(Productos)
await client.close()