const express = require("express");
const router = express.Router();
const auth = require("../middleware/multer");

const categoryController = require("../controller/categoryController");

router.post("/new", auth.upload, categoryController.createCategory);
router.get("/all", categoryController.allCategories);

router.delete("/delete/:id", categoryController.deleteCategory);
router.put("/edit/:id", auth.upload, categoryController.updateCategory);

module.exports = router;
