const User = require("../models/user");
const bcrypt = require("bcrypt");

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body, password: hashedPassword },
      {
        new: true,
      }
    );
    res.send(updated);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    res.send("User deleted successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
