const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const InitiateMongoServer = require("./config/db");

const student = require("./routes/student");
const business = require("./routes/business");
const admin = require("./routes/admin");
const job = require("./routes/job");
const custom = require("./routes/custom");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/public")));

const allowedOrigins = ["http://localhost:8000", "*"];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) != -1 || allowedOrigins.includes("*")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

InitiateMongoServer();

app.use(
  session({
    secret: process.env.SECRET_KEY,
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cookieParser());

app.use("/student", student);
app.use("/business", business);
app.use("/admin", admin);
app.use("/job", job);
app.use("/custom", custom);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the server" });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
