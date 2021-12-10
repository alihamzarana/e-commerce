const express = require("express");
const router = express.Router();
const image = require("../middleware/multer");
const auth = require("../middleware/auth");

const productController = require("../controller/productController");
const categoryController = require("../controller/categoryController");


router.post("/", image.upload, productController.createProduct);
router.get("/", productController.allProducts);
router.post("/", image.upload, categoryController.createCategory);
router.get("/", auth.authenticate, categoryController.allCategories);
router.get("/category", productController.categoryBasedProduct);
router.delete("/:id", productController.deleteProduct);
router.get("/:id", productController.singleProduct);
router.put("/:id", image.upload, productController.updateProduct);
router.get("/:id", categoryController.singleCategory);
router.delete("/:id", categoryController.deleteCategory);
router.put("/:id", image.upload, categoryController.updateCategory);
router.delete("/:id", categoryController.deleteSubCategory);
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

module.exports = router;
