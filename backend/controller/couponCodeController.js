const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler")
const CouponCode = require("../model/couponCodeModel")


// Create Coupon Code
exports.createCouponCode = catchAsyncErrors(async(req, res, next)=>{
  
    try {
        const isCouponCodeExists = await CouponCode.find({
          name: req.body.name,
        });
  
        if (isCouponCodeExists.length !== 0) {
          return next(new ErrorHandler("Coupon code already exists!", 400));
        }
  
        const couponCode = await CouponCode.create(req.body);
  
        res.status(201).json({
          success: true,
          message: "successfully created",
          couponCode,
        });
      } catch (error) {
        return next(new ErrorHandler(error, 400));
      }
})

// Get Coupon
exports.getCoupon = catchAsyncErrors(async(req, res, next)=>{
  try {
    const couponCodes = await CouponCode.find({shopId:req.params.id})
    res.status(201).json({
      success: true,
      couponCodes
    })
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
})

// delete coupon for shop 
exports.deleteCoupon = catchAsyncErrors(async (req, res, next)=> {
  try {
    const couponCode = await CouponCode.findByIdAndDelete(req.params.id);

    if(!couponCode){
      return next(new ErrorHandler("Coupon code doesn't exists!", 400))
    }
    res.status(201).json({
      success: true,
      message: "Coupon code deleted successfully!",
    })
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
})


// user
// get coupon code value by name
exports.getCouponCode = catchAsyncErrors(async (req, res, next)=>{
  try {
    const couponCode = await CouponCode.findOne({name: req.params.name});
    if(!couponCode){
      return next(new ErrorHandler("coupon invalid!"));
    }
    res.status(201).json({
      success: true,
      couponCode
    })
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
})