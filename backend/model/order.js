const mongoose = require("mongoose");

// ✅ Order Items per product
const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  title: String,
  slug: String,
  sku: String,
  barcode: String,
  size: String,
  color: String,
  images: [String],
  qty: { type: Number, required: true },
  sellingPrice: Number,
  originalPrice: Number,
  discount: {
    discountTitle: String,
    discountAmount: Number,
    discountType: String,
    discountEndDate: Date,
  },
  dimension: {
    width: Number,
    height: Number,
    depth: Number,
    dimensionUnit: String,
    weightValue: Number,
    weightUnit: String,
    shippingClass: String,
  },
  isReviewed: {
    type: Boolean,
    default:false,
  }
}, { _id: false });

// ✅ Sub-orders per vendor
const subOrderSchema = new mongoose.Schema({
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    required: true
  },
  items: [orderItemSchema],
  shipping: {
    address: {
      type: {
        type: String,
        enum: ["home", "office", "other"],
        default: "home"
      },
      name: String,
      phone: String,
      address1: String,
      address2: String,
      city: String,
      state: String,
      country: { type: String, default: "India" },
      pincode: String
    },
  },
  shipment: {
    order_id: String,
    channel_order_id: String,
    shipment_id: String,
    awb_assign_status: String,
    awb_code: String,
    courier_company: String,
    courier_name: String,
    label_url: String,
    manifest_url: String,
    status: String,
    courier_company_id: String,
    estimated_delivery_days: String,
    rate: Number,
    freight_charge: String,
    rto_charges: String,
    pickup_availability: String,
    pickup_scheduled_date: String,
    pickup_token: String,
    pickup_status: String,
    cod_available: String,
    realtime_tracking: String,
    etd: String,
    etd_hours: String,
    charge_weight: String,
    ccity: String,
    cstate: String,
    postcode: String
  },
  payment: {
    subTotal: Number,
    total: Number,
    shippingCharge: Number,
    discount: Number,
    status: String,
  },
  totalQuantity: Number,
  status: {
    type: String,
    enum: ["processing", "confirm", "ship now", "failed", "refunded", "delivered"],
    default: "processing"
  },
  statusHistory: [
    {
      status: String,
      updatedAt: Date,
    }
  ],
  expectedDelivery: Date,
  actualDelivery: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// ✅ Main Order Schema
const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  orderId: String,
  subOrders: [subOrderSchema],

  payment: {
    status: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "paid"
    },
    method: {
      type: String,
      enum: ["cod", "razorpay"],
      required: true
    },
    transactionId: String,   // razorpay_payment_id
    orderId: String,         // razorpay_order_id
    signature: String,       // razorpay_signature
    amount: Number,
    shippingPrice: Number,
    currency: { type: String, default: "INR" },
    gatewayResponse: Object,
    paidAt: Date
  },

  buyerDetails: {
    name: String,
    phone: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    country: String,
    pincode: String,
  },

  totals: {
    shippingPrice: Number,
    discount: Number,
    grandTotal: Number
  },

  notes: {
    customer: String,
    vendor: String,
    admin: String
  },

  cancellation: {
    requested: Boolean,
    reason: String,
    approved: Boolean,
    refundStatus: {
      type: String,
      enum: ["pending", "initiated", "completed", "failed"]
    }
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// ✅ Auto update updatedAt on save
orderSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Order", orderSchema);
