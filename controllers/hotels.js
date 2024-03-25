const Hotel = require("../models/hotel");
const Room = require("../models/room");

const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.send(hotel);
  } catch (error) {
    next(error);
  }
};

const getAllHotels = async (req, res, next) => {
  const { min, max, city, ...others } = req.query;
  try {
    let hotels = []
    console.log(city)
    if (city !== null && city != undefined && city !== "") {
      hotels = await Hotel.find({
        city,
        ...others,
        cheapestPrice: { $gte: min || 1, $lte: max || 99999 },
      }).limit(req.query.limit);
    }
    else {
      hotels = await Hotel.find({

        ...others,
        cheapestPrice: { $gte: min || 1, $lte: max || 99999 },
      }).limit(req.query.limit);
    }

    console.log(hotels)
    res.send(hotels);
  } catch (error) {
    next(error);
  }
};

const getRooms = async (req, res, next) => {
  try {
    const hotels = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotels.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.send(list);
  } catch (error) {
    next(error);
  }
};

const countByCity = async (req, res, next) => {
  try {
    const cities = req.query.city.split(",");
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city });
      })
    );
    res.send(list);
  } catch (error) {
    next(error);
  }
};

const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const appartmentCount = await Hotel.countDocuments({ type: "appartment" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const resortsCount = await Hotel.countDocuments({ type: "resort" });
    console.log(hotelCount, appartmentCount, villaCount, resortsCount)

    res.send([
      { type: "hotels", count: hotelCount },
      { type: "appartments", count: appartmentCount },
      { type: "villas", count: villaCount },
      { type: "resorts", count: resortsCount },
    ]);
  } catch (error) {
    next(error);
  }
};

// const countByType = async (req, res, next) => {
//   try {
//     const distinctTypes = await Hotel.distinct('type');

//     const counts = await Promise.all(
//       distinctTypes.map(async (type) => {
//         const count = await Hotel.countDocuments({ type });
//         return { type, count };
//       })
//     );
//       console.log(counts)
//     res.json(counts);
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// };

// const countByType = async (req, res, next) => {
//   try {
//     const types = ["hotels", "appartments", "villas", "resorts"];

//     const counts = await Promise.all(
//       types.map(async (type) => {
//         const count = await Hotel.countDocuments({ type });
//         return { type, count };
//       })
//     );

//     res.send(counts);
//   } catch (error) {
//     next(error);
//   }
// };





const createHotel = async (req, res, next) => {
  try {
    const hotel = Hotel(req.body);
    await hotel.save();
    res.send("Hotel created successfully");
  } catch (error) {
    next(error);
  }
};

const updateHotel = async (req, res, next) => {
  try {
    const updated = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(updated);
  } catch (error) {
    next(error);
  }
};

const deleteHotel = async (req, res, next) => {
  try {
    const deleted = await Hotel.findByIdAndDelete(req.params.id);
    res.send("Hotel deleted successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getHotel,
  getAllHotels,
  getRooms,
  countByCity,
  countByType,
  createHotel,
  updateHotel,
  deleteHotel,
};
