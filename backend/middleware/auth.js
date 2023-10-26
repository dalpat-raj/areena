const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Shop = require("../model/shopModel")

exports.isAutenticated = catchAsyncErrors(async (req, res, next)=>{
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("Please login to access", 500));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();

})

exports.isSeller = catchAsyncErrors(async (req, res, next)=>{
    const {sellerToken} = req.cookies;
    if(!sellerToken){
        return next(new ErrorHandler("Please login to access",500));
    }
    
    const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);
    
    req.shop = await Shop.findById(decoded.id);
    
    next();

})

exports.isAdmin = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next (new ErrorHandler(`${req.user.role} can not access`, 500))
        }
        next();
    }
}