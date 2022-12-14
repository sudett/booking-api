import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

import { errorHandling } from "../utils/error.js";

// create room
export const createRoom = async (req, res, next) => {
  try {
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body);

    const savedRoom = await newRoom.save();
    await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } });

    res.status(200).json(savedRoom);
  } catch (err) {
    next(errorHandling(err.status, err.message));
  }
};

// get room
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.roomId);
    res.status(200).json(room);
  } catch (err) {
    next(errorHandling(err.status, err.message));
  }
};

// get all rooms
export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(errorHandling(err.status, err.message));
  }
};

// update room
export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.roomId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(errorHandling(err.status, err.message));
  }
};

// delete room
export const deleteRoom = async (req, res, next) => {
  try {
    const roomId = req.params.roomId;
    await Room.findByIdAndDelete(roomId);
    await Hotel.findByIdAndUpdate(req.params.hotelId, {
      $pull: { rooms: roomId },
    });

    res.status(200).json("Room has been deleted!");
  } catch (err) {
    next(errorHandling(err.status, err.message));
  }
};

// update room availability
export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.roomId },
      { $push: { "roomNumbers.$.unavailableDates": req.body.dates } }
    );

    res.status(200).json("Room has been updated");
  } catch (err) {
    next(errorHandling(err.status, err.message));
  }
};
