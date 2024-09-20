const mongoose = require("mongoose");

const exploreBanner = new mongoose.Schema({
    heading: {
        type: String,
        required: [true, "Please enter your heading"]
    },
    category: {
        type: String,
        required: [true, "Please enter your event category"]
    },
    banner: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});


module.exports = mongoose.model("ExploreBanner", exploreBanner);

