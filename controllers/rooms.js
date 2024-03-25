const Room = require("../models/room");
const Hotel = require("../models/hotel");

const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.send(room);
  } catch (error) {
    next(error);
  }
};

const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.send(rooms);
  } catch (error) {
    next(error);
  }
};

const createRoom = async (req, res, next) => {
  try {
    const rooms = Room(req.body);
    await rooms.save();

    const hotel = await Hotel.findByIdAndUpdate(req.params.hotelid, {
      $push: { rooms: rooms._id },
    });

    res.send("Room created successfully");
  } catch (error) {
    next(error);
  }
};

const updateRoom = async (req, res, next) => {
  try {
    const updated = await Room.findByIdAndUpdate(req.params.id, req.body);
    res.send(updated);
  } catch (error) {
    next(error);
  }
};

const updateRoomAvail = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );
    res.send("Room has been updated");
  } catch (error) {
    next(error);
  }
};

const deleteRoom = async (req, res, next) => {
  try {
    const deleted = await Room.findByIdAndDelete(req.params.id);

    const hotel = await Hotel.findByIdAndUpdate(req.params.hotelid, {
      $pull: { rooms: req.params.id },
    });

    res.send("Room deleted successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRoom,
  getAllRooms,
  createRoom,
  updateRoom,
  updateRoomAvail,
  deleteRoom,
};
