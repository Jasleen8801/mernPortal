const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});

const experienceSchema = new Schema({
  title: {
    type: String,
  },
  company: {
    type: String,
  },
  location: {
    type: String,
  },
});

const educationSchema = new Schema({
  instituteName: {
    type: String,
  },
  startYear: {
    type: Number,
  },
  endYear: {
    type: Number,
  },
  degree: {
    type: String,
  },
  major: {
    type: String,
  },
});

const studentSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  skills: {
    type: String,
  },
  projects: [projectSchema],
  education: [educationSchema],
  experience: [experienceSchema],
  application: [
    {
      jobID: {
        type: Schema.Types.ObjectId,
        ref: "Job",
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Student", studentSchema);
