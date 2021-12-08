const express = require("express");
const router = express.Router();
const auth = require("../middleware/multer");

const subCategoryController = require("../controller/subCategoryController");

router.put("/:id", auth.upload, subCategoryController.createSubCategory);
router.delete("/:id", subCategoryController.deleteSubCategory);

module.exports = router;
