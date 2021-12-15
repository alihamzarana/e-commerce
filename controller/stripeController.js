const stripe = require("stripe")(
  "sk_test_51K6CgtLx8iksN6sA4uaITJEqtNnccg0jExZBlGl4S84Se9Zlx1JcUaw6GUFTjQGsUbylFxEudTKXYthnEb9MElrL00Qd4ubsrL"
);

const checkOutToken = async (req, res) => {
  try {
    console.log("req.body", req.body);
    console.log("stripe api key", process.env.STRIPE_SECRET_KEY);

    // const session = await stripe.checkout.sessions.create({
    //   success_url:
    //     "https://ecommerceburraq.herokuapp.com/product/success?id={CHECKOUT_SESSION_ID}",
    //   cancel_url: "https://ecommerceburraq.herokuapp.com/category",
    //   payment_method_types: ["card"],
    //   line_items: [
    //     {
    //       price: req.body.price,
    //       quantity: req.body.quantity,
    //     },
    //   ],
    // });

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "T-shirt",
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://example.com/success",
      cancel_url: "https://example.com/cancel",
    });
    console.log("session is", session);

    if (session) {
      res.status(200).json({
        status: "success",
        token: session,
      });
    } else {
      res.status(500).json({
        status: "error",
      });
    }
  } catch (error) {
    throw error;
  }
};
const chargeCustomerThroughToken = async (req, res) => {
  try {
    const charge = await stripe.charges.create({
      amount: 2000,
      currency: "usd",
      source: "tok_1K6cSuLx8iksN6sApPDGYkUs",
      description: "My First Test Charge (created for API docs)",
    });
    console.log("charges are", charge);
    if (charge) {
      res.status(200).json({
        status: "success",
        token: charge,
      });
    } else {
      res.status(500).json({
        status: "error",
      });
    }
  } catch (error) {
    throw error;
  }
};

const createToken = async (req, res) => {
  try {
    const token = await stripe.tokens.create({
      card: {
        number: "4242424242424242",
        exp_month: 12,
        exp_year: 2022,
        cvc: "314",
      },
    });
    console.log("token is", token);
    if (token) {
      res.status(200).json({
        status: "success",
        token: token,
      });
    } else {
      res.status(500).json({
        status: "error",
      });
    }
  } catch (error) {
    throw error;
  }
};

const createCustomer = async (req, res) => {
  try {
    const customer = await stripe.customers.create({
      email: "testing@gmail.com",
      // name: "testing user",
      phone: "123 456 789",
      // address: "Lahore, Pakistan",
      source: "tok_1K6dq2Lx8iksN6sA7PJJioXG",
      description: "My First Test Customer (created for API docs)",
    });
    if (customer) {
      res.status(200).json({
        status: "success",
        token: customer,
      });
    } else {
      res.status(500).json({
        status: "error",
      });
    }
  } catch (error) {
    throw error;
  }
};

const retrieveCustomer = async (req, res) => {
  try {
    const customer = await stripe.customers.retrieve("cus_KmB93d4Z74OTiI");
    if (customer) {
      res.status(200).json({
        status: "success",
        token: customer,
      });
    } else {
      res.status(500).json({
        status: "error",
      });
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  checkOutToken,
  createToken,
  chargeCustomerThroughToken,
  createCustomer,
  retrieveCustomer,
};
