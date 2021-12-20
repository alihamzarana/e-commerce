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
      // amount: 2000,
      // currency: "usd",
      // source: "tok_1K6cSuLx8iksN6sApPDGYkUs",
      // description: "My First Test Charge (created for API docs)",
      amount: +req.body.amount,
      currency: req.body.currency,
      source: req.body.source,
      description: req.body.descrition,
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
    console.log(" body request of create token", req.body);
    const token = await stripe.tokens.create({
      card: {
        // number: "5555555555554444",
        // exp_month: 12,
        // exp_year: 2022,
        // cvc: "314",
        number: req.body.card.number,
        exp_month: +req.body.card.exp_month,
        exp_year: +req.body.card.exp_year,
        cvc: req.body.cvc,
      },
    });
    console.log("card properties are", token.card);
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
      email: req.body.email,
      phone: req.body.phone,
      // source: req.body.source,
      description: req.body.description,
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

const getAllCustomers = async (req, res) => {
  try {
    const customers = await stripe.customers.list({});
    if (customers) {
      res.status(200).json({
        status: "success",
        messsge: "customers found successfully",
        token: customers,
      });
    } else {
      res.status(500).json({
        status: "error",
        message: "customer not found",
      });
    }
  } catch (error) {
    throw error;
  }
};

const findSingleCustomer = async (req, res) => {
  try {
    console.log("parameter id", req.params);
    // const id= req.params
    const customer = await stripe.customers.retrieve( req.params.id);
    if (customer) {
      res.status(200).json({
        status: "success",
        messsge: "customer found successfully",
        token: customer,
      });
    } else {
      res.status(500).json({
        status: "error",
        message: "customer not found",
      });
    }
  } catch (error) {
    throw error;
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await stripe.products.create({
      name: req.body.name,
      description: req.body.description,
    });

    if (product) {
      res.json({
        status: "success",
        messsage: product,
      });
    } else {
      res.json({
        status: "error",
        message: "product not created",
      });
    }
  } catch (error) {
    throw error;
  }
};

const createPrice = async (req, res) => {
  console.log("body request of price", req.body);
  try {
    const price = await stripe.prices.create({
      unit_amount: +req.body.unit_amount,
      currency: req.body.currency,
      recurring: {
        interval: req.body.recurring.interval,
        interval_count: +req.body.recurring.interval_count,
      },
      product: req.body.product,
    });

    console.log("the price of product ", price);

    if (price) {
      res.json({
        status: "success",
        data: price,
      });
    } else {
      res.json({
        status: "error",
      });
    }
  } catch (error) {
    console.log("errors", error);
  }
};
const getAllProducts = async (req, res) => {
  try {
    const products = await stripe.products.list({});
    console.log("all stripe products are", products);
    if (products) {
      res.json({
        status: "success",
        data: products,
      });
    } else {
      res.json({
        status: "error",
      });
    }
  } catch (error) {
    throw error;
  }
};

const createSubscription = async (req, res) => {
  try {
    const suscription = await stripe.subscriptions.create({
      customer: req.body.customer,
      items: [{ price: req.body.items.price }],
    });
    console.log("all stripe products are", suscription);
    if (suscription) {
      res.json({
        status: "success",
        data: suscription,
      });
    } else {
      res.json({
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
  findSingleCustomer,
  createProduct,
  createPrice,
  getAllProducts,
  getAllCustomers,
  createSubscription,
};
