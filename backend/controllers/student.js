const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const createToken = require("../middleware/studentCreateToken");
const jwt = require("jsonwebtoken");

const Student = require("../models/student");
const Job = require("../models/job");
const Project = require("../models/project");
const Education = require("../models/education");
const Experience = require("../models/experience");

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
    educations,
    experiences,
  } = req.body;
  const userId = req.params.userId;

  console.log(projects)

  try {
    if(!projects) {
      const project = new Project({
        title: projects.title,
        description: projects.description,
        student: userId,
      });
      await project.save();
    } 
    if(!educations) {
      const education = new Education({
        collegeName: education.collegeName,
        degree: education.degree,
        field: education.field,
        grade: education.grade,
        startDate: education.startDate,
        endDate: education.endDate,
        student: userId,
      });
      await education.save();
    }
    if(!experiences) {
      const experience = new Experience({
        companyName: experience.companyName,
        position: experience.position,
        startDate: experience.startDate,
        endDate: experience.endDate,
        description: experience.description,
        student: userId,
      });
      await experience.save();
    }

    const project = await Project.find({ student: userId });
    const education = await Education.find({ student: userId });
    const experience = await Experience.find({ student: userId });

    const updatedStudent = await Student.findByIdAndUpdate(
      userId,
      {
        userName,
        email,
        description,
        skills,
      },
      { new: true }
    );

    updatedStudent.projects.push(project);
    updatedStudent.education.push(education);
    updatedStudent.experience.push(experience);
    await updatedStudent.save();

    console.log(updatedStudent)

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
  const userId = req.body.userId;

  try {
    const job = await Job.findById(jobId);
    const student = await Student.findById(userId);

    if (!job) {
      return res.status(400).send({ message: "Job not found" });
    }

    if (!student) {
      return res.status(400).send({ message: "Student not found" });
    }

    if (student.application.some((app) => app.jobID.toString() === jobId)) {
      return res.status(400).send({ message: "Job already applied" });
    }

    student.application.push({ jobID: jobId });
    await student.save();

    job.applicants.push({ studentID: userId });
    await job.save();

    res.status(200).send({ message: "Applied for job successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.getAppliedJobs = async (req, res) => {
  const token = req.query.cookieValue;

  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  try {
    const data = jwt.verify(token, process.env.STUDENT_SECRET);
    const userId = data.id;
    // console.log(userId)
    const student = await Student.findById(userId).populate(
      "application.jobID"
    );
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const appliedJobs = student.application.map(
      (application) => application.jobID
    );
    res.status(200).json({ appliedJobs });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.withdrawJob = async (req, res) => {
  const jobId = req.params.jobId;
  const token = req.query.cookieValue;

  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  try {
    const data = jwt.verify(token, process.env.STUDENT_SECRET);
    const userId = data.id;
    const student = await Student.findById(userId);
    if (!student) {
      return res.status(400).send({ message: "Student not found" });
    }

    const jobApplication = student.application.find(
      (application) => application.jobID.toString() === jobId
    );    
    if (!jobApplication) {
      return res.status(400).send({ message: "Job application not found" });
    }

    student.application.pull(jobApplication._id);
    await student.save();

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).send({ message: "Job not found" });
    }

    job.applicants.pull(student._id);
    await job.save();

    res.status(200).send({ message: "Job application withdrawn successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
};
