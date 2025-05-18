const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
        price: Number,
      },
    ],
    totalAmount: { type: Number, required: true },

    commissionAmount: { type: Number, default: 0 },    
    courierCharge: { type: Number, default: 0 },         
    sellerEarning: { type: Number, default: 0 },
   
    orderStatus: {
        type: String,
        enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
        default: "pending",
    },
    courierStatus: {
        type: String,
        enum: ["not_assigned", "assigned", "picked_up", "in_transit", "delivered"],
        default: "not_assigned",
    },

    paymentStatus: {
        type: String,
        enum: ["unpaid", "paid"],
        default: "unpaid",
    }, 

    paidAt: {
        type: Date,
        default: Date.now(),
    },
    adminConfirmedAt : {
        type: Date,
    },
    deliverAt: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

module.exports = mongoose.model("Order", orderSchema);
