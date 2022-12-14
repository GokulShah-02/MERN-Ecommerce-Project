const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"]
  },
  email: {
    type: String,
    required: [true, "Please enter your Email"],
    unique: true,
    validate:[validator.isEmail, "Please enter a valid Email"]
  },
  password: {
    type: String,
    required: [true, "Please enter your Password"],
    minLength: [8, "Password should have more than 8 characters"],
    select: false
  },
  avatar: {
    public_id: {
      type: String
    },
    url: {
      type: String
    }
  },
  role: {
    type: String,
    default: "user"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  cart: {
    type: Array,
    default: []
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
});

userSchema.pre("save", async function(next) {
  if(!this.isModified("password"))
    next();
  this.password = await bcrypt.hash(this.password, 10);
});

//JWT TOKEN
userSchema.methods.getJWTToken = function() {
  return jwt.sign(
    {id: this._id},
    process.env.JWT_SECRET,
    {expiresIn: process.env.JWT_EXPIRE}
  );
};

//Compare Password
userSchema.methods.comparePassword = async function(enteredPassword){
  return (await bcrypt.compare(enteredPassword, this.password));
};

//Generating Password Reset TOKEN
userSchema.methods.getResetPasswordToken = function() {
  //Generting Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //Hashing and adding to userSchema
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
