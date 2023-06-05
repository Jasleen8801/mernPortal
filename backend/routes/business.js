const express = require("express");
const router = express.Router();
const businessController = require("../controllers/business");

router.get("/home", businessController.getBusiness);
router.post("/login", businessController.postLogin);
router.put("/update/:businessId", businessController.updateProfile);
router.post("/:businessId/addJob", businessController.addJobPosting);
router.delete("/:businessId/deleteJob/:jobId", businessController.deleteJobPosting);
router.get("/:businessId/applicants/:jobId", businessController.getApplicants);

module.exports = router;
