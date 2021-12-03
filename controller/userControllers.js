const User = require("../models/user");
const mail = require("../middleware/modeMailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const createUser = async (req, res) => {
  //   console.log("body request", req.body);
  try {
    const userPassword = Math.floor(100000 + Math.random() * 900000);
    console.log("userPassword", userPassword);

    const userData = {
      email: req.body.email,
      userName: req.body.userName,
      role: req.body.role,
      password: userPassword,
    };
    console.log("user data", userData);

    const checkEmail = await User.findOne({ email: req.body.email });
    // console.log("check email", checkEmail);
    if (checkEmail) {
      res.json({
        status: "error",
        message: " E-Mail already in use!",
      });
    } else {
      const userEmail = req.body.email;
      console.log("user email is", userEmail);
      const user = await new User(userData);
      const data = await user.save();

      const result = await mail.mailSender(userEmail, userPassword);

      if (data) {
        res.json({
          status: " success",
          message: "user created successfully",
          data: data,
        });
      } else {
        res.json({
          status: "error",
          message: "user not created",
        });
      }
    }
  } catch (error) {
    console.log("errors", error);
  }
};

const userLogin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log("user is", user);

    if (user) {
      const password = req.body.password;

      const isValid = await bcrypt.compare(password, user.password);

      if (isValid) {
        const payLoad = {
          _id: user._id,
        };

        const token = await jwt.sign({ payLoad }, "secretkey");
        if (token) {
          res.json({
            status: "success",
            message: "login successful",
            token: token,
            data: user,
          });
        }
      } else {
        res.json({
          status: "error",
          message: "invalid credentials",
        });
      }
    } else {
      res.json({
        status: "error",
        message: "invalid email",
      });
    }
  } catch (error) {
    console.log("errors", error);
  }
};

module.exports = { createUser, userLogin };
