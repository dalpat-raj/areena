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
  size: [
    {
      type: String,
    }
  ],
  category: {
    type: String,
    required: [true, "Please enter your product category"],
  },
  subCategory: {
    type: String,
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
    required: [true, "Please enter your Stock"],
  },
  shippingAndReturn: {
    type: String,
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
    type: Object,
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
  details: {
    type: Object,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);
