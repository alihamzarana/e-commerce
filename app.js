const express = require("express");

const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
require("dotenv").config();

const app = express();
const cors = require("cors");
// const PORT = 3001;
// const DB_URI =
//   "mongodb+srv://user:64CNzQ1lWN5BLtiT@node.8jzbu.mongodb.net/e-commerce?retryWrites=true&w=majority";

// console.log("port env", PORT);

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(express.static("./public"));
app.use(cors());
app.use("/user", userRoute);

app.listen(process.env.PORT || 3001);
// console.log("DB_URI envvvv", DB_URI);

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("db connected");
  })
  .catch((error) => console.log("db error", error));
