const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log("this is token", token);
  console.log("header request", req.headers);
  const decodedToken = jwt.verify(token, "secretkey");
  console.log("decodeToken", decodedToken);
  const checkRole = decodedToken.payLoad.role;
  console.log("what is role", checkRole);

  if (checkRole !== "admin") {
    res.json({
      message: "you are not authorized",
    });
  } else {
    next();
  }
};

module.exports = { authenticate };
