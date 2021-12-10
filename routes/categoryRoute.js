const express = require("express");
const router = express.Router();
const image = require("../middleware/multer");
const auth = require("../middleware/auth");

const categoryController = require("../controller/categoryController");

router.post("/", image.upload, categoryController.createCategory);
router.get("/", auth.authenticate, categoryController.allCategories);

router.get("/:id", categoryController.singleCategory);
router.delete("/:id", categoryController.deleteCategory);
router.put("/:id", image.upload, categoryController.updateCategory);

router.put(
  "/subcategory/:id",
  image.upload,
  categoryController.createSubCategory
);
router.put(
  "/:id/subcategory",
  image.upload,
  categoryController.editSubCategory
);
router.delete("/:id", categoryController.deleteSubCategory);

module.exports = router;
