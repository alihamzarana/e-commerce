const User = require("../models/user");
const mongoose = require("mongoose");

const uri =
  "mongodb+srv://user:64CNzQ1lWN5BLtiT@node.8jzbu.mongodb.net/e-commerce?retryWrites=true&w=majority";

mongoose
  .connect(uri)
  .then(() => {
    console.log("db connected for seeding");
  })
  .catch((error) => console.log("db error", error));

const seedUser = {
  userName: "superadmin",
  email: "superadmin@gmail.com",
  password: "12345678",
  role: "superadmin",
};

const seedDB = async () => {
  await User.insertMany(seedUser);
};

seedDB().then(() => {
  mongoose.connection.close();
});
