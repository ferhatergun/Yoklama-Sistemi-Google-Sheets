const express = require("express");
const {
  userAttendance,
  getUserCheck,
} = require("../controller/userController");

const userRouter = express.Router();

userRouter.post("/attendance", userAttendance); // http://localhost:5000/user/attendance  - Yoklama işlemini yapan endpoint
userRouter.get("/getUserCheck", getUserCheck); // http://localhost:5000/user/getUserCheck?name=ahmet - Kullanıcı isim kontrolü yapan endpoint

module.exports = userRouter;
