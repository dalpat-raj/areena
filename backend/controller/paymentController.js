const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");

const dotenv = require("dotenv");

dotenv.config({path: "backend/config/config.env"})


const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.paymentProcess = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Becodemy",
    },
  });
  res.status(200).json({
    success: true,
    client_secret: myPayment.client_secret,
  });
});

exports.paymentApiKey = catchAsyncErrors(async (req, res, next) => {
    res.status(201).json({
      stripeApiKey: process.env.STRIPE_API_KEY,
    });
});
