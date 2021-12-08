const User = require("../models/user");
const mail = require("../middleware/modeMailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userService = require("../services/userService");

const getAllUsers = async (req, res) => {
  try {
    // const users = await User.find();
    const users = await userService.allUsers();

    if (users) {
      res.json({
        status: "success",
        message: "users found successfully",
        data: users,
      });
    } else {
      res.json({
        status: "error",
        message: "users not found!",
      });
    }
  } catch (error) {
    console.log("errors", error);
  }
};

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

    // const checkEmail = await User.findOne({ email: req.body.email });
    const checkEmail = await userService.findUser({ email: req.body.email });

    console.log("check email", checkEmail);
    if (checkEmail) {
      res.json({
        status: "error",
        message: " E-Mail already in use!",
      });
    } else {
      const userEmail = req.body.email;
      console.log("user email is", userEmail);
      const data = await userService.createUser(userData);

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

const updateUser = async (req, res) => {
  try {
    const updatedData = {
      userName: req.body.userName,
      role: req.body.role,
    };
    const id = req.params.id;
    // const user = await User.findByIdAndUpdate(
    //   id,
    //   { ...updatedData },
    //   { new: true }
    // );

    const user = await userService.editUser(id, updatedData);

    if (user) {
      res.json({
        status: "success",
        message: "user updated successfully",
        data: user,
      });
    } else {
      res.json({
        status: "error",
        message: "user not updated",
      });
    }
  } catch (error) {
    console.log("errors", error);
  }
};

const singleUser = async (req, res) => {
  try {
    // const user = await User.findById(req.params.id);
    const user = await userService.singleUser(req.params.id);

    if (user) {
      res.json({
        status: "success",
        message: "User found!",
        data: user,
      });
    } else {
      res.json({
        status: "error",
        message: "user not exists",
      });
    }
  } catch (error) {
    console.log("errors", error);
  }
};

const userLogin = async (req, res) => {
  try {
    const user = await userService.findUser({ email: req.body.email });
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
      res.status(404).json({
        status: "error",
        message: "user not exists in database",
      });
    }
  } catch (error) {
    console.log("errors", error);
  }
};

const deleteUser = async (req, res) => {
  try {
    // const user = await User.findByIdAndDelete(req.params.id);
    const user = await userService.removeUser(req.params.id);

    if (user) {
      res.json({
        status: "success",
        message: "User deleted successfully",
      });
    } else {
      res.json({
        status: "error",
        message: "user not found",
      });
    }
  } catch (error) {
    console.log("errors", error);
  }
};

module.exports = {
  createUser,
  userLogin,
  deleteUser,
  getAllUsers,
  singleUser,
  updateUser,
};
