const ErrorHandler = require("../utils/ErrorHandler");
const path = require("path");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const fs = require("fs");
const loginToShiprocket = require("../services/shiprocket");
const { default: axios } = require("axios");

exports.download_Invoice = catchAsyncErrors(async (req, res, next) => {
  const { order_id } = req.params;

  if (!order_id) {
    return next(new ErrorHandler("Order ID is required", 400));
  }

  const token = await loginToShiprocket();

  try {
    // Then download invoice
    const invoiceResponse = await axios.get(
      `https://apiv2.shiprocket.in/v1/external/orders/print/invoice/=${order_id}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        responseType: 'arraybuffer'
      }
    );

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=invoice_${order_id}.pdf`);
    res.send(Buffer.from(invoiceResponse.data, 'binary'));
    
  } catch (error) {
    console.error('Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    if(error.response?.status === 404) {
      return next(new ErrorHandler(`Invoice not found for order ${order_id}. Please ensure order is shipped.`, 404));
    }
    return next(new ErrorHandler(error.response?.data?.message || 'Failed to download invoice', error.response?.status || 500));
  }
});