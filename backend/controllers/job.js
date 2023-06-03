const Job = require("../models/job");
const Business = require("../models/business");

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    const businesses = await Business.find();
    res.status(200).send({ jobs: jobs, businesses: businesses });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
};
