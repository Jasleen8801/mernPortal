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
  const { userName, email, password, description, skills } = req.body;

  try {
    const userExists = await Student.findOne({ userName });
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
    });

    await student.save();
    res.status(201).send({ message: "Student created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.updateProfile = async (req, res) => {
  const {
    userName,
    email,
    description,
    skills,
    projects,
    education,
    experience,
  } = req.body;
  const userId = req.params.userId;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      userId,
      {
        userName,
        email,
        description,
        skills,
        projects,
        education,
        experience,
      },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(400).send({ message: "Student not found" });
    }

    res.json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.applyJob = async (req, res) => {
  const jobId = req.params.jobId;

  try {
    const job = await Job.findById(jobId);
    if (!job) {
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
  const userId = req.user.id; // Assuming you have implemented authentication and can access the user's ID

  try {
    const student = await Student.findById(userId);
    if (!student) {
      return res.status(400).send({ message: "Student not found" });
    }

    const jobIndex = student.application.findIndex(
      (application) => application.jobId === jobId
    );
    if (jobIndex === -1) {
      return res.status(400).send({ message: "Job application not found" });
    }

    student.application.splice(jobIndex, 1);
    await student.save();

    res.status(200).send({ message: "Job application withdrawn successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.searchJobByName = async (req, res) => {
  const { jobName } = req.params;

  try {
    const jobs = await Job.find({ title: { $regex: jobName, $options: "i" } });
    res.status(200).send({ jobs: jobs, message: "Jobs found" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.searchJobBySkills = async (req, res) => {
  const { skills } = req.params;

  try {
    const jobs = await Job.find({ skillsRequired: { $in: skills.split(",") } });
    res.status(200).send({ jobs: jobs, message: "Job search successful" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.searchCompanyByName = async (req, res) => {
  const { companyName } = req.params;

  try {
    const jobs = await Job.find({
      company: { $regex: companyName, $options: "i" },
    });
    res.status(200).send({ jobs: jobs, message: "Jobs found" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
};
