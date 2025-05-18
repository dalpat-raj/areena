const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
// const Razorpay = require("razorpay");

const dotenv = require("dotenv");

dotenv.config({path: "backend/config/config.env"})


// const instance = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_SECRET,
// });

// app.post("/api/payment/razorpay", async (req, res) => {
//   const options = {
//     amount: req.body.amount,
//     currency: "INR",
//     receipt: "receipt#1",
//   };

//   try {
//     const order = await instance.orders.create(options);
//     res.status(200).json(order);
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// });