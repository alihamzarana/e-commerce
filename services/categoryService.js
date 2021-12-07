const Category = require("../models/category");

const addCategory = async (categoryData) => {
  const categroy = await new Category(categoryData);
  const result = await categroy.save();
  console.log("result", result);
  //   saveCategory(result._id);
  return result;
};

const findCategories = async () => {
  const categories = await Category.find();
  return categories;
};

const removeCategory = async (id) => {
  const category = await Category.findByIdAndDelete(id);
  return category;
};

const editCategory = async (id, categoryData) => {
  console.log("updted category data", categoryData);
  const category = await Category.findByIdAndUpdate(
    id,
    { ...categoryData },
    { new: true }
  );
  return category;
};
// const saveCategory = async (categoryId) => {
//   const data = await Category.updateOne(
//     { _id: categoryId },
//     { $push: { subCategory:   }}
//   );
//   return data;
// };

module.exports = { addCategory, findCategories, removeCategory, editCategory };
