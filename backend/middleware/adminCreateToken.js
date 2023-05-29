const jwt = require("jsonwebtoken");

const adminCreateToken = (admin) => {
  const token = jwt.sign(
    {
      userName: admin.userName,
      id: admin.id,
    },
    "JJNHtk4kdS1ZSizVJyYPTEsT4QivzFgJsDD9hNOZonw"
  );
  return token;
};

module.exports = adminCreateToken;
