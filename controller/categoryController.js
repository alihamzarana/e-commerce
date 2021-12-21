const Category = require("../models/category");
const categoryService = require("../services/categoryService");
const utils = require("../utils/fileUpload");
let cloudinary = require("../middleware/cloudinary");
// const middleware = require("../middleware/multer");

const allCategories = async (req, res) => {
  try {
    // const categories = await Category.find();
    const categories = await categoryService.findCategories();
    console.log("all categories found", categories);

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
    console.log("sub category request", JSON.parse(req.body.subCategory));

    console.log("image request", req.file);
    // console.log("files request", req.files);
    // console.log("body request", req.body);
    // const uploadImage = req.file?.filename
    //   ? await cloudinary.uploader.upload(req.file.path)
    //   : null;
    // const imagesUrl = await utils.cloudinaryUploader(req.file);
    // console.log("image request", imagesUrl);
    let uploadImage = req.file?.filename
      ? await cloudinary.uploader.upload(req.file.path)
      : null;

    console.log("upload image of category", uploadImage);
    // if (req.body.subCategory) {
    // }
    // let subCategoryData = req.body.subCategory
    //   ? req.body.subCategory.map((elem) => {
    //       return elem;
    //     })
    //   : [];
    // let subCategoryData = req.body.subCategory
    //   ? await Promise.all(
    //       req.body.subCategory?.map((elem) => {
    //         // console.log("subCategoryData0", elem);
    //         // return (elem.image = uploadImage?.url ? uploadImage.url : null);
    //         return elem;

    //         // if (elem.image) {
    //         //   let uploadedImage = req.file?.filename
    //         //     ? cloudinary.uploader.upload(req.file.path)
    //         //     : null;
    //         //   // console.log("uplodaed image", uploadedImage);
    //         //   elem.image = uploadedImage?.url ? uploadedImage.url : null;

    //         //   return { ...elem, ...elem.image };
    //         // } else {
    //         //   ;
    //         // }
    //       })
    //     )
    //   : [];

    console.log("uploaded image", uploadImage);
    const categoryData = {
      title: req.body.title,
      image: uploadImage?.url ? uploadImage.url : null,
      description: req.body.description,
      subCategory: JSON.parse(req.body.subCategory),
    };

    // console.log("category data", categoryData);

    // console.log("subcategory data", subCategoryData);

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

    // const imagesUrl = await utils.imageUploader(req.files);
    const uploadImage = req.file?.filename
      ? await cloudinary.uploader.upload(req.file.path)
      : null;

    const categoryData = {
      title: req.body.title,
      image: uploadImage?.url ? uploadImage.url : null,
      description: req.body.description,
      subCategory: JSON.parse(req.body.subCategory),
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
        message: "category updated successfully",
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

// const createSubCategory = async (req, res) => {
//   try {
//     console.log("sub category", req.body);
//     console.log("image request", req.file);
//     // const imagesUrl = await utils.imageUploader(req.files);
//     const uploadImage = req.file?.filename
//       ? await cloudinary.uploader.upload(req.file.path)
//       : null;

//     console.log("uploaded image", uploadImage);
//     const categoryData = {
//       title: req.body.title,
//       description: req.body.description,
//       image: uploadImage?.url ? uploadImage.url : null,
//     };
//     console.log("category data", categoryData);

//     const result = await Category.findByIdAndUpdate(
//       { _id: req.params.id },
//       { $push: { subCategory: categoryData } }
//     );
//     console.log("created sub category", result);

//     if (result) {
//       res.json({
//         status: "success",
//         message: "subCategory created successfully",
//         data: result,
//       });
//     } else {
//       res.json({
//         status: "error",
//         message: "category not created",
//       });
//     }
//   } catch (error) {
//     throw error;
//   }
// };

const editSubCategory = async (req, res) => {
  try {
    console.log("query request", req.query);
    console.log("params request", req.params);
    console.log("body request", req.body);
    console.log("image request", req.file);
    // const imagesUrl = await utils.imageUploader(req.files);
    // const uploadImage = req.file?.filename
    //   ? await cloudinary.uploader.upload(req.file.path)
    //   : null;

    console.log("uploaded image", uploadImage);
    const updatedSubCategoryData = {
      title: req.body.title,
      description: req.body.description,
      // image: uploadImage?.url ? uploadImage.url : null,
    };

    let category = await Category.findOne({ _id: req.params.id });
    category = category.toObject();
    const id = req.query.id;
    console.log("sub category id", id);

    let newArray = [];
    newArray = category.subCategory.map((item) => {
      console.log("item._id", item._id == id);
      return item._id == id ? { ...item, ...updatedSubCategoryData } : item;
    });
    // console.log("is data updating?", {
    //   ...subCategory,
    //   ...updatedSubCategoryData,
    // });

    console.log("new array is", newArray);

    const result = await Category.findByIdAndUpdate(
      { _id: req.params.id },
      { subCategory: newArray },
      { new: true }
    );
    console.log("result ", result);

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
        message: "Subcategory not exist",
      });
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createCategory,
  deleteCategory,
  allCategories,
  updateCategory,
  singleCategory,
  // createSubCategory,
  editSubCategory,
  deleteSubCategory,
};
