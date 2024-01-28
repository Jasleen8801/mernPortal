const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
    }
  ],
  education: [
    {
      type: Schema.Types.ObjectId,
      ref: "Education",
    }
  ],
  experience: [
    {
      type: Schema.Types.ObjectId,
      ref: "Experience",
    }
  ],
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
