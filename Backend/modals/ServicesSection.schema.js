const mongoose = require("mongoose");

const AboutSectionSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true
    },
    services: [
        {
            type: String,
            required: true
        }
    ]
}, {
    timestamps: true
})

module.exports = mongoose.model("ServicesSection", AboutSectionSchema);