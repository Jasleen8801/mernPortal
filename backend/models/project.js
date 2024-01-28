const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: "Student",
  },
});

module.exports = mongoose.model("Project", projectSchema);