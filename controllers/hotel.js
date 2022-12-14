import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { errorHandling } from "../utils/error.js";

// create hotel
export const createHotel = async (req, res, next) => {
  try {
    const newHotel = new Hotel(req.body);
    const createdHotel = await newHotel.save();
    res.status(201).json(createdHotel);
  } catch (err) {
    next(errorHandling(err.status, err.message));
  }
};

// get all hotels
export const getAllHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;

  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gte: min || 100, $lte: max || 1000 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(errorHandling(err.status, err.message));
  }
};

// get hotel
export const getHotel = async (req, res, next) => {
  try {
    const { hotelId } = req.params;
    const hotel = await Hotel.findById(hotelId);
    res.status(200).json(hotel);
  } catch (err) {
    next(errorHandling(err.status, err.message));
  }
};

// update hotel
export const updateHotel = async (req, res, next) => {
  try {
    const { hotelId } = req.params;
    const updatedHotel = await Hotel.findByIdAndUpdate(
      hotelId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(errorHandling(err.status, err.message));
  }
};

// delete hotel
export const deleteHotel = async (req, res, next) => {
  try {
    const { hotelId } = req.params;
    await Hotel.findByIdAndDelete(hotelId);
    res.status(200).json("Hotel has been deleted");
  } catch (err) {
    next(errorHandling(err.status, err.message));
  }
};

// count by city
export const countByCity = async (req, res, next) => {
  try {
    const cities = req.query.cities.split(",");

    const quantities = await Promise.all(
      cities.map((city) =>
        Hotel.countDocuments({
          city,
        })
      )
    );

    res.status(200).json(
      quantities.map((q, i) => ({
        city: cities[i],
        quantity: q,
      }))
    );
  } catch (err) {
    next(errorHandling(err.status, err.message));
  }
};

// count by type
export const countByType = async (req, res, next) => {
  try {
    const types = req.query.types.split(",");
    const quantities = await Promise.all(
      types.map((type) => Hotel.countDocuments({ type }))
    );

    res
      .status(200)
      .json(
        quantities.map((quantity, idx) => ({ property: types[idx], quantity }))
      );
  } catch (err) {
    next(errorHandling(err.status, err.message));
  }
};

// get hotel rooms
export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.hotelId);
    const rooms = await Promise.all(
      hotel.rooms.map((roomId) => Room.findById(roomId))
    );

    res.status(200).json(rooms);
  } catch (err) {
    next(errorHandling(err.status, err.message));
  }
};
