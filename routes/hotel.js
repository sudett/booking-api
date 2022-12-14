import express from "express";
import {
  createHotel,
  getHotel,
  getAllHotels,
  updateHotel,
  deleteHotel,
  countByCity,
  countByType,
  getHotelRooms,
} from "../controllers/hotel.js";

import { verifyAdmin } from "../utils/verifyToken.js";

const Router = express.Router();

Router.get("/countbycity", countByCity);
Router.get("/countbytype", countByType);

Router.post("/", verifyAdmin, createHotel);
Router.get("/", getAllHotels);
Router.get("/:hotelId", getHotel);
Router.put("/:hotelId", verifyAdmin, updateHotel);
Router.delete("/:hotelId", verifyAdmin, deleteHotel);
Router.get("/rooms/:hotelId", getHotelRooms);

export default Router;
