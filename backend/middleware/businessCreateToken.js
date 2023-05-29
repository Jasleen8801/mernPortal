const jwt = require("jsonwebtoken");

const businessCreateToken = (business) => {
  const token = jwt.sign(
    {
      userName: business.userName,
      id: business.id,
    },
    "61MbqkTeXsMYbWKgJyt1XhFiDuWZTXNOSqwRWs"
  );
  return token;
};

module.exports = businessCreateToken;
