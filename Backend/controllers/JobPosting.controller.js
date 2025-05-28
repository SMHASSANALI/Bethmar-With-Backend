const JOBPOSTING = require("../modals/JobPosting.schema.js");
const USER = require("../modals/User.schema.js");

const getJobPostings = async (req, res) => {
    try {
        const jobPostings = await JOBPOSTING.find();
        return res.status(200).json({ message: "Job postings fetched successfully", data: jobPostings });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const getActiveJobPostings = async (req, res) => {
    try {
        const jobPostings = await JOBPOSTING.find({ status: "Active" });
        return res.status(200).json({ message: "Active job postings fetched successfully", data: jobPostings });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const createJobPosting = async (req, res) => {
    try {
        const reqUser = req.user;

        const user = await USER.findById(reqUser._id);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { jobTitle, jobDescription, requirements, qualifications, company, location, benefits, jobType } = req.body;
        if (!jobTitle || !jobDescription || !requirements || !qualifications || !company || !location || !benefits || !jobType) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const findJobPosting = await JOBPOSTING.findOne({ jobTitle, jobDescription, requirements, qualifications, company, location, benefits, jobType });

        if (findJobPosting) {
            return res.status(400).json({ message: "Job posting already exists" });
        }

        const jobPosting = await JOBPOSTING.create({
            jobTitle,
            jobDescription,
            requirements,
            qualifications,
            company,
            location,
            benefits,
            jobType,
            status: "Active"
        });
        return res.status(201).json({ message: "Job posting created successfully", data: jobPosting });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const updateJobPosting = async (req, res) => {
    try {
        const { id } = req.params;
        const reqUser = req.user;

        const user = await USER.findById(reqUser._id);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { jobTitle, jobDescription, requirements, qualifications, company, location, benefits, jobType, status } = req.body;
        if (!jobTitle || !jobDescription || !requirements || !qualifications || !company || !location || !benefits || !jobType || !status) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const jobPosting = await JOBPOSTING.findByIdAndUpdate(id, {
            jobTitle,
            jobDescription,
            requirements,
            qualifications,
            company,
            location,
            benefits,
            jobType,
            status
        }, { new: true });

        if (!jobPosting) {
            return res.status(404).json({ message: "Job posting not found" });
        }

        return res.status(200).json({ message: "Job posting updated successfully", data: jobPosting });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const deleteJobPosting = async (req, res) => {
    try {
        const { id } = req.params;
        const reqUser = req.user;

        const user = await USER.findById(reqUser._id);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const jobPosting = await JOBPOSTING.findByIdAndDelete(id);

        if (!jobPosting) {
            return res.status(404).json({ message: "Job posting not found" });
        }

        return res.status(200).json({ message: "Job posting deleted successfully", data: jobPosting });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getJobPostings,
    getActiveJobPostings,
    createJobPosting,
    updateJobPosting,
    deleteJobPosting
};