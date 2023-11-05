const Event = require("../model/eventModel");
const Shop = require("../model/shopModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create Product 
exports.createEvent = catchAsyncErrors(async (req, res, next)=>{
    try {
        const shopId = req.body.shopId;
        const shop = await Shop.findById(shopId);
        if(!shop){
            return next(new ErrorHandler("Seller account is invalid", 400))
        }else{
            const files = req.files;
            const imageUrls = files.map((file)=>`${file.filename}`);
            const eventData = req.body;
            eventData.images = imageUrls;
            eventData.shop = shop;

            const event = await Event.create(eventData);

            res.status(201).json({
                success: true,
                message: "Event Create Successfully!",
                event
            })
        }
    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
})


// Get all events for seller
exports.getAllEvents = catchAsyncErrors(async (req, res, next)=>{
    console.log(req.params.id);
    try {
        const events = await Event.find({shopId: req.params.id}).sort({createdAt: -1});
        res.status(201).json({
            success: true,
            events
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
})

// delete shop event 
exports.deleteShopEvent = catchAsyncErrors(async (req, res, next)=>{
    try {
        const eventId = req.params.id;
        const event = await Event.deleteOne({_id: eventId})
        if(!event){
            return next(new ErrorHandler("Event not found", 400))
        }
        res.status(201).json({
            success: true,
            message: "Event Deleted Successfully"
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
})



// Get all events for user
exports.getAllEventsUser = catchAsyncErrors(async (req, res, next)=>{
    try {
        const events = await Event.find().sort({createdAt: -1});
        res.status(201).json({
            success: true,
            events
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
})