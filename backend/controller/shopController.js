const ErrorHandler = require("../utils/ErrorHandler");
const path = require("path");
const Shop = require("../model/shopModel");
const sendMail = require("../utils/sendMail");
const jwt = require("jsonwebtoken");
const sendShopToken = require("../utils/jwtShopToken");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const fs = require("fs");
const Product = require("../model/productModel");

exports.shopCreate = async (req, res, next) => {
  try {
    const {
      name,
      shopName,
      email,
      phone,
      address,
      zipCode,
      password,
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

    const shop = {
      name: name,
      shopName: shopName,
      email: email,
      phone: phone,
      address: address,
      zipCode: zipCode,
      password: password,
      avatar: fileUrl,
      description: description,
    };

    const activationToken = createActivationToken(shop);
    const activationUrl = `http://localhost:3000/shop-activation/${activationToken}`;
    // const activationUrl = `https://areenaa.in/shop-activation/${activationToken}`;

    try {
      await sendMail({
        email: shop.email,
        subject: "Activate your Shop Account",
        message: `Hello ${shop.name}, Please click on the link to activate your Shop account: ${activationUrl} This link valid for 5 minutes`,
      });
      res.status(201).json({
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

// create activation token
const createActivationToken = (shop) => {
  return jwt.sign(shop, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// activation
exports.activationShop = catchAsyncErrors(async (req, res, next) => {
  try {
    const { activation_token } = req.body;
    const newShop = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

    if (!newShop) {
      return next(new ErrorHandler("Invalid token", 400));
    }

    const {
      name,
      shopName,
      email,
      phone,
      address,
      zipCode,
      password,
      avatar,
      description,
    } = newShop;
    let shop = await Shop.findOne({ email });
    if (shop) {
      return next(new ErrorHandler("User already exists!", 400));
    }
    shop = await Shop.create({
      name,
      shopName,
      email,
      phone,
      address,
      zipCode,
      password,
      avatar,
      description,
    });
    sendShopToken(shop, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
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
  const pinCodeToAdd = req.body.pinCode;

  try {
    const products = await Product.find({ shopId: req.shop._id });
    const shop = await Shop.findById(req.shop._id)

    if (!shop && !products) {
      return next(new ErrorHandler("Seller Not Found", 404));
    }
    
    shop.pinCode = [...shop.pinCode, req.body.pinCode]
    const updatePromises = products.map(async (product) => {
        const newPinCodes = [...product.shop.pinCode, pinCodeToAdd];
        await Product.updateOne({ _id: product._id }, { $set: { 'shop.pinCode': newPinCodes } });
    });

    await shop.save();
    await Promise.all(updatePromises);

    res.status(201).json({
      success: true,
      shop
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})

// delete pinCode 
exports.deletePinCode = catchAsyncErrors(async (req, res, next) => {
  try {
    const shop = await Shop.findById(req.shop._id);
    const products = await Product.find({ shopId: req.shop._id });

    if (!shop && !products) {
      return next(new ErrorHandler("Seller Not Found", 404));
    }

    const addPinCode = shop.pinCode.filter(item=>item != req.params.pin);
    
    shop.pinCode = addPinCode;
    const updatePromises = products.map(async (product) => {
      await Product.updateOne({ _id: product._id }, { $set: { 'shop.pinCode': addPinCode } });
    });

    await shop.save();
    await Promise.all(updatePromises);

    res.status(201).json({
      success: true,
      shop,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

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


