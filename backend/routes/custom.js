const express = require("express");
const router = express.Router();

const customController = require("../controllers/custom");

router.get("/getStudent/:studentId", customController.getStudent);
router.get("/getBusiness/:businessId", customController.getBusiness);
router.get("/getJob/:jobId", customController.getJob);

module.exports = router;
