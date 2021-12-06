const Category = require("../models/category");

const addCategory = async (categoryData) => {
  const categroy = await new Category(categoryData);
  const result = await categroy.save();
  console.log("result", result);
//   saveCategory(result._id);
  return result;
};

// const saveCategory = async (categoryId) => {
//   const data = await Category.updateOne(
//     { _id: categoryId },
//     { $push: { subCategory:   }}
//   );
//   return data;
// };

module.exports = { addCategory };
