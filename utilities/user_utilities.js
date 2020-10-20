const UserModel = require("../models/user_model");

//CRUD functions
//lean is needed for handlebars
const getAllUser = () => {
  return UserModel.find().lean();
};

const getOneUserById = id => {
  return UserModel.findById(id).lean();
};

const updateOneUserById = function(id) {
  return UserModel.findByIdAndUpdate(id).lean();
};

const deleteOneUserById = id => {
  return UserModel.findByIdAndDelete(id).lean();
};

module.exports = {
  getAllUser,
  updateOneUserById,
  getOneUserById,
  deleteOneUserById
};
