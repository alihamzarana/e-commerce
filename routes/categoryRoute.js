const express = require("express");
const router = express.Router();
const auth = require("../middleware/multer");

const categoryController = require("../controller/categoryController");

router.post("/", auth.upload, categoryController.createCategory);
router.get("/", categoryController.allCategories);

router.get("/:id", categoryController.singleCategory);
router.delete("/:id", categoryController.deleteCategory);
router.put("/:id", auth.upload, categoryController.updateCategory);

module.exports = router;
