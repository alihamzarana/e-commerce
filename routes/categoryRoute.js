const express = require("express");
const router = express.Router();
// const image = require("../middleware/multer");
// const auth = require("../middleware/auth");
const middleware = require("../middleware/middleware");

const categoryController = require("../controller/categoryController");

router.post("/", middleware.upload, categoryController.createCategory);
router.get("/", middleware.authenticate, categoryController.allCategories);

router.get("/:id", categoryController.singleCategory);
router.delete("/:id", categoryController.deleteCategory);
router.put("/:id", middleware.upload, categoryController.updateCategory);

router.put(
  "/subcategory/:id",
  middleware.singleUpload,
  categoryController.createSubCategory
);
router.put(
  "/:id/subcategory",
  middleware.singleUpload,
  categoryController.editSubCategory
);
router.delete("/:id", categoryController.deleteSubCategory);

module.exports = router;
