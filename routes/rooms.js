const express = require("express");
const auth = require("../middleware/auth");
const rooms = require("../controllers/rooms");

const roomRouter = express.Router();

roomRouter.get("/getroom/:id", auth.verifyUser, rooms.getRoom);
roomRouter.get("/getallrooms", auth.verifyAdmin, rooms.getAllRooms);
roomRouter.post("/createroom/:hotelid", auth.verifyAdmin, rooms.createRoom);
roomRouter.put("/updateroom/:id", auth.verifyAdmin, rooms.updateRoom);
roomRouter.put("/updateroomavail/:id", rooms.updateRoomAvail);
roomRouter.delete(
  "/deleteroom/:hotelid/:id",
  auth.verifyAdmin,
  rooms.deleteRoom
);

module.exports = roomRouter;
