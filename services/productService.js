const Product = require("../models/product");

const findProducts = async () => {
  const products = await Product.find().populate("categoryId");
  return products;
};

const createProduct = async (productData) => {
  const product = await new Product(productData);
  const saveProduct = await product.save();
  return saveProduct;
};

const editProduct = async (id, productData) => {
  const updtedProduct = await Product.findByIdAndUpdate(id, { ...productData });
  return updtedProduct;
};
module.exports = { findProducts, createProduct, editProduct };
