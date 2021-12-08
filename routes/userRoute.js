const express = require("express");
const router = express.Router();

const userController = require("../controller/userControllers");

router.post("/register", userController.createUser);
router.post("/login", userController.userLogin);
router.get("/", userController.getAllUsers);

router.delete("/:id", userController.deleteUser);
router.get("/:id", userController.singleUser);
router.put("/:id", userController.updateUser);

module.exports = router;
