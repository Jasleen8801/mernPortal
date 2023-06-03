const jwt = require("jsonwebtoken");

const businessCreateToken = (business) => {
  const token = jwt.sign({
      userName: business.userName,
      id: business.id,
    },
    "jsonwebtokensecretkeybusiness"
  );
  // console.log(token);
  return token;
};

module.exports = businessCreateToken;
