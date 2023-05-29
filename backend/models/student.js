const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const experienceSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

const educationSchema = new Schema({
  instituteName: {
    type: String,
    required: true,
  },
  startYear: {
    type: Number,
    required: true,
  },
  endYear: {
    type: Number,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  major: {
    type: String,
    required: true,
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
