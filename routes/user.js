const express = require("express");
const {
  getMyProfile,
  register,
  login,
  logout,
} = require("../controllers/user.js");
const isAuthenticated = require("../middlewares/isAuthenticated.js");

const router = express.Router();


router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/me", isAuthenticated, getMyProfile);

module.exports = router;
