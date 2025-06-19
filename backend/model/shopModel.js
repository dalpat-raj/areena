const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const shopSchema = new mongoose.Schema({
  complateAddress: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
  },
  country: {
    type: String,
    default: "india",
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: [true, "Please enter your full name"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Please enter your Phone Number"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
  },
  shopName: {
    type: String,
    required: [true, "Please enter your shop name"],
  },
  description: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "Password should be greater than 6 characters"],
    select: false,
  },
  operationalDays: [
    {type: String}
  ],
  openTime: {
    type: String,
  },
  closeTime: {
    type: String
  },
  avatar: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false,
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
  totalShippingChargePay:{
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
