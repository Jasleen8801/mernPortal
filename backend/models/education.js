const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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
  student: {
    type: Schema.Types.ObjectId,
    ref: "Student",
  },
});

module.exports = mongoose.model("Education", educationSchema);