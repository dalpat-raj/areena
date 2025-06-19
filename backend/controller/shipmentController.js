const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { default: axios } = require("axios");
const loginToShiprocket = require("../services/shiprocket");

exports.download_Invoice = catchAsyncErrors(async (req, res, next) => {
  const { shipment_id } = req.params;

  if (!shipment_id) {
    return next(new ErrorHandler("Shipment ID is required", 400));
  }
  
  try {
    const token = await loginToShiprocket();
    
    const invoiceResponse = await axios.post(
      `https://apiv2.shiprocket.in/v1/external/courier/generate/label`,
      { shipment_id: [shipment_id] },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }
    );

    res.status(200).json(invoiceResponse?.data);
  } catch (error) {    
    return next(new ErrorHandler(errorMessage, statusCode));
    console.log("error", error);
    
  }
});