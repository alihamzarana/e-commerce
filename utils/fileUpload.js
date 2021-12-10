const cloudinary = require("../middleware/cloudinary");

const imageUploader = async (files) => {
  let imagesUrl = [];

  for (let i = 0; i < files?.length; i++) {
    let result = await cloudinary.uploader.upload(files[i].path);
    // console.log("result of uploaded images", result);
    imagesUrl.push(result.secure_url);
  }
  console.log("list of urls", imagesUrl);
  return imagesUrl;
};

module.exports = { imageUploader };
