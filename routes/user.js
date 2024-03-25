const express = require("express");
const auth = require("../middleware/auth");
const user = require("../controllers/user");

const userRouter = express.Router();

userRouter.get("/getuser/:id", auth.verifyUser, user.getUser);
userRouter.get("/getallusers", auth.verifyAdmin, user.getAllUsers);
userRouter.put("/updateuser/:id", auth.verifyUser, user.updateUser);
userRouter.delete("/deleteuser/:id", auth.verifyUser, user.deleteUser);

module.exports = userRouter;
