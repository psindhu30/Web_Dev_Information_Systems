const express = require("express");
const auth = require("../controllers/auth");

const authRouter = express.Router();

authRouter.post("/login", auth.login);
authRouter.post("/register", auth.register);

module.exports = authRouter;
