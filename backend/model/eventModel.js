const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your event name"]
    },
    category: {
        type: String,
        required: [true, "Please enter your event category"]
    },
    brand: {
        type: String,
        required: [true, "Please type product brand"]
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        default: "running"
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
        required: [true, "Please enter your selling price"]
    },
    stock: {
        type: Number,
        required: []
    },
    description: {
        type: String,
    },
    images: [{
        type: String
    }],
    shopId: {
        type: String,
        required: true
    },
    shop: {
        type: Object,
        required: true
    },
    sold_out: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});


module.exports = mongoose.model("Event", eventSchema);

