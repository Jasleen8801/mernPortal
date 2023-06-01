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
    uid = data.id;
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
exports.addBusiness = (req, res) => {
  const { companyName, email } = req.body;

  // generate a random pass key
  const passKey = Math.random().toString(36).slice(-8);

  const business = new Business({
    userName: companyName,
    password: passKey,
    email: email,
  });

  business
    .save()
    .then(() => {
      const message = `Your initial password is ${passKey}`;
      sendEmail(email, "Welcome to the Job Portal", message);
      res.status(201).send({ message: "Business created successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "Internal server error" });
    });
};

// to delete a job posting
exports.deleteJob = (req, res) => {
  const jobId = req.params.jobId;

  Job.findByIdAndDelete(jobId)
    .then((result) => {
      res.status(200).send({ message: "Job deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "Internal server error" });
    });
};

// to delete a student profile
exports.deleteStudent = (req, res) => {
  const studentId = req.params.studentId;

  Student.findByIdAndDelete(studentId)
    .then((result) => {
      res.status(200).send({ message: "Student deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "Internal server error" });
    });
};

// to delete a business profile
exports.deleteBusiness = (req, res) => {
  const businessId = req.params.businessId;

  Business.findByIdAndDelete(businessId)
    .then((result) => {
      res.status(200).send({ message: "Business deleted successfully" });
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
