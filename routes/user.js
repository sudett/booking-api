import express from "express";

import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";

import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user.js";

const Router = express.Router();

Router.get("/", verifyAdmin, getAllUsers);
Router.get("/:userId", verifyUser, getUser);
Router.put("/:userId", verifyUser, updateUser);
Router.delete("/:userId", verifyUser, deleteUser);

export default Router;
