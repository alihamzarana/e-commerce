const express = require("express");
const router = express.Router();

const userController = require("../controller/userControllers");

router.post("/new", userController.createUser);
router.post("/login", userController.userLogin);
router.get("/all", userController.getAllUsers);

router.delete("/delete/:id", userController.deleteUser);
router.get("/:id", userController.singleUser);
router.put("/edit/:id", userController.updateUser);

module.exports = router;
