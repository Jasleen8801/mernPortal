const jwt = require("jsonwebtoken");

const studentCreateToken = (student) => {
  const token = jwt.sign(
    {
      userName: student.userName,
      id: student.id,
    },
    "6ezlnXKyzxHzMflx1l0Izdy033nn7Q13QgikMDJlUxc"
  );
  return token;
};

module.exports = studentCreateToken;
