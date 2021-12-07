const express = require("express");
const router = express.Router();
const auth = require("../middleware/multer");

const subCategoryController = require("../controller/subCategoryController");

router.put("/new/:id", auth.upload, subCategoryController.createSubCategory);
router.delete("/delete/:id", subCategoryController.deleteSubCategory);

module.exports = router;
