const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");

router.get("/home", adminController.getAdmin);
router.post("/login", adminController.postLogin);
router.post("/signup", adminController.postSignup);
router.post("/addbusiness", adminController.addBusiness);
router.delete("/job/:jobId", adminController.deleteJob);
router.delete("/student/:studentId", adminController.deleteStudent);
router.delete("/business/:businessId", adminController.deleteBusiness);
router.get("/job/company/:companyName", adminController.getJobByCompany);
router.get("/job/applicants/:jobId", adminController.getApplicantsByJob);

module.exports = router;
