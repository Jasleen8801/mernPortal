const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const jobSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Business",
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
  },
  skillsRequired: {
    type: [String],
  },
  salary: {
    type: Number,
    required: true,
  },
  experienceLevel: {
    type: String,
  },
  applicationDeadline: {
    type: Date,
    required: true,
  },
  applicants: [
    {
      studentID: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Job", jobSchema);
