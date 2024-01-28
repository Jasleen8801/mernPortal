const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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
  student: {
    type: Schema.Types.ObjectId,
    ref: "Student",
  },
});

module.exports = mongoose.model("Experience", experienceSchema);