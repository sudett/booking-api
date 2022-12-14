import express from "express";

import {
  getRoom,
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  updateRoomAvailability,
} from "../controllers/room.js";

import { verifyAdmin } from "../utils/verifyToken.js";

const Router = express.Router();

Router.get("/:roomId", getRoom);
Router.get("/", getAllRooms);
Router.post("/:hotelId", verifyAdmin, createRoom);
Router.put("/:roomId", verifyAdmin, updateRoom);
Router.delete("/:roomId/:hotelId", verifyAdmin, deleteRoom);
Router.put("/availability/:roomId", updateRoomAvailability);

export default Router;
