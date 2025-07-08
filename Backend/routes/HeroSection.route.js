const express = require("express");
const router = express.Router();
const {getHomePage, createHomePage, updateHomePage, deleteHomePage} = require("../controllers/HeroSection.controller");
const fetchUser = require("../middleware/fetchUser");
const upload = require("../middleware/upload");

// Upload fields: one hero image, multiple about SVGs/images
router.get("/get-home-section",  getHomePage);
router.post(
    "/create-home-section",
    fetchUser,
    upload.fields([
        { name: "heroImage", maxCount: 1 },
        { name: "aboutSvgs" },
        { name: "aboutImages" }
    ]),
    createHomePage
);
router.put(
    "/update-home-section/:id",
    fetchUser,
    upload.fields([
        { name: "heroImage", maxCount: 1 },
        { name: "aboutSvgs" },
        { name: "aboutImages" }
    ]),
    updateHomePage
);
router.delete("/delete-home-section/:id", fetchUser, deleteHomePage);

module.exports = router;
