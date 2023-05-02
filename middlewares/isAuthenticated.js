const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    return res.status(404).json({
      success: false,
      message: "Login first",
    });

  const id = await jwt.verify(token, process.env.JWT_SECRET)._id;

  req.user = await User.findById(id);

  next();
};

module.exports = isAuthenticated;
