const express = require("express");
const router = express.Router();
// const image = require("../middleware/multer");
// const auth = require("../middleware/auth");
const middleware = require("../middleware/middleware");
const productController = require("../controller/productController");
const categoryController = require("../controller/categoryController");

router.post(
  "/product",
  [middleware.authenticate, middleware.upload],
  productController.createProduct
);
router.get("/product", middleware.authenticate, productController.allProducts);
router.post(
  "/category",
  [middleware.authenticate, middleware.singleUpload],
  categoryController.createCategory
);
router.get(
  "/category",
  middleware.authenticate,
  categoryController.allCategories
);
router.get(
  "/product/category",
  middleware.authenticate,
  productController.categoryBasedProduct
);
router.delete(
  "/product/:id",
  middleware.authenticate,
  productController.deleteProduct
);
router.get(
  "/product/:id",
  middleware.authenticate,
  productController.singleProduct
);
router.put(
  "/product/:id",
  [middleware.authenticate, middleware.upload],
  productController.updateProduct
);
router.get(
  "/category/:id",
  middleware.authenticate,
  categoryController.singleCategory
);
router.delete(
  "/category/:id",
  middleware.authenticate,
  categoryController.deleteCategory
);
router.put(
  "/category/:id",
  [middleware.authenticate, middleware.upload],
  categoryController.updateCategory
);
// router.put(
//   "/category/subcategory/:id",
//   [middleware.authenticate, middleware.singleUpload],
//   categoryController.createSubCategory
// );
router.delete(
  "/category/subcategory/:id",
  middleware.authenticate,
  categoryController.deleteSubCategory
);
router.put(
  "/category/subcategory/update/:id",
  [middleware.authenticate, middleware.singleUpload],
  categoryController.editSubCategory
);

module.exports = router;
