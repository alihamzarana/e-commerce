const express = require("express");
const router = express.Router();

const userController = require("../controller/userControllers");

router.post("/new", userController.createUser);
router.post("/login", userController.userLogin);
router.get("/all", userController.getAllUsers);

router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
