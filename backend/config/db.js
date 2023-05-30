const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const MONGOURI = process.env.MONGOURI;

mongoose.set("strictQuery", false);

const InitiateMongoServer = () => {
  mongoose
    .connect(MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.log("DB connection failed", err);
      process.exit(1);
    });
};

module.exports = InitiateMongoServer;
