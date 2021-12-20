const stripeRoute = require("../controller/stripeController");
const express = require("express");

const router = express.Router();

router.get("/customers", stripeRoute.getAllCustomers);

router.get("/retrieve-products", stripeRoute.getAllProducts);

router.post("/checkout-session", stripeRoute.checkOutToken);
router.post("/create-token", stripeRoute.createToken);
router.post("/create-charge", stripeRoute.chargeCustomerThroughToken);
router.post("/create-customer", stripeRoute.createCustomer);
router.post("/create-product", stripeRoute.createProduct);
router.post("/create-price", stripeRoute.createPrice);
router.post("/create-subscription", stripeRoute.createSubscription);

router.get("/customer/:id", stripeRoute.findSingleCustomer);
module.exports = router;
