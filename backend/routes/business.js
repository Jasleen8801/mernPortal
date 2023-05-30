const express = require("express");
const router = express.Router();
const businessController = require("../controllers/business");

router.get("/:companyName", businessController.getBusiness);
router.post("/login", businessController.postLogin);
router.post("/completeProfile", businessController.postCompleteProfile);
router.post("/:businessId/addJob", businessController.addJobPosting);
router.delete("/:businessId/deleteJob/:jobId", businessController.deleteJobPosting);
router.get("/:businessId/applicants/:jobId", businessController.getApplicants);

module.exports = router;

