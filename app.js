const express = require("express");
// const config = require("./config");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const categoryRoute = require("./routes/categoryRoute");
const adminRoute = require("./routes/adminRoute");
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const stripeRoute = require("./routes/stripeRoute");

require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();
const cors = require("cors");
// const PORT = 3001;
// const DB_URI =
//   "mongodb+srv://user:64CNzQ1lWN5BLtiT@node.8jzbu.mongodb.net/e-commerce?retryWrites=true&w=majority";
// const DB_URI = "mongodb://localhost:27017/e-commerce";

// console.log("port env", PORT);
console.log(`NODE_ENV=${process.env.NODE_ENV}`);
console.log(`DB_URI=${process.env.DB_URI}`);

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(express.static("./public"));
app.use(cors());
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/category", categoryRoute);
// app.use("/admin", adminRoute);
app.use("/admin", adminRoute);
app.use("/stripe", stripeRoute);

app.listen(process.env.PORT || 3001);
app.use(express.static("./public"));
// app.listen(process.env.PORT, process.env.HOST, () => {
//   console.log(`APP LISTENING ON http://${process.env.HOST}:${process.env.PORT}`);
// });

// console.log("DB_URI envvvv", DB_URI);

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("db connected");
  })
  .catch((error) => console.log("db error", error));
