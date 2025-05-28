const BLOGPOSTING = require("../modals/BlogPosting.schema.js");
const USER = require("../modals/User.schema.js");

const getAllBlogPostings = async (req, res) => {
    try {
        const blogPostings = await BLOGPOSTING.find();
        return res.status(200).json({ message: "Blog postings fetched successfully", data: blogPostings });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getActiveBlogs = async (req, res) => {
    try {
        const blogPostings = await BLOGPOSTING.find({ status: "Active" });
        return res.status(200).json({ message: "Active blog postings fetched successfully", data: blogPostings });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const createBlogPosting = async (req, res) => {
    try {
        const reqUser = req.user;

        const user = await USER.findById(reqUser._id);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { title, description, image, category, content } = req.body;
        if (!title || !description || !image || !category || !content) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const blogPosting = await BLOGPOSTING.create({
            title,
            description,
            image,
            category,
            content,
            status: "Active"
        });
        return res.status(201).json({ message: "Blog posting created successfully", data: blogPosting });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const updateBlogPosting = async (req, res) => {
    try {
        const reqUser = req.user;

        const user = await USER.findById(reqUser._id);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { id } = req.params;
        const { title, description, image, category, content, status } = req.body;
        const blogPosting = await BLOGPOSTING.findById(id);
        if (!blogPosting) {
            return res.status(404).json({ message: "Blog posting not found" });
        }
        blogPosting.title = title;
        blogPosting.description = description;
        blogPosting.image = image;
        blogPosting.category = category;
        blogPosting.content = content;
        blogPosting.status = status;
        await blogPosting.save();
        return res.status(200).json({ message: "Blog updated successfully", data: blogPosting });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const deleteBlogPosting = async (req, res) => {
    try {
        const reqUser = req.user;

        const user = await USER.findById(reqUser._id);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { id } = req.params;
        const blogPosting = await BLOGPOSTING.findByIdAndDelete(id);
        if (!blogPosting) {
            return res.status(404).json({ message: "Blog posting not found" });
        }
        return res.status(200).json({ message: "Blog posting deleted successfully", data: blogPosting });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getAllBlogPostings,
    getActiveBlogs,
    createBlogPosting,
    updateBlogPosting,
    deleteBlogPosting
};