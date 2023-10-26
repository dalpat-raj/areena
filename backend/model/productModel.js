const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your product name"],
  },
  brand: {
    type: String,
    required: [true, "Please type product brand"],
  },
  category: {
    type: String,
    required: [true, "Please enter your product category"],
  },
  tags: {
    type: String,
  },
  originalPrice: {
    type: Number,
    maxLength: 5,
    minLength: 3,
  },
  sellingPrice: {
    type: Number,
    maxLength: 5,
    minLength: 3,
    required: [true, "Please enter your selling price"],
  },
  stock: {
    type: Number,
    required: [],
  },
  description: {
    type: String,
  },
  images: [
    {
      type: String,
    },
  ],
  color: {
    type: String,
  },
  reviews: [
    {
      user:{
        type: Object,
      },
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
      productId: {
        type: String,
      },
    },
  ],
  ratings:{
    type: Number,
  },
  shopId: {
    type: String,
    required: true,
  },
  shop: {
    type: Object,
    required: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);
