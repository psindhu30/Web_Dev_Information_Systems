const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const mongodbconn = mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connection successful")
  })
  .catch((error) => {
    return error;
  });

module.exports = mongodbconn;
