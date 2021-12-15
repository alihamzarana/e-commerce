const stripeRoute = require("../controller/stripeController");
const express = require("express");

const router = express.Router();

router.get("/retrieve-customer", stripeRoute.retrieveCustomer);
router.post("/checkout-session", stripeRoute.checkOutToken);
router.post("/create-token", stripeRoute.createToken);
router.post("/create-charge", stripeRoute.chargeCustomerThroughToken);
router.post("/create-customer", stripeRoute.createCustomer);

module.exports = router;
