const jwt = require("jsonwebtoken");

const businessCreateToken = (business) => {
  const token = jwt.sign(
    {
      userName: business.userName,
      id: business.id,
    },
    "IsImV4cCI6MTY4NTY4NDU4MCwiaWF0IjoxNjg1Njg0NTgwfQ"
  );
  return token;
};

module.exports = businessCreateToken;
