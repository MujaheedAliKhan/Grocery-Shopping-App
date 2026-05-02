const mongoose = require("mongoose");

//Structure of product to store in DB
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1606787366850-de6330128bfc" ||
      undefined,
  },
});

module.exports = mongoose.model("Product", productSchema);
