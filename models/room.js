const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    roomNumbers: [
      {
        number: Number,
        unavailableDates: {
          type: [String],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("Room", schema);

module.exports = Room;
