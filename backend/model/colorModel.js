const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    hex: {
        type: String,
    },
});

module.exports = mongoose.model("Color", colorSchema);