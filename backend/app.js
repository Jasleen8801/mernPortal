const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const student = require("./routes/student");
const business = require("./routes/business");
const admin = require("./routes/admin");

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

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect to MongoDB");
  })
  .catch((err) => {
    console.error("Connection error", err);
  });

app.use(
  session({
    secret: process.env.SECRET_KEY,
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the server" });
});
app.use(cookieParser());
app.use("/student",student);
app.use("/business", business);
app.use("/admin", admin);

port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

