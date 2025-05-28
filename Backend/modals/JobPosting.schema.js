const mongoose = require("mongoose");

const jobPostingSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    requirements: {
        type: Array,
        required: true
    },
    qualifications: {
        type: Array,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    benefits: {
        type: Array,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Active", "Expired"],
        default: "Active"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("JobPosting", jobPostingSchema);
