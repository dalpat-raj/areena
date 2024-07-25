const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const crypto = require("crypto")
const dotenv = require("dotenv");
const Razorpay = require("razorpay");
dotenv.config({path: "config/config.env"})

exports.OrderIdGenerating = catchAsyncErrors(async (req, res, next)=>{
  const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  })
  try {

    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    }

    razorpayInstance.orders.create(options, (err, order)=>{
      if(err){
        return res.status(500).json({message: "something went wrong!"})
      }
      res.status(200).json({
        data: order
      })
    })
    
  } catch (error) {
    res.status(500).json({error: "something went wrong!"})
  }
})

exports.PaymentProcess = catchAsyncErrors(async (req, res, next)=>{
  
  const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;
  try {
    
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(sign.toString()).digest("hex");
    const isAuthentic = expectedSign === razorpay_signature;

    if(isAuthentic){
      const paymmentData = await paymentDetails(razorpay_payment_id)
      res.status(200).json({message: "Paymment Success", paymmentData})
    }
  } catch (error) {
    res.status(500).json({error: "Something went wrong!"})
  }
})

// fatch payment 

const paymentDetails = async(id) => {
    var instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })
    const result = await instance.payments.fetch(id) 
    return result;
}