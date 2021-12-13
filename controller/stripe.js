const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const chekOut = async (req, res) => {
  try {
    console.log("req.body", req.body);
    console.log("stripe api key", process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      success_url:
        "https://ecommerceburraq.herokuapp.com/product/success?id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://ecommerceburraq.herokuapp.com/category",
      payment_method_types: ["card"],
      line_items: [
        {
          price: req.body.price,
          quantity: req.body.quantity,
        },
      ],
    });

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

module.exports = { chekOut };
