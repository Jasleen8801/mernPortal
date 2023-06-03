const express = require("express");
const router = express.Router();

const jobController = require("../controllers/job");

router.get("/getJobs", jobController.getJobs);

module.exports = router;
