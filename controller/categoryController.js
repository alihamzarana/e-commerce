const Category = require("../models/category");
const cloudinary = require("../middleware/cloudinary");
const categoryService = require("../services/categoryService");

const allCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (categories) {
      res.json({
        status: "success",
        message: "all categories found successfully",
        data: categories,
      });
    } else {
      res.json({
        status: "error",
        message: "categories not found",
      });
    }
  } catch (error) {
    console.log("errors", error);
  }
};

const createCategory = async (req, res) => {
  try {
    const uploadImage = req.file?.filename
      ? await cloudinary.uploader.upload(req.file.path)
      : null;
    const categoryData = {
      title: req.body.title,
      description: req.body.description,
      image: uploadImage?.url,
      subCategory: req.body.subCategory
       
    };
    console.log("body request", req.body);
    // console.log("sub category", req.body.subCategory)
    const result = await Category.create(categoryData);
    console.log("creted category", result);

    // const data = await Category.updateOne(
    //   { _id: result._id },
    //   { $push: { subCategory: categoryData } }
    // );
    // console.log("sub category data",data);

    if (result) {
      res.json({
        status: "success",
        message: "category created successfully",
        data: result,
      });
    } else {
      res.json({
        status: "error",
        message: "category not created",
      });
    }
  } catch (error) {
    console.log("errors", error);
  }
};

const createSubCategory = async (req, res) => {
  try {
    const uploadImage = req.file?.filename
      ? await cloudinary.uploader.upload(req.file.path)
      : null;
    const categoryData = {
      title: req.body.title,
      description: req.body.description,
      image: uploadImage?.url,
      subCategory: req.body.subCategory,
    };
    console.log("category data", categoryData);
    const result = await Category.create(categoryData);
    //  console.log("creted category", result);

    // const data = await Category.updateOne(
    //   { _id: result._id },
    //   { $push: { subCategory:  } }
    // );
    // console.log("sub category data", data);

    if (result) {
      res.json({
        status: "success",
        message: "category created successfully",
        data: result,
      });
    } else {
      res.json({
        status: "error",
        message: "category not created",
      });
    }
  } catch (error) {
    consle.log("errors", error);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    console.log("deleted category", category);
    if (category) {
      res.json({
        status: "success",
        message: "category deleted successfully",
      });
    } else {
      res.json({
        status: "error",
        message: "category not deleted",
      });
    }
  } catch (error) {
    console.log("errors", error);
  }
};

const deleteSubCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    // const data = await User.updateOne(
    //   { _id: category._id },
    //   { $pull: { subCategory:  } }
    // );
    if (category) {
      res.json({
        status: "success",
        message: "category deleted successfully",
      });
    } else {
      res.json({
        status: "error",
        message: "category not deleted",
      });
    }
  } catch (error) {
    console.log("errors", error);
  }
};

module.exports = {
  createCategory,
  deleteCategory,
  allCategories,
  createSubCategory,
};
//    subCategory: req.body?.subCategory[1]
//         ? { ...req.body.subCategory, image: uploadImage?.url }
//         : req.body.subCategory,