import express from "express";

import { registerUser, loginUser } from "../controllers/auth.js";

const Router = express.Router();

Router.post("/register", registerUser);
Router.post("/login", loginUser);

export default Router;
