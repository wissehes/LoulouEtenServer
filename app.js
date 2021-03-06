const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const db = require("./database");

const indexRouter = require("./routes/index");
const hasFood = require("./routes/hasFood");
const giveFood = require("./routes/giveFood");
const undoFeeding = require("./routes/undoFeeding");
const deleteHistory = require("./routes/deleteHistory");
const feedingHistory = require("./routes/feedingHistory");

const googleAuth = require("./routes/authentication");
const passport = require("./Structures/Passport");

const checkApiKey = require("./Middleware/checkApiKey");

const app = express();

db.connect();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

if (process.env.PRODUCTION) {
  app.set("trust proxy", true);
}

app.use(checkApiKey);
app.use(passport.initialize());

app.use("/", indexRouter);
app.use("/loulou/hasFood", hasFood);
app.use("/loulou/giveFood", giveFood);
app.use("/loulou/undoFeeding", undoFeeding);
app.use("/loulou/removeItem", deleteHistory);
app.use("/loulou/history", feedingHistory);
app.use("/auth", googleAuth);

module.exports = app;
