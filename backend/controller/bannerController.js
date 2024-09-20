const ExploreBanner = require("../model/exploreBanner")
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const path = require("path");

exports.createExploreTopBanner = catchAsyncErrors(async (req, res, next) => {
  try {
    
    const { heading, category } = req.body;
    let fileUrl = "";

    if (req?.file?.filename) {
      const filename = req?.file?.filename;
      fileUrl = path.join(filename);
    }

    await ExploreBanner.create({
      heading: heading,
      category: category,
      banner: fileUrl,
    });

    const exploreBanner = await ExploreBanner.find();
    if(!exploreBanner){
      return next(new ErrorHandler("banner not found !", 404))
    }
    
    res.status(201).json({
      success: true,
      banner: exploreBanner,
    })
    
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});


// get explore top banner
exports.getExploreTopBanner = catchAsyncErrors (async (req, res, next) => {
  try {
    const exploreBanner = await ExploreBanner.find();
    
    if(!exploreBanner){
      return next(new ErrorHandler("Banner not Found !", 404))
    }

    res.status(201).json({
      success: true,
      banner: exploreBanner,
    })
    
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}) 


// delete explore top banner
exports.deleteExploreTopBanner = catchAsyncErrors (async (req, res, next) => {
  try {
    
    const isDelete = await ExploreBanner.findByIdAndDelete(req.params.id);
    const exploreBanner = await ExploreBanner.find();
    
    if(!isDelete){
      return next(new ErrorHandler("Banner not Deleted !", 404))
    }
    if(!exploreBanner){
      return next(new ErrorHandler("Banner not found !", 404))
    }


    res.status(201).json({
      success: true,
      message: "banner Deleted !",
      banner: exploreBanner,
    })
    
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}) 