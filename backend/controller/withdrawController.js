const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const Withdraw = require("../model/withdrawModel");
const sendMail = require("../utils/sendMail")
const Shop = require("../model/shopModel")

// create withdraw request  ------ seller --------
exports.createWithdrawRequest = catchAsyncErrors(async (req, res, next) => {
  try {
    const { amount } = req.body;
    const data = {
      seller: req.shop,
      amount,
    };

    try {
      await sendMail({
        email: req.shop.email,
        subject: "Withdraw Request",
        message: `Hello ${req.shop.name}, We have received your request of Rs ${amount}. Please wait, it will take 3 to 5 days for us to send your money to your account!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }

    const withdraw = await Withdraw.create(data);

    const shop = await Shop.findById(req.shop._id);

    shop.availableBalance = shop.availableBalance - amount;

    await shop.save();

    res.status(201).json({
      success: true,
      withdraw,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});


exports.getAllWithdrawRequest = catchAsyncErrors(async (req, res, next)=>{
  try {
    const withdraws = await Withdraw.find().sort({createdAt: -1});

    if(!withdraws){
      return next(new ErrorHandler("Data not found!", 404));
    }

    res.status(201).json({
      success: true,
      withdraws
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})

// update withdraw request 
exports.updateWithdrawRequest = catchAsyncErrors(async (req, res, next)=>{
  try {
    const {shopId} = req.body;
    
    const withdraw = await Withdraw.findByIdAndUpdate(req.params.id, {
      status: "Succeed", updatedAt: Date.now()
    }, {new: true});

    const shop = await Shop.findById(shopId)

    const transection = {
      _id : withdraw._id,
      amount: withdraw.amount,
      updatedAt: withdraw.updatedAt,
      status: withdraw.status,
    }

    shop.transections = [...shop.transections, transection];

    await shop.save();

    try {
      await sendMail({
        email: shop.email,
        subject: "Payment Confirmation",
        message: `Hello ${shop.name}, Your withdraw request of Rs ${withdraw.amount} is on the way. Delivery time depends on your bank's rules is usually takes 3 to 5 Day's`
      })
      res.status(201).json({
        success: true,
        withdraw
      })
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
    
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})