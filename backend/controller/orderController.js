const Order = require("../model/order");
const Product = require("../model/productModel");
const Shop = require("../model/shopModel")
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.createOrder = catchAsyncErrors(async (req, res, next) => {
  try {
    const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

    const shopItems = new Map();
    for (const item of cart) {
      const shopId = item.shopId;
      if (!shopItems.has(shopId)) {
        shopItems.set(shopId, []);
      }
      shopItems.get(shopId).push(item);
    }

    // create order for each shop
    const orders = [];

    for (const [shopId, items] of shopItems) {
      const order = await Order.create({
        cart: items,
        shippingAddress,
        user,
        totalPrice,
        paymentInfo,
      });
      orders.push(order);
    }

    res.status(201).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// get all orders of users
exports.getAllOrdersUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const orders = await Order.find({ "user._id": req.params.userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// get selected order of users
exports.getSelectedOrderUser = catchAsyncErrors(async (req, res, next) => {  
  try {
    const order = await Order.findById(req.params.orderId)

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// give a refund of users
exports.orderRefund = catchAsyncErrors(async (req, res, next)=>{
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return next(new ErrorHandler("Order not found!", 400));
    }

    order.status = req.body.status;

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: "Refund Request Success",
      order,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})

// get all order of shop
exports.getAllOrdersSeller = catchAsyncErrors(async (req, res, next) => {
  try {
    const orders = await Order.find({ "cart.shopId": req.params.shopId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// get selected order of shop
exports.getSelectedOrderShop = catchAsyncErrors(async (req, res, next) => {  
  try {
    const order = await Order.findById(req.params.orderId)

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// update order status for shop
exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return next(new ErrorHandler("Order not found!", 400));
    }
    if (req.body.status === "Transferred to delivery partner") {
      order.cart.forEach(async (o) => {
        await updateOrder(o._id, o.qty);
      });
    }

    order.status = req.body.status;

    if (req.body.status === "Delivered") {
      order.deliverAt = Date.now();
      order.paymentInfo = "Succeeded";
      const serviceCharge = order.totalPrice * .10;
      await updateSellerInfo(order.totalPrice - serviceCharge);
    }

    await order.save({ validateBeforeSave: false });

    
    res.status(200).json({
      success: true,
      message: "Status Updated!",
      order,
    });

    async function updateOrder(id, qty) {
      const product = await Product.findById(id);

      product.stock -= qty;
      product.sold_out += qty;

      await product.save({ validateBeforeSave: false });
    }

    async function updateSellerInfo(amount){
      const shop = await Shop.findById(req.shop._id);
      shop.availableBalance = amount;
      await shop.save();
    }

  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// accept the refund for shop
exports.updateRefundOrderStatus = catchAsyncErrors(async (req, res, next)=>{
  try {
    const order = await Order.findById(req.params.id);
    if(!order){
      return next (new ErrorHandler("Order not found!", 404));
    }
    
    order.status = req.body.status;

    await order.save();

    res.status(201).json({
      success: true,
      message: "Refund Successfull!",
      order
    })

    if (req.body.status === "Refund Success") {
      order.cart.forEach(async (o) => {
        await updateOrder(o._id, o.qty);
      });
    }

    async function updateOrder(id, qty) {
      const product = await Product.findById(id);
      product.stock + qty;
      product.sold_out - qty;
      await product.save({ validateBeforeSave: false });
    }

  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})

// get all orders for --------- Admin -------
exports.getAllOrdersAdmin = catchAsyncErrors(async (req, res, next)=>{
  try {
    const orders = await Order.find().sort({deliverAt: -1});
    if(!orders){
      return next(new ErrorHandler("Orders not found!",404))
    }
    res.status(201).json({
      success: true,
      orders
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})