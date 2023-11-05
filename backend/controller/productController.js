const Product = require("../model/productModel");
const Shop = require("../model/shopModel");
const Order = require("../model/order");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const fs = require("fs");

// Get All Product
exports.getSearchProducts = catchAsyncErrors(async (req, res, next) => {
  try {
    // seraching
      const keyword = req.query.searchKeyword
      ? {
          name: {
            $regex: req.query.searchKeyword,
            $options: "i",
          },
        }
      : {};

      const product = await Product.find({ ...keyword })

          
    res.status(201).json({
      success: true,
      product
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});


// Get All Product
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  try {
    // Filtering
    let queryObj = { ...req.query };
    queryObj.category ? queryObj.category = queryObj?.category?.split("-").join("&") : null;
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    
    let query = Product.find(JSON.parse(queryStr));



    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // limiting the fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    } 

    // pagination
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    const productsCount = await Product.countDocuments();
    // if (req.query.page) {
    //   if (skip >= productCount) throw new Error("This Page does not exists");
    // }
  
    if(req.query.color){
      query._conditions = {"color.name": req.query.color}
    }

    
    let product = await query;

    res.status(201).json({
      success: true, product, productsCount
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// get product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// SELLER
// Create Product
exports.createProductShop = catchAsyncErrors(async (req, res, next) => {
  try {
    req.body.details = JSON.parse(req.body.details)
    req.body.color = JSON.parse(req.body.color)
    req.body.size = JSON.parse(req.body.size)
    
    const shopId = req.body.shopId;
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return next(new ErrorHandler("Seller account is invalid", 404));
    } else {
      const files = req.files;
      const imageUrls = files.map((file) => `${file.filename}`);
      const productData = req.body;
      productData.images = imageUrls;
      productData.shop = shop;

      const product = await Product.create(productData);

      res.status(201).json({
        success: true,
        message: "Product created!",
        product,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Get all products for seller
exports.getAllProductShop = catchAsyncErrors(async (req, res, next) => {
  try {
    const products = await Product.find({ shopId: req.params.id });
    res.status(201).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// delete shop product
exports.deleteShopProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const productId = req.params.id;
    const productdata = await Product.findById(productId);

    productdata.images.forEach((imageUrl) => {
      const filename = imageUrl;
      const filePath = `uploads/${filename}`;

      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    });

    const product = await Product.deleteOne({ _id: productId });
    if (!product) {
      return next(new ErrorHandler("Product not found", 400));
    }
    res.status(201).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// review for products by user
exports.createNewReview = catchAsyncErrors(async (req, res, next) => {
  try {
    const { user, rating, comment, productId, orderId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return next(new ErrorHandler("product not found", 404));
    }

    const review = {
      user,
      rating,
      comment,
      productId,
    };

    isReviewed = product.reviews.find((rev) => rev.user._id === req.user._id);

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user._id === req.user._id) {
          (rev.rating = rating), (rev.comment = comment), (rev.user = user);
        }
      });
    } else {
      product.reviews.push(review);
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    await Order.findByIdAndUpdate(
      orderId,
      { $set: { "cart.$[elem].isReviewed": true } },
      { arrayFilters: [{ "elem._id": productId }], new: true }
    );

    res.status(200).json({
      success: true,
      message: "Review Success",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// delete product by admin
exports.deleteProductByAdmin = catchAsyncErrors(async (req, res, next) => {
  try {
    const productId = req.params.id;
    const productdata = await Product.findById(productId);

    productdata.images.forEach((imageUrl) => {
      const filename = imageUrl;
      const filePath = `uploads/${filename}`;

      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    });

    const product = await Product.deleteOne({ _id: productId });
    if (!product) {
      return next(new ErrorHandler("Product not found", 400));
    }
    res.status(201).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Get same products
exports.getSameProducts = catchAsyncErrors(async (req, res, next) => {
  try {
    const products = await Product.find({ name: req.params.name });

    res.status(201).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
