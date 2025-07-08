const mongoose = require("mongoose");

const AboutSectionSchema = new mongoose.Schema({
    svg: {
        type: String,
        required: true
    },
    heading: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("AboutSection", AboutSectionSchema);