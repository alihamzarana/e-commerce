const express = require("express");
const router = express.Router();
const auth = require("../middleware/multer");

const productController = require("../controller/productController");

router.post("/new", auth.upload, productController.createProduct);
router.get("/all", productController.allProducts);
router.delete("/delete/:id", productController.deleteProduct);
router.get("/:id", productController.singleProduct);
router.put("/edit/:id", auth.upload, productController.updateProduct);
module.exports = router;
