const Product = require("../models/product");
const cloudinary = require("../middleware/cloudinary");
const productService = require("../services/productService");

const allProducts = async (req, res) => {
  // console.log("response", res)
  try {
    // const product = await Product.find().populate("categoryId");
    const product = await productService.findProducts();

    console.log("products", product);

    if (product) {
      res.json({
        status: "success",
        message: "products successfully found!",
        data: product,
      });
    } else {
      res.json({
        status: "error",
        message: "products not found!",
      });
    }
  } catch (error) {
    console.log("errors", error);
  }
};

const createProduct = async (req, res) => {
  try {
    console.log("body request", req.body);
    console.log("files request", req.files);
    // const uploadImage = req.file?.filename
    //   ? await cloudinary.uploader.upload(req.files[i].path)
    //   : null;

    let imagesUrl = [];

    for (let i = 0; i < req.files?.length; i++) {
      let result = await cloudinary.uploader.upload(req.files[i].path);
      console.log("result of uploaded images", result);
      imagesUrl.push(result.secure_url);
    }
    console.log("list of urls", imagesUrl);

    const addProduct = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      categoryId: req.body.categoryId,
      image: imagesUrl ? imagesUrl : [],
    };

    // const data = await Product.create(addProduct);
    const data = await productService.createProduct(addProduct);

    console.log("created product", data);

    if (data) {
      res.json({
        status: "success",
        message: "product created successfully",
        data: data,
      });
    }
  } catch (error) {
    console.log("errors", error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    // const product = await Product.findByIdAndDelete(req.params.id);
    const product = await productService.removeProduct(req.params.id);

    if (product) {
      res.json({
        status: "success",
        message: "product deleted successfully",
      });
    } else {
      res.json({
        status: "error",
        message: "product not found",
      });
    }
  } catch (error) {
    console.log("errrors, error");
  }
};

const updateProduct = async (req, res) => {
  try {
    let imagesUrl = [];

    for (let i = 0; i < req.files?.length; i++) {
      let result = await cloudinary.uploader.upload(req.files[i].path);
      console.log("result of uploaded images", result);
      imagesUrl.push(result.secure_url);
    }
    console.log("list of urls", imagesUrl);

    const updateData = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      categoryId: req.body.categoryId,
      image: imagesUrl ? imagesUrl : [],
    };
    // console.log("updated data of product", updatedData);

    const id = req.params.id;

    if (updateData.image == []) {
      delete updateData.image;
    }

    const product = await productService.editProduct(id, updateData);
    if (product) {
      res.json({
        status: "success",
        message: "product updated successfully",
        data: product,
      });
    } else {
      res.json({
        status: "error",
        message: "product not updated",
      });
    }
  } catch (error) {
    console.log("errors", error);
  }
};

const singleProduct = async (req, res) => {
  try {
    // const product = await Product.findById(req.params.id);
    const product = await productService.singleProduct(req.params.id);

    if (product) {
      res.json({
        status: "success",
        message: "product found successfully",
        data: product,
      });
    } else {
      res.json({
        status: "error",
        message: "product not found",
      });
    }
  } catch (error) {
    console.log("errors", error);
  }
};

const categoryBasedProduct = async (req, res) => {
  try {
    console.log("query parameter", req.query);
    const product = await Product.find({ categoryId: req.query.categoryId });
    console.log("product", product);

    if (product) {
      res.json({
        status: "success",
        message: "products found based on its category!",
        data: product,
      });
    } else {
      res.json({
        status: "error",
        message: "not found any product",
      });
    }
  } catch (error) {
    console.log("errors", error);
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  singleProduct,
  allProducts,
  categoryBasedProduct,
};
