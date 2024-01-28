const jwt = require("jsonwebtoken");

const adminCreateToken = (admin) => {
  const token = jwt.sign(
    {
      userName: admin.userName,
      id: admin.id,
    },
    "secret"
  );
  return token;
};

module.exports = adminCreateToken;
