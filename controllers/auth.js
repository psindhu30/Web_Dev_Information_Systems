const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(404).send("Username not found");
    const comparePass = await bcrypt.compare(req.body.password, user.password);
    if (!comparePass) return res.status(400).send("Incorrect credentials");

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );
    const { password, ...otherDetails } = user._doc;
    res.send({ ...otherDetails, token });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    console.log(req.body);

    const user = User({
      ...req.body,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  login,
  register,
};
