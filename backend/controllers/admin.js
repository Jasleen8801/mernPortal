const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createToken = require("../middleware/adminCreateToken");

const Admin = require("../models/admin");
const Job = require("../models/job");
const Student = require("../models/student");
const Business = require("../models/business");

const sendEmail = require("../utils/sendEmail");

const dotenv = require("dotenv");
dotenv.config();

// to get to the home page
exports.getAdmin = async (req, res) => {
  const token = req.query.cookieValue;
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  try {
    const data = jwt.verify(token, process.env.ADMIN_SECRET);
    const uid = data.id;
    let admin = await Admin.findById({ _id: uid });
    let jobs = await Job.find();
    let students = await Student.find();
    let businesses = await Business.find();
    res.status(200).send({
      admin: admin,
      jobs: jobs,
      students: students,
      businesses: businesses,
      message: "Success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
};

// to get to the login page
exports.postLogin = (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;
  Admin.findOne({ userName: userName }).then((admin) => {
    if (!admin) {
      return res.status(400).send({ message: "No such admin exists" });
    }
    bcrypt
      .compare(password, admin.password)
      .then((doMatch) => {
        if (doMatch) {
          const jwt = createToken(admin);
          res
            .status(200)
            .send({ access: jwt, message: "Logged in successfully" });
        } else {
          res.status(401).send({ message: "Incorrect password" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Internal server error" });
      });
  });
};

// to get to the signup page
exports.postSignup = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const userExists = await Admin.findOne({ userName: userName });
    if (userExists) {
      return res.status(400).send({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const admin = new Admin({
      userName,
      password: hashedPassword,
    });

    admin
      .save()
      .then((result) => {
        res.status(201).send({ message: "Admin created successfully" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Internal server error" });
      });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
};

// to add a business
exports.addBusiness = async (req, res) => {
  const { companyName, email } = req.body;

  try {
    const userExists = await Business.findOne({ userName: companyName });

    if (userExists) {
      return res.status(400).send({ message: "User already exists" });
    }

    const passKey = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(passKey, 12);

    const business = new Business({
      userName: companyName,
      password: hashedPassword,
      email: email,
    });

    await business.save();
    res.status(201).send({
      message: `Business created successfully. Passkey is ${passKey}`,
    });
  } catch (error) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
};

// to delete a job posting
exports.deleteJob = async (req, res) => {
  const jobId = req.params.jobId;

  try {
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    await Student.updateMany(
      { _id: { $in: job.applicants.map((applicant) => applicant.studentID) } },
      { $pull: { appliedJobs: { jobID: jobId } } }
    );

    await Business.updateOne({ _id: job.company }, { $pull: { jobs: jobId } });

    await Job.findByIdAndDelete(jobId);

    res
      .status(200)
      .json({ message: "Job and related data deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// to delete a student profile
exports.deleteStudent = async (req, res) => {
  const studentId = req.params.studentId;

  try {
    const deletedStudent = await Student.findByIdAndDelete(studentId);

    await Job.updateMany(
      { "applicants.studentID": studentId },
      { $pull: { applicants: { studentID: studentId } } }
    );

    res.status(200).send({ message: "Student deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
};

// to delete a business profile
exports.deleteBusiness = (req, res) => {
  const businessId = req.params.businessId;

  // Delete the business
  Business.findByIdAndDelete(businessId)
    .then((result) => {
      Job.deleteMany({ company: businessId })
        .then(() => {
          res.status(200).send({
            message: "Business and related jobs deleted successfully",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({ message: "Internal server error" });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "Internal server error" });
    });
};

// to get all the jobs posted by a company
exports.getJobByCompany = (req, res) => {
  const companyName = req.params.companyName;

  Job.find({ companyName: companyName })
    .then((result) => {
      res.status(200).send({ jobs: result, message: "Success" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "Internal server error" });
    });
};

// to get all the applicants for a job posting
exports.getApplicantsByJob = (req, res) => {
  const jobId = req.params.jobId;

  Job.findById(jobId)
    .populate("applicants", "userName email")
    .then((result) => {
      if (!result) {
        return res.status(400).send({ message: "No such job exists" });
      }
      res
        .status(200)
        .send({ applicants: result.applicants, message: "Success" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "Internal server error" });
    });
};
