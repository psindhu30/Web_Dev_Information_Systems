const express = require("express");
const auth = require("../middleware/auth");
const hotels = require("../controllers/hotels");

const hotelRouter = express.Router();

hotelRouter.get("/gethotel/:id", hotels.getHotel);
hotelRouter.get("/getallhotels", hotels.getAllHotels);
hotelRouter.get("/getrooms/:id", hotels.getRooms);
hotelRouter.get("/countbycity", hotels.countByCity);
hotelRouter.get("/countbytype", hotels.countByType);
hotelRouter.post("/createhotel", hotels.createHotel);
hotelRouter.put("/updatehotel/:id", auth.verifyAdmin, hotels.updateHotel);
hotelRouter.delete("/deletehotel/:id", auth.verifyAdmin, hotels.deleteHotel);

module.exports = hotelRouter;
