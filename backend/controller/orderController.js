const Order = require("../model/order");
const Product = require("../model/productModel");
const Shop = require("../model/shopModel")
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { default: mongoose } = require("mongoose");
const { default: axios } = require("axios");
const loginToShiprocket = require("../services/shiprocket");



exports.createOrder = catchAsyncErrors(async (req, res, next) => {
  try {
    const { cart, shippingAddress, user, shippingPrice, discountPrice, paymentInfo } = req.body;

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
        shippingPrice,
        discountPrice,
        subTotalPrice: items?.reduce((acc, item) => acc + item?.qty * item?.sellingPrice, 0) - discountPrice,
        totalPrice: items?.reduce((acc, item) => acc + item?.qty * item?.sellingPrice, 0) + shippingPrice - discountPrice,
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
    const shopId = req.params.shopId;

    // Validate shopId
    if (!mongoose.Types.ObjectId.isValid(shopId)) {
      return next(new ErrorHandler("Invalid shop ID", 400));
    }

    // Find all orders where any subOrder has shopId == current vendor's shopId
    const sellerOrders = await Order.find({
      "subOrders.shopId": shopId
    }).sort({ createdAt: -1 });
    

    // Optional: filter only the matching subOrders for this vendor
    const filteredOrders = sellerOrders.map(order => {
      const subOrder = order.subOrders.find(sub => sub.shopId.toString() === shopId);
      return {
        orderId: order?.orderId,
        subOrderId: subOrder?._id,
        payment: order.payment,
        buyerDetails: order.buyerDetails,
        status: subOrder?.status,
        items: subOrder?.items,
        shipping: subOrder?.shipping,
        totals: subOrder?.payment,
        createdAt: order?.createdAt,
        updatedAt: subOrder?.updatedAt,
        expectedDelivery: subOrder?.expectedDelivery,
        actualDelivery: subOrder?.actualDelivery,
      };
    });

    res.status(200).json({
      success: true,
      orders: filteredOrders
    });

  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// get selected order of shop
exports.getSelectedOrderShop = catchAsyncErrors(async (req, res, next) => {
  try {
    const { orderId, shopId } = req.params;

    // Validate IDs
    if (!orderId || !shopId) {
      return next(new ErrorHandler("Invalid order ID or shop ID", 400));
    }

    // Find the order
    const order = await Order.findOne({orderId});
    
    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }

    // Find subOrder for this vendor
    const subOrder = order.subOrders.find(
      (sub) => sub.shopId.toString() === shopId
    );

    if (!subOrder) {
      return next(new ErrorHandler("SubOrder not found for this vendor", 404));
    }
    // subOrder.orderId = orderId;
    const vendorSubOrder = {
      ...subOrder.toObject(),   // Important: convert Mongoose subdoc to plain object
      orderId: orderId
    };
    
    // Return only vendor's part
    return res.status(200).json({
      success: true,
      order: vendorSubOrder
    });

  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});


// update order status for shop
exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
  const {subOrderId, orderId} = req.params;
  const {status} = req.body;
  
  try {
    const order = await Order.findOne({orderId: orderId});
    if (!order) {
      return next(new ErrorHandler("Order not found!", 400));
    }

    const subOrder = order.subOrders.id(subOrderId);
    if (!subOrder) {
      return next(new ErrorHandler("SubOrder not found!", 404));
    }

    // Step 3: Update status
    // subOrder.status = status;

    // Optional: Add a status history log
    // subOrder.statusHistory = subOrder?.statusHistory || [];
    // subOrder.statusHistory?.push({
    //   status,
    //   updatedAt: new Date()
    // });
    const token = await loginToShiprocket();
    

    if (status === "confirm") {
      const productUpdateOperations = subOrder.items.map(async (item) => {
        return {
          updateOne: {
            filter: { _id: item.productId },
            update: {
              $inc: {
                stock: -item.qty,
                sold: item.qty
              }
            }
          }
        };
      });

      // ✅ Run all update operations in bulk
      const bulkOps = await Promise.all(productUpdateOperations);
      await Product.bulkWrite(bulkOps);

      // ✅ Update vendor's availableBalance
      const shop = await Shop.findById(subOrder?.shopId);
      if (!shop) {
        return next(new ErrorHandler("Shop not found!", 404));
      }

      shop.availableBalance += subOrder?.payment?.subTotal || 0;
      shop.totalShippingChargePay += subOrder?.payment?.shippingCharge || 0;
      await shop.save();

      // create shiprocket order
      const totalWeight = subOrder?.items?.reduce((sum, item) => sum + ((item?.dimension?.weightValue || 0) / 1000), 0);

      // 2. Shiprocket order create payload
      const shiprocketOrderPayload = {
        order_id: subOrderId,
        order_date: new Date().toISOString().slice(0, 10),
        pickup_location: `prikup` || `307028`, 
        channel_id: "", // Optional
        billing_customer_name: order.buyerDetails.name,
        billing_last_name: "",
        billing_address: order.buyerDetails.address1,
        billing_city: order.buyerDetails.city,
        billing_pincode: order.buyerDetails.pincode,
        billing_state: order.buyerDetails.state,
        billing_country: "India",
        billing_email: order.buyerDetails?.email || `areenaecom@gmail.com`,
        billing_phone: order.buyerDetails?.phone,
        shipping_is_billing: true,
        order_items: subOrder?.items?.map(item => ({
          name: item?.title,
          sku: item?.sku || item?.productId,
          units: item?.qty,
          selling_price: item?.sellingPrice,
          discount: order?.totals?.discount || 0,
          tax: 0,
          hsn: item?.hsn || "9965"
        })),
        payment_method: order.payment?.method === "COD" ? "COD" : "Prepaid",
        sub_total: subOrder.payment?.subTotal,
        length: 10,
        breadth: 10,
        height: 10,
        weight: totalWeight 
      };
      
      // 3. Make API call
      try {
        const shiprocketResponse = await axios.post(
        "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
        shiprocketOrderPayload,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      
      subOrder.shipment = {
        order_id: shiprocketResponse.data?.order_id,
        channel_order_id: shiprocketResponse?.data?.channel_order_id,
        shipment_id: shiprocketResponse.data?.shipment_id,
        awb_code: shiprocketResponse.data?.awb_code,
        courier_company: shiprocketResponse?.data?.courier_company_id,
        courier_name: shiprocketResponse?.data?.courier_name,
        label_url: shiprocketResponse.data?.label_url,
        status: shiprocketResponse.data?.status
      };
      } catch (error) {
        console.log("Shiprocket Error:", error?.response?.data || error?.message);
      }
    }
    
    if(status == "ship now"){
      try {
        const response = await axios.post(
          "https://apiv2.shiprocket.in/v1/external/courier/assign/awb",
          {
            shipment_id: subOrder?.shipment?.shipment_id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(`response`, response?.data);
        
      } catch (error) {
        console.log(`error sip now`, error);
      }
    }
    
    // Step 4: Save the main order document
    // order.markModified('subOrders');
    // await order.save();
    
    res.status(200).json({
      success: true,
      message: "Status Updated!",
      order: subOrder
    });

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
    const orders = await Order.find().sort({createdAt: -1});
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