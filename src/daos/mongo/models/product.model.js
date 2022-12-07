const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    idItem: {type: Number, required: true, unique: true},
    name: {type:String, required: true},
    description: {type:String, required: true},
    code: {type:String, unique: true},
    thumbnail: {type:String, required: true},
    price: {type:Number, required: true},
    stock: {type:Number, required: true},
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);