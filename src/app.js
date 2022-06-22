const express = require("express");
const cors = require("cors");
require("dotenv").config();

const userRouter = require("./routes/user");
const listRouter = require("./routes/list");
const favRouter = require("./routes/fav");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/list", listRouter);
app.use("/list", favRouter);

module.exports = app;
