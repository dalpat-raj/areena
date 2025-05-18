const ErrorHandler = require("../utils/ErrorHandler");
const path = require("path");
const Shop = require("../model/shopModel");
const sendMail = require("../utils/sendMail");
const jwt = require("jsonwebtoken");
const sendShopToken = require("../utils/jwtShopToken");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const fs = require("fs");

exports.shopCreate = async (req, res, next) => {
  try {
    const {
      name,
      shopName,
      email,
      phone,
      address,
      country,
      state,
      city,
      zipCode,
      password,
      avatar,
      description,
    } = req.body;
    
    const shopEmail = await Shop.findOne({ email });

    if (shopEmail) {
      return next(new ErrorHandler("Shop already exists", 400));
    }
    
    let fileUrl = "";

    if (req?.file?.filename) {
      const filename = req?.file?.filename;
      fileUrl = path.join(filename);
    }

    try {
      let shop = await Shop.create({
        name,
        shopName,
        email,
        phone,
        address,
        country,
        state, 
        city,
        zipCode,
        password,
        avatar,
        description,
      });

      res.status(201).json({
        shop: shop,
        success: true,
        message: `Please check your email`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// activation
exports.activationShop = catchAsyncErrors(async (req, res, next) => {
  
});

// Login Shop
exports.loginShop = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please Fill The Information", 500));
    }

    const shop = await Shop.findOne({ email }).select("+password");

    if (!shop) {
      return next(new ErrorHandler("User does not exists!", 400));
    }

    const isPasswordValid = await shop.comparePassword(password);
    if (!isPasswordValid) {
      return next(new ErrorHandler("Please Provide Correct Information", 400));
    }

    sendShopToken(shop, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Load shop
exports.loadShop = catchAsyncErrors(async (req, res, next) => {
  try {
    const shop = await Shop.findById(req.shop._id);
    if (!shop) {
      return next(new ErrorHandler("Shop Doesn't exists", 400));
    }
    res.status(201).json({
      success: true,
      shop,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Logout Shop
exports.logoutShop = catchAsyncErrors(async (req, res, next) => {
  try {
    res.cookie("sellerToken", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(201).json({
      success: true,
      message: "Logout Success",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.getShopInfo = catchAsyncErrors(async (req, res, next) => {
  try {
    const shop = await Shop.findById(req.params.id);
    res.status(201).json({
      success: true,
      shop,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// update shop avatar
exports.updateShopAvatar = catchAsyncErrors(async (req, res, next) => {
  try {
    const existsSeller = await Shop.findById(req.shop._id);
    // const existsAvatarPath = `../../uploads/${existsSeller.avatar}`;

    // if(existsAvatarPath){
    //   fs.unlinkSync(existsAvatarPath);
    // }

    const fileUrl = path.join(req.file.filename);

    const shop = await Shop.findByIdAndUpdate(req.shop._id, {
      avatar: fileUrl,
    });

    res.status(200).json({
      success: true,
      shop,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// update user
exports.updateShop = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, shopName, address, description, zipCode, password } = req.body;
    const shop = await Shop.findById(req.shop._id).select("+password");

    if (!shop) {
      return next(new ErrorHandler("Seller Doesn't exists", 404));
    }

    const isPasswordValid = await shop.comparePassword(password);
    if (!isPasswordValid) {
      return next(
        new ErrorHandler("Please provide the correct information", 400)
      );
    }

    shop.name = name;
    shop.shopName = shopName;
    shop.address = address;
    shop.description = description;
    shop.zipCode = zipCode;

    await shop.save();

    res.status(200).json({
      success: true,
      shop,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// admin get all seller
exports.getAllSellerForAdmin = catchAsyncErrors(async (req, res, next) => {
  try {
    const sellers = await Shop.find().sort({ createdAt: -1 });
    if (!sellers) {
      return next(new ErrorHandler("seller not found!", 404));
    }
    res.status(201).json({
      success: true,
      sellers,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// delete sellers by admin
exports.deleteSellersByAdmin = catchAsyncErrors(async (req, res, next) => {
  try {
    const sellers = await Shop.findByIdAndDelete(req.params.id);

    if (!sellers) {
      return next(new ErrorHandler("seller not found!", 404));
    }

    res.status(201).json({
      success: true,
      message: "Seller Delete Success",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// add seller withdraw methods
exports.addWithdrawMethods = catchAsyncErrors(async (req, res, next) => {
  try {
    const { withdrawMethods } = req.body;

    const shop = await Shop.findByIdAndUpdate(req.shop._id, {
      withdrawMethods,
    });

    res.status(201).json({
      success: true,
      shop,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.updatePinCode = catchAsyncErrors(async (req, res, next)=>{
  try {
    const shop = await Shop.findById(req.shop._id);
    shop.pinCode = [...shop.pinCode, req.body.pinCode]
    await shop.save();
    res.status(201).json({
      success: true,
      shop,
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})

// delete withdraw methods
exports.deleteWithdrawMethods = catchAsyncErrors(async (req, res, next) => {
  try {
    const shop = await Shop.findById(req.shop._id);
    if (!shop) {
      return next(new ErrorHandler("Seller Not Found", 404));
    }

    shop.withdrawMethods = null;
    await shop.save();

    res.status(201).json({
      success: true,
      shop,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});


// delete pinCode 
exports.deletePinCode = catchAsyncErrors(async (req, res, next) => {
  try {
    const shop = await Shop.findById(req.shop._id);
    if (!shop) {
      return next(new ErrorHandler("Seller Not Found", 404));
    }

    shop.pinCode = shop.pinCode.filter(item=>item != req.params.pin);
    
    await shop.save();

    res.status(201).json({
      success: true,
      shop,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.forgateShopPassword = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const shop = await Shop.findOne({ email: email }).select(
      "+password"
    );

    if (!shop) {
      return next(new ErrorHandler("Wrong Email Id", 404));
    }

    shop.password = password;
    await shop.save();

    res.status(201).json({
      success: true,
      message: "Password Change Successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})
