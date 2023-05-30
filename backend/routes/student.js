const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student");

router.get("/home", studentController.getStudent);
router.post("/login", studentController.postLogin);
router.post("/signup", studentController.postSignup);
router.post("/job/apply/:jobId", studentController.applyJob);
router.get("/job/withdraw/:jobId", studentController.withdrawJob);
router.get("/job/search/name/:jobName", studentController.searchJobByName);
router.get("/job/search/skills/:skills", studentController.searchJobBySkills);
router.get("/job/search/company/:companyName", studentController.searchCompanyByName);

module.exports = router;
