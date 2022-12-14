import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import hotelRoute from "./routes/hotel.js";
import authRoute from "./routes/auth.js";
import userRouter from "./routes/user.js";
import roomRouter from "./routes/room.js";

dotenv.config();

// mongodb connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongo connected");
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// server
const app = express();

// middlewares
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(cookieParser());

// middleware for using json in request body
app.use(express.json());

app.use("/api/hotels", hotelRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRouter);
app.use("/api/rooms", roomRouter);

// error handling middleware
app.use((err, req, res, next) => {
  const { status, message, stack } = err;
  res.status(status || 500).json({
    message: message || "Something went wrong!",
    stack,
  });
});

app.listen(8800, () => {
  connect();
  console.log("server connected!!!");
});
