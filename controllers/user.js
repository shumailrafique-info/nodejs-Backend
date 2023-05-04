const { User } = require("../models/user.js");
const bcrypt = require("bcrypt");
const sendCookie = require("../utils/sendCookie.js");
const { ErrorHandler } = require("../middlewares/error.js");

//Login User
const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("Invalid email or password", 400));

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched)
    return next(new ErrorHandler("Invalid email or password", 400));

  sendCookie(user, res, `Welcome back ${user.name}`, 200);
};

//Register User to DataBase
const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  //finding user in Database
  let user = await User.findOne({ email });

  if (user) return next(new ErrorHandler("User Already Exist", 404));

  //Hassing password for security
  const hashedPassword = bcrypt.hashSync(password, 10);

  //Craeting User in Database
  user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  sendCookie(user, res, "Registered SuccessFully", 201);
};

//Get User profile Using authentication Token
const getMyProfile = async (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

//Destroy token and logout
const logout = async (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message: "Logout Successfull",
    });
};

module.exports = { login, register, getMyProfile, logout };
