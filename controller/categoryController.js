const Category = require("../models/category");
const cloudinary = require("../middleware/cloudinary");
const categoryService = require("../services/categoryService");

const allCategories = async (req, res) => {
  try {
    // const categories = await Category.find();
    const categories = await categoryService.findCategories();

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
    console.log("body request", req.body);
    console.log("files request", req.files);
    // console.log("body request", req.body);
    // const uploadImage = req.file?.filename
    //   ? await cloudinary.uploader.upload(req.file.path)
    //   : null;
    let imagesUrl = [];

    for (let i = 0; i < req.files?.length; i++) {
      let result = await cloudinary.uploader.upload(req.files[i].path);
      console.log("result of uploaded images", result);
      imagesUrl.push(result.secure_url);
    }
    console.log("list of urls", imagesUrl);

    // console.log("uploaded image", uploadImage);
    const categoryData = {
      title: req.body.title,
      description: req.body.description,
      image: imagesUrl ? imagesUrl : [],
    };

    // console.log("sub category", req.body.subCategory)
    // const result = await Category.create(categoryData);
    const category = await categoryService.addCategory(categoryData);

    console.log("creted category", category);

    // const data = await Category.updateOne(
    //   { _id: result._id },
    //   { $push: { subCategory: categoryData } }
    // );
    // console.log("sub category data",data);

    if (category) {
      res.json({
        status: "success",
        message: "category created successfully",
        data: category,
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

const updateCategory = async (req, res) => {
  try {
    console.log("body request", req.body);
    console.log("files request", req.files);

    let imagesUrl = [];

    for (let i = 0; i < req.files?.length; i++) {
      let result = await cloudinary.uploader.upload(req.files[i].path);
      console.log("result of uploaded images", result);
      imagesUrl.push(result.secure_url);
    }
    console.log("list of urls", imagesUrl);

    console.log("uploaded image", uploadImage);
    const categoryData = {
      title: req.body.title,
      description: req.body.description,
      image: imagesUrl ? imagesUrl : [],
    };
    if (categoryData.image == null) {
      delete categoryData.image;
    }

    // console.log("sub category", req.body.subCategory)
    // const updatedCategory = await Category.findByIdAndUpdate(
    //   id,
    //   { ...categoryData },
    //   { new: true }
    // );
    const updatedCategory = await categoryService.editCategory(
      req.params.id,
      categoryData
    );
    console.log("creted category", updatedCategory);

    // const data = await Category.updateOne(
    //   { _id: result._id },
    //   { $push: { subCategory: categoryData } }
    // );
    // console.log("sub category data",data);

    if (updatedCategory) {
      res.json({
        status: "success",
        message: "category created successfully",
        data: updatedCategory,
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

const singleCategory = async (req, res) => {
  try {
    console.log("id for single category", req.params.id);
    const category = await categoryService.getSingleCategory(req.params.id);

    if (category) {
      res.json({
        status: "success",
        message: "category found successfully",
        data: category,
      });
    } else {
      res.json({
        status: "error",
        message: "category not found",
      });
    }
  } catch (error) {
    console.log("errors", error);
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

module.exports = {
  createCategory,
  deleteCategory,
  allCategories,
  updateCategory,
  singleCategory,
};
//    subCategory: req.body?.subCategory[1]
//         ? { ...req.body.subCategory, image: uploadImage?.url }
//         : req.body.subCategory,
