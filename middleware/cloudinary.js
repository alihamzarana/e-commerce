const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: 'db1d7fl9p',
  api_key: "297231815972166",
  api_secret: "jIZ99cJXFLSYfv36RuLN6uJLu2A",
});

module.exports = cloudinary;
