const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    cart: {
        type: Array,
        required: true,
    },
    shippingAddress: {
        type: Object,
        required: true,
    },
    user: {
        type: Object,
        required: true,
    },
    shippingPrice: {
        type: Number,
        default: 0,
    },
    discountPrice: {
        type: Number,
        default: 0,
    },
    subTotalPrice: {
        type: Number,
        default: 0,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    status:{
        type: String,
        default: "Processing",
    },
    paymentInfo: {
        id: {
            type: String,
        },
        status: {
            type: String,
        },
        type: {
            type: String,
        },
    },
    paidAt: {
        type: Date,
        default: Date.now(),
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