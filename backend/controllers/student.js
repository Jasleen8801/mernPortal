const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const createToken = require("../middleware/studentCreateToken");
const jwt = require("jsonwebtoken");

const Student = require("../models/student");
const Job = require("../models/job");

exports.getStudent = async (req, res) => {
  const token = req.query.cookieValue;

  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  try {
    const data = jwt.verify(token, process.env.STUDENT_SECRET);
    const uid = data.id;
    const student = await Student.findById(uid);
    const jobs = await Job.find();

    res
      .status(200)
      .send({ student: student, jobs: jobs, message: "Student found" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.postLogin = (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;
  Student.findOne({ userName: userName }).then((student) => {
    if (!student) {
      return res.status(400).send({ message: "No such student exists" });
    }
    bcrypt
      .compare(password, student.password)
      .then((doMatch) => {
        if (doMatch) {
          const jwt = createToken(student);
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

exports.postSignup = async (req, res) => {
  const {
    userName,
    email,
    password,
    description,
    skills,
    projects,
    education,
    experience,
  } = req.body;

  try {
    const userExists = await Student.findOne({ userName: userName });
    if (userExists) {
      return res.status(400).send({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const student = new Student({
      userName,
      email,
      password: hashedPassword,
      description,
      skills,
      projects,
      education,
      experience,
    });

    student
      .save()
      .then((result) => {
        res.status(201).send({ message: "Student created successfully" });
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

exports.applyJob = async (req, res) => {
  const jobId = req.params.jobId;

  try {
    const job = await Job.findById(jobId);
    if(!job) {
      return res.status(400).send({ message: "Job not found" });
    }

    student.application.push({ jobId: jobId });
    await student.save();
    
    res.status(200).send({ message: "Applied for job successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.withdrawJob = async (req, res) => {
  const jobId = req.params.jobId;

  
}
