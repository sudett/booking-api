import User from "../models/User.js";
import { errorHandling } from "../utils/error.js";

// get user
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    res.status(200).json(user);
  } catch (err) {
    next(errorHandling(err.status, err.message));
  }
};

// get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(errorHandling(err.status, err.message));
  }
};

// update user
export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(errorHandling(err.status, err.message));
  }
};

// delete user
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("USER HAS BEEN DELETED");
  } catch (err) {
    next(errorHandling(err.status, err.message));
  }
};
