const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const Messages = require("../model/messagesModel");
const path = require("path")

// create new messages
exports.createNewMessage = catchAsyncErrors(async(req, res, next)=>{
    try {
        const messageData = req.body;
        // if(req.files){
        //     const files = req.files;
        //     const imageUrls = files.map((file)=>`${file.fileName}`);
        //     messageData.images = imageUrls;
        // }

        if(req.file){
            const filename = req.file.filename;
            const fileUrl = path.join(filename);
            messageData.images = fileUrl;
        }

        messageData.conversationId = req.body.conversationId;
        messageData.sender = req.body.sender;
        messageData.text = req.body.text;

        const message = new Messages({
            conversationId: messageData.conversationId,
            text: messageData.text,
            sender: messageData.sender,
            images: messageData.images ? messageData.images : undefined,
        })

        await message.save();

        res.status(201).json({
            success: true,
            message
        })
    } catch (error) {
    return next(new ErrorHandler(error.message, 500));
    }
})

// get all message  with conversation id
exports.getAllMessages = catchAsyncErrors(async (req, res, next)=>{
    try {
        const messages = await Messages.find({
            conversationId: req.params.id,
        })

        res.status(201).json({
            success: true,
            messages
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})