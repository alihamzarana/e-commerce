const express = require("express");
const router = express.Router();

const userController = require("../controller/userControllers");

router.post("/new", userController.createUser);
router.post("/login", userController.userLogin);

module.exports = router;
