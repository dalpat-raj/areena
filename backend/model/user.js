const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const addressSchema = new mongoose.Schema({
  country: {
    type: String,
    default: `india`
  },
  state: {
    type: String
  },
  city: {
    type: String
  },
  address1: {
    type: String
  },
  address2: {
    type: String
  },
  pincode: {
    type: Number
  },
  addressType: {
    type: String,
    default: `home`
  }
});


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your full name"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
    },
    phoneNumber: {
      type: Number,
      required: [true, "Please enter phone number"],
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [4, "Password should be greater than 6 characters"],
        select: false,
    },
    address: {
      type: addressSchema,
    },
    avatar: {
        type: String,
    },
    role: {
        type: String,
        default: "user"
    }
})


//  Hash password
userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
      next();
    }
  
    this.password = await bcrypt.hash(this.password, 10);
  });

// JWT TOKEN
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };

  // compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };


module.exports = mongoose.model("Users", userSchema);