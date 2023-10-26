const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const Conversation = require("../model/Conversation");

// create new conversation
exports.newConversation = catchAsyncErrors(async (req, res, next) => {
  try {
    const { groupTitle, userId, sellerId } = req.body;

    const isConversationExists = await Conversation.findOne({ groupTitle });

    if (isConversationExists) {
      const conversation = isConversationExists;
      res.status(201).json({
        success: true,
        conversation,
      });
    } else {
      const conversation = await Conversation.create({
        members: [userId, sellerId],
        groupTitle: groupTitle,
      });

      res.status(201).json({
        success: true,
        conversation,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// get seller conversation
exports.getAllConversationSeller = catchAsyncErrors(async( req, res, next)=>{
    try {
        const conversation = await Conversation.find({members: {
            $in: [req.params.id],
        }}).sort({updatedAt: -1, createdAt: -1});

        res.status(201).json({
            success: true,
            conversation
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})

// get User conversation
exports.getAllConversationUser = catchAsyncErrors(async( req, res, next)=>{
  try {
      const conversation = await Conversation.find({members: {
          $in: [req.params.id],
      }}).sort({updatedAt: -1, createdAt: -1});

      res.status(201).json({
          success: true,
          conversation
      })
  } catch (error) {
      return next(new ErrorHandler(error.message, 500));
  }
})

// update the last conversation 
exports.updateLastConvrsation = catchAsyncErrors(async (req, res, next)=>{
  try {
    const {lastMessage, lastMessageId} = req.body;
    const conversation = await Conversation.findByIdAndUpdate(req.params.id, {
      lastMessage,
      lastMessageId,
    })

    res.status(201).json({
      success: true,
      conversation
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})