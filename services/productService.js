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
  console.log("product data", productData);
  const updtedProduct = await Product.findByIdAndUpdate(id, { ...productData }, {new: true});
  return updtedProduct;
};

const removeProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  return product;
};

const singleProduct = async (id) => {
  const product = await Product.findById(id);
  return product;
};
module.exports = {
  findProducts,
  createProduct,
  editProduct,
  removeProduct,
  singleProduct,
};
