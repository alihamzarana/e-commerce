const User = require("../models/user");

const allUsers = async () => {
  const users = await User.find();
  return users;
};

const createUser = async (userData) => {
  const user = await new User(userData);
  const data = await user.save();
  return data;
};

const editUser = async (id, updatedData) => {
  const updtedUser = await User.findByIdAndUpdate(
    id,
    { ...updatedData },
    { new: true }
  );
  return updtedUser;
};

const singleUser = async (id) => {
  const user = await User.findById(id);
  return user;
};

const findUser = async (userEmail) => {
  const user = await User.findOne(userEmail);
  return user;
};
const removeUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  return user;
};

module.exports = {
  findUser,
  allUsers,
  createUser,
  editUser,
  singleUser,
  removeUser,
};
