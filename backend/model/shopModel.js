const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your full name"],
  },
  shopName: {
    type: String,
    required: [true, "Please enter your shop name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
  },
  phone: {
    type: String,
    required: [true, "Please enter your Phone Number"],
  },
  address: {
    type: String,
    required: true,
  },
  zipCode: {
    type: Number,
    required: true,
  },
  pinCode: Array,
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Password should be greater than 6 characters"],
    select: false,
  },
  avatar: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  role: {
    type: String,
    default: "seller",
  },
  withdrawMethods: {
    type: Object,
  },
  availableBalance:{
    type: Number,
    default: 0,
  },
  transections: [
    {
      amount: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        default: "Processing",
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
      updatedAt: {
        type: Date,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetPasswordToken: String,
  resetPasswordTime: Date,
});

//  Hash password
shopSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
shopSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// compare password
shopSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Shop", shopSchema);
