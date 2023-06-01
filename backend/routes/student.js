const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student");

router.get("/home", studentController.getStudent);
router.post("/login", studentController.postLogin);
router.post("/signup", studentController.postSignup);
router.post("/job/apply", studentController.applyJob);
router.put("/profile/:userId", studentController.updateProfile);
router.get("/job/withdraw", studentController.withdrawJob);
router.get("/job/search/name", studentController.searchJobByName);
router.get("/job/search/skills", studentController.searchJobBySkills);
router.get("/job/search/company", studentController.searchCompanyByName);

module.exports = router;
