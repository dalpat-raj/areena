const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema({
  discountTitle: { type: String },
  discountAmount: { type: Number},
  discountType: {
    type: String,
    enum: ["percentage", "fixed"],
  },
  discountEndDate: { type: Date },
});

const dimensionSchema = new mongoose.Schema({
  width: { type: Number},
  height: { type: Number },
  depth: { type: Number },
  dimensionUnit: {
    type: String,
    default: "cm",
  },
  weightValue: {
    type: Number,
    required: true,
  },
  weightUnit: {
    type: String,
    default: "kg",
    required: true,
  },
  shippingClass: {
    type: String,
    enum: ["light", "fragile", "standard", "fragileHeavy"],
  },
});

const productSchema = new mongoose.Schema({
  sku: { type: String, required: true, minlength: 5 },
  barcode: { type: String },
  slug: {
    type: String,
    required: true,
    match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  },
  taxcode: { type: String },

  title: { type: String, required: true, minlength: 5, maxlength: 150 },
  description: { type: String, required: true, minlength: 10 },
  productCollection: { type: String, required: true },
  categories: { type: String, required: true },
  tags: [{ type: String }],
  features: [{ type: String }],
  size: { type: String },
  color: { type: String },
  warranty: { type: Number },
  warrantyType: { type: String },
  material: { type: String },
  origin: { type: String },
  
  images: [{ type: String, required: true }], // Store image URLs or paths

  originalPrice: { type: Number },
  sellingPrice: { type: Number, required: true, min: 200 },

  discount: { type: discountSchema },

  stock: { type: Number, required: true, min: 1 },
  status: {
    type: String,
    enum: ["draft", "active", "outOfStock", "archived", "discontinued"],
    required: true,
  },
  shop: {
    type: Object,
    required: true,
  },
  shopId: {
    type: String,
    required: true,
  },
  sold: {
    type: Number,
    default: 0,
  },

  dimension: { type: dimensionSchema, required: true },

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
  isReviewed: {
    type:Boolean,
    default: false,
  },
  ratings:{
    type: Number,
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  publishedAt: { type: Date },

  version: { type: Number },
  metadata: { type: mongoose.Schema.Types.Mixed },
});

module.exports = mongoose.model("Product", productSchema);
