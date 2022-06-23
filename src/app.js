const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

require("dotenv").config();

const userRouter = require("./routes/user");
const listRouter = require("./routes/list");
const favRouter = require("./routes/fav");
const swaggerDocument = require("./swagger");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/list", listRouter);
app.use("/list", favRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
