const stripeRoute = require("../controller/stripeController");
const express = require("express");

const router = express.Router();

router.get("/retrieve-customer", stripeRoute.retrieveCustomer);
router.post("/checkout-session", stripeRoute.checkOutToken);
router.post("/create-token", stripeRoute.createToken);
router.post("/create-charge", stripeRoute.chargeCustomerThroughToken);
router.post("/create-customer", stripeRoute.createCustomer);
router.post("/create-product", stripeRoute.createProduct);
router.post("/create-price", stripeRoute.createPrice);



module.exports = router;
