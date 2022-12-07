const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const cartSchema = mongoose.Schema({
    idCart: {type: Number, required: true, unique: true},
  Products: [{
    idItem: {type: Number, required: true},
    price: {type: Number, required: true },
    code: {type:String },   
    stock: {type:Number, required: true},
  }],
}, {timestamps: true})

module.exports = mongoose.model('Cart', cartSchema)