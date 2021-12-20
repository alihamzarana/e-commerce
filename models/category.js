const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: [
      {
        type: String,
        required: false,
      },
    ],
    description: {
      type: String,
      required: false,
    },

    subCategory: [
      {
        title: {
          type: String,
          required: false,
        },
        description: {
          type: String,
          required: false,
        },

        image: {
          type: String,
          required: false,
        },
      },
    ],
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
