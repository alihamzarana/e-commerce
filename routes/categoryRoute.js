const express = require("express");
const router = express.Router();
// const image = require("../middleware/multer");
// const auth = require("../middleware/auth");
const middleware = require("../middleware/middleware");

const categoryController = require("../controller/categoryController");

router.post("/", middleware.singleUpload, categoryController.createCategory);
router.get("/", categoryController.allCategories);

router.get("/:id", categoryController.singleCategory);
router.delete("/:id", categoryController.deleteCategory);
router.put("/:id",  middleware.singleUpload, categoryController.updateCategory);

// router.put(
//   "/subcategory/:id",
//   middleware.singleUpload,
//   categoryController.createSubCategory
// );
router.put(
  "/:id/subcategory",
  middleware.singleUpload,
  categoryController.editSubCategory
);
router.delete("/:id", categoryController.deleteSubCategory);

module.exports = router;
