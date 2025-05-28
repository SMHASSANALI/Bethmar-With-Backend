const express = require('express');
const {
    getJobPostings,
    getActiveJobPostings,
    createJobPosting,
    updateJobPosting,
    deleteJobPosting
} = require('../controllers/JobPosting.controller.js');

const fetchUser = require('../middleware/fetchUser.js');

const router = express.Router();

router.get('/get-job-postings', getJobPostings);
router.get('/get-active-jobs', getActiveJobPostings);
router.post('/create-job-posting', fetchUser, createJobPosting);
router.put('/update-job-posting/:id', fetchUser, updateJobPosting);
router.delete('/delete-job-posting/:id', fetchUser, deleteJobPosting);

module.exports = router;