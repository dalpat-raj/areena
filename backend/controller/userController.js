const ErrorHandler = require("../utils/ErrorHandler");
const path = require("path");
const User = require("../model/user");
const sendUserToken = require("../utils/jwtUserToken");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const fs = require("fs");

// Register User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, phoneNumber, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      return next(new ErrorHandler("user already exists", 500));
    }

    let fileUrl = "";

    if (req?.file?.filename) {
      const filename = req?.file?.filename;
      fileUrl = path.join(filename);
    }

    const user = await User.create({
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      avatar: fileUrl,
    });

    sendUserToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please Fill The Information", 500));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("User does not exists!", 400));
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return next(new ErrorHandler("Please Provide Correct Information", 400));
    }

    sendUserToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Load user
exports.loadUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return next(new ErrorHandler("User Doesn't exists", 400));
    }
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Logout User
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(201).json({
      success: true,
      message: "Logout Success",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// update user
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, phoneNumber, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("User Doesn't exists", 400));
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return next(
        new ErrorHandler("Please provide the correct information", 400)
      );
    }

    user.name = name;
    user.email = email;
    user.phoneNumber = phoneNumber;

    await user.save();

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// update user avatar
exports.updateUserAvatar = catchAsyncErrors(async (req, res, next) => {
  try {
    const existsUser = await User.findById(req.user.id);
    const existsAvatarPath = `uploads/${existsUser.avatar}`;

    fs.unlinkSync(existsAvatarPath);

    const fileUrl = path.join(req.file.filename);

    const user = await User.findByIdAndUpdate(req.user.id, { avatar: fileUrl });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Update User Address
exports.updateUserAddress = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const sameTypeAddress = user.addresses.find(
      (address) => address.addressType === req.body.addressType
    );
    if (sameTypeAddress) {
      return next(
        new ErrorHandler(`${req.body.addressType} address already exists`)
      );
    }

    const existsAddress = user.addresses.find(
      (address) => address._id === req.body._id
    );
    if (existsAddress) {
      Object.assign(existsAddress, req.body);
    } else {
      user.addresses.push(req.body);
    }

    await user.save();

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Delete User Address
exports.deleteUserAddress = catchAsyncErrors(async (req, res, next) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;

    await User.updateOne(
      {
        _id: userId,
      },
      { $pull: { addresses: { _id: addressId } } }
    );

    const user = await User.findById(userId);

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Update User Password
exports.updateUserPassword = catchAsyncErrors(async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatch = await user.comparePassword(oldPassword);
    if (!isPasswordMatch) {
      return next(new ErrorHandler("Old password is incorrect!", 400));
    }

    user.password = newPassword;
    await user.save();

    res.status(201).json({
      success: true,
      message: "password change successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// find user info with the user id
exports.findUserWithId = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// admin get all seller
exports.getAllUsersForAdmin = catchAsyncErrors(async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    if (!users) {
      return next(new ErrorHandler("user not found!", 404));
    }
    res.status(201).json({
      success: true,
      users,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// forgate User Password
exports.forgateUserPassword = catchAsyncErrors(async (req, res, next) => {
  try {
    const { forgateEmail, newPassword } = req.body;
    const user = await User.findOne({ email: forgateEmail }).select(
      "+password"
    );

    if (!user) {
      return next(new ErrorHandler("Wrong Email Id", 404));
    }

    user.password = newPassword;
    await user.save();

    res.status(201).json({
      success: true,
      message: "Password Change Successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
