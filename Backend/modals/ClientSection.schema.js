const mongoose = require("mongoose");

const ClientSectionSchema = new mongoose.Schema({
    image: [
        {
            type: String,
            required: true
        }
    ]
}, {
    timestamps: true
})

module.exports = mongoose.model("ClientSection", ClientSectionSchema);