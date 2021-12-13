const stripeRoute = require("../controller/stripe");
const express = require("express");

const router = express.Router();

router.post("/checkout-session", stripeRoute.chekOut);

module.exports = router;
