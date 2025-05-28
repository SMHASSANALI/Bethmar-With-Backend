const express = require("express");
const {
    getAllBlogPostings,
    getActiveBlogs,
    createBlogPosting,
    updateBlogPosting,
    deleteBlogPosting
} = require("../controllers/BlogPosting.controller.js");

const fetchUser = require("../middleware/fetchUser.js");

const router = express.Router();

router.get("/get-blog-postings", getAllBlogPostings);
router.get("/get-active-blogs", getActiveBlogs);
router.post("/create-blog-posting", fetchUser, createBlogPosting);
router.put("/update-blog-posting/:id", fetchUser, updateBlogPosting);
router.delete("/delete-blog-posting/:id", fetchUser, deleteBlogPosting);

module.exports = router;