const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, cb) => {
    // cb(null, file.originalname);
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

let middleWare = {
  authenticate: (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    console.log("this is token", token);
    console.log("header request", req.headers);
    const decodedToken = jwt.verify(token, "secretkey");
    console.log("decodeToken", decodedToken);
    const checkRole = decodedToken.payLoad.role;
    console.log("what is role?", checkRole);

    if (checkRole !== "admin") {
      res.json({
        message: "you are not authorized",
      });
    } else {
      next();
    }
  },
  upload: multer({
    storage: storage,
  }).array("image"),
  singleUpload: multer({
    storage: storage,
  }).single("image"),
};

module.exports = middleWare;

// const authenticate = (req, res, next) => {
//   const token = req.headers.authorization.split(" ")[1];
//   console.log("this is token", token);
//   console.log("header request", req.headers);
//   const decodedToken = jwt.verify(token, "secretkey");
//   console.log("decodeToken", decodedToken);
//   const checkRole = decodedToken.payLoad.role;
//   console.log("what is role", checkRole);

//   if (checkRole !== "admin") {
//     res.json({
//       message: "you are not authorized",
//     });
//   } else {
//     next();
//   }
// };
