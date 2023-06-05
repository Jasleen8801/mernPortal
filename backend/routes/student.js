const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student");

router.get("/home", studentController.getStudent);
router.post("/login", studentController.postLogin);
router.post("/signup", studentController.postSignup);
router.put("/update/:userId", studentController.updateProfile);
router.post("/job/apply/:jobId", studentController.applyJob);
router.get("/jobs/applied", studentController.getAppliedJobs);
router.get("/job/withdraw/:jobId", studentController.withdrawJob);

module.exports = router;
