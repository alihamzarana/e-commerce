const Category = require("../models/category");
const cloudinary = require("../middleware/cloudinary");

const createSubCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const uploadImage = req.file?.filename
      ? await cloudinary.uploader.upload(req.file.path)
      : null;
    const categoryData = {
      title: req.body.title,
      image: uploadImage?.url,
    };

    // console.log("sub category", req.body.subCategory)
    const result = await Category.findByIdAndUpdate(
      { _id: id },
      { $push: { subCategory: categoryData } }
    );
    console.log("created sub category", result);

    if (result) {
      res.json({
        status: "success",
        message: "subCategory created successfully",
        data: result,
      });
    } else {
      res.json({
        status: "error",
        message: "category not created",
      });
    }
  } catch (error) {
    throw error;
  }
};

const deleteSubCategory = async (req, res) => {
  try {
    const id = req.query.subCategory;
    console.log("query parameter", req.query.subCategory);
    const paramsId = req.params.id;
    console.log("params id", paramsId);

    const result = await Category.findByIdAndUpdate(
      { _id: req.params.id },
      { $pull: { subCategory: { _id: id } } }
    );
    console.log("deleted sub category", result);

    if (result) {
      res.json({
        status: "success",
        message: "subCategory deleted successfully",
      });
    } else {
      res.json({
        status: "error",
        message: "Subcategory not deleted",
      });
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { createSubCategory, deleteSubCategory };
