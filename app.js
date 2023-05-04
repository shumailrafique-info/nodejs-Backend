const express = require("express");
const userRouter = require("./routes/user.js");
const taskRouter = require("./routes/task.js");
const { config } = require("dotenv");
const cookieParser = require("cookie-parser");
const { errorMiddleware } = require("./middlewares/error.js");
const cors = require("cors");
const path = require("path");

const app = express();

config({
  path: "./data/config.env",
});

//Using Middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

// app.use(cors());
// app.use(
//   cors({
//     origin: [process.env.FRONTEND_URL],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

app.use(express.static(path.join(__dirname, "./dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./dist/index.html"));
});

app.get("/", (req, res) => {
  res.send("Welcome to Shumail Todo App");
});

//Error MiddleWare
app.use(errorMiddleware);

module.exports = app;
