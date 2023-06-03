const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const createToken = require("../middleware/businessCreateToken");

const Business = require("../models/business");
const Job = require("../models/job");
const Student = require("../models/student");

exports.getBusiness = async (req, res) => {
  const token = req.query.cookieValue;
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  try {
    const data = jwt.verify(token, process.env.BUSINESS_SECRET);
    const uid = data.id;
    const business = await Business.findById({ _id: uid });
    const jobs = await Job.find({ company: uid });
    res
      .status(200)
      .send({ business: business, jobs: jobs, message: "Business Found" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "home:::Internal server error" });
  }
};

exports.postLogin = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const business = await Business.findOne({ userName: userName });
    if (!business) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, business.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = createToken(business);
    // console.log(token);
    res.status(200).send({ access: token, message: "Logged in successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "loginnnn: Internal server error" });
  }
};

exports.postCompleteProfile = async (req, res) => {
  const {
    companyName,
    password,
    companyDescription,
    companyLocation,
    website,
    industry,
    companySize,
    foundedYear,
    contactEmail,
    contactNumber,
  } = req.body;

  try {
    const business = await Business.findOne({ companyName: companyName });
    if (!business) {
      return res.status(400).send({ message: "No such business exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    business.password = hashedPassword;
    business.companyDescription = companyDescription;
    business.companyLocation = companyLocation;
    business.website = website;
    business.industry = industry;
    business.companySize = companySize;
    business.foundedYear = foundedYear;
    business.contactEmail = contactEmail;
    business.contactNumber = contactNumber;

    await business.save();

    res
      .status(200)
      .send({ message: "Business profile completed successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.addJobPosting = async (req, res) => {
  const { businessId } = req.params;
  const {
    title,
    description,
    location,
    industry,
    skillsRequired,
    salary,
    experienceLevel,
    applicationDeadline,
  } = req.body;

  try {
    const business = await Business.findById(businessId);
    // console.log(business);
    if (!business) {
      return res.status(400).send({ message: "No such business exists" });
    }

    const job = new Job({
      title,
      description,
      company: businessId,
      location,
      industry,
      skillsRequired,
      salary,
      experienceLevel,
      applicationDeadline,
    });

    await job.save();

    business.jobPostings.push({ jobID: job._id });
    await business.save();

    res.status(201).send({ message: "Job posting added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.deleteJobPosting = async (req, res) => {
  const { businessId, jobId } = req.params;

  try {
    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(400).send({ message: "No such business exists" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).send({ message: "No such job posting exists" });
    }

    await Job.deleteOne({ _id: jobId });

    business.jobPostings = business.jobPostings.filter(
      (item) => item.jobID.toString() !== jobId
    );
    await business.save();

    res.status(200).send({ message: "Job posting deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
};


exports.getApplicants = async (req, res) => {
  const jobId = req.params.jobId;

  const job = await Job.findById(jobId);

  if (!job || !job.company.equals(req.business._id)) {
    return res.status(400).send({ message: "No such job posting exists" });
  }

  const applicants = await Student.find({ "application.jobId": jobId });

  res.status(200).send({ applicants: applicants, message: "Success" });
};
