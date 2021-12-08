const express = require("express");
const router = express.Router();
const auth = require("../middleware/multer");

const productController = require("../controller/productController");

router.post("/", auth.upload, productController.createProduct);
router.get("/", productController.allProducts);
router.delete("/:id", productController.deleteProduct);
router.get("/:id", productController.singleProduct);
router.put("/:id", auth.upload, productController.updateProduct);
module.exports = router;
