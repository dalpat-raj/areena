const Color = require("../model/colorModel")
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.getAllColor = catchAsyncErrors(async (req, res, next) => {
  try {
    const color = await Color.find();

    res.status(201).json({
        success: true,
        color
    })
    
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

