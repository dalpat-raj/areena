const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const sendUserToken = require("../utils/jwtUserToken");
const Razorpay = require("razorpay");

const dotenv = require("dotenv");

dotenv.config({path: "backend/config/config.env"})

const crypto = require('crypto');
const User = require("../model/user");
const Order = require("../model/order");
const { default: mongoose } = require("mongoose");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID_TEST,
  key_secret: process.env.RAZORPAY_SECRET_TEST,
});

exports.createRazorpayOrder = catchAsyncErrors( async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt } = req.body;

    if (!amount || !receipt) {
      return res.status(400).json({
        success: false,
        message: 'Amount and receipt are required',
      });
    }

    const options = {
      amount: Math.round(amount), 
      currency,
      receipt,
      payment_capture: 1,
    };

    // Create order
    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      order,
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message,
    });
  }
})


// controllers/paymentController.js
exports.verifyRazorpayPayment = catchAsyncErrors(async (req, res) => {
  try {
    const {
      orderData: {
        userId,
        buyer,
        vendors,
        totalAmount,
        shippingPrice,
        discountPrice,
        paymentMethod,
      },
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature
    } = req.body;
 
    
   const subOrders = vendors.map((vendor) => ({
      shopId: vendor.vendorId,
      // items: vendor.items,
      items: vendor?.items?.map(item => ({
        ...item,
        productId: item?._id,
      })),
      shipping: {
        address: {
          name: buyer?.name,
          phone: buyer?.phoneNumber,
          address1: buyer?.address1,
          address2: buyer?.address2,
          city: buyer?.city,
          state: buyer?.state,
          country: buyer?.country,
          pincode: buyer?.pincode,
        },
        etd: vendor?.etd,
      },
      payment: {
        subTotal: vendor.subTotal,
        total: vendor.totalPrice,
        shippingCharge: vendor.shippingCharge,
        discount: discountPrice,
        status: 'paid',
      },
      totalQuantity: vendor?.items?.length || 0,
      status: "processing",
      createdAt: Date.now()
    }));

    // Step 2: Create the main order
    const mainOrder = new Order({
      userId,
      orderId: razorpay_order_id,
      subOrders, 
      payment: {
        status: 'paid',
        method: paymentMethod,
        transactionId: razorpay_payment_id,
        orderId: razorpay_order_id,
        signature: razorpay_signature,
        amount: totalAmount,
        shippingPrice: shippingPrice,
        paidAt: new Date()
      },
      buyerDetails: {
        name: buyer?.name,
        phone: buyer?.phoneNumber,
        address1: buyer?.address1,
        address2: buyer?.address2,
        city: buyer?.city,
        state: buyer?.state,
        country: buyer?.country,
        pincode: buyer?.pincode,
      },
      totals: {
        grandTotal: totalAmount,
        discount: discountPrice,
        shippingPrice: shippingPrice
      },
      status: 'processing',
      createdAt: Date.now()
    });

    await mainOrder.save();

    return res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      // order: mainOrder
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Order creation failed!',
    });
  }
});

