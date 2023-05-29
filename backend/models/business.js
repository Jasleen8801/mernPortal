const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const businessSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  companyName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  companyDescription: {
    type: String,
  },
  companyLocation: {
    type: String,
  },
  website: {
    type: String,
  },
  industry: {
    type: String,
  },
  companySize: {
    type: String,
  },
  foundedYear: {
    type: Number,
  },
  contactEmail: {
    type: String,
  },
  contactNumber: {
    type: String,
  },
  jobPostings: [
    {
      jobID: {
        type: Schema.Types.ObjectId,
        ref: "Job",
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Business", businessSchema);
