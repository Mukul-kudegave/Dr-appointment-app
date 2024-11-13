import mongoose from "mongoose";
import validator from "validator";
import bycrpt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First name contain at least 3 character"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "Last name contain at least 3 character"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please provide valid email"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [10, "Phone no. must contain at least 10 digit"],
    maxLength: [10, "Phone no. must contain at least 10 digit"],
  },
  Aadhar: {
    type: String,
    required: true,
    minLength: [12, "Aadhar no. must contain exact 12 digit"],
    maxLength: [12, "Aadhar no. must contain exact 12 digit"],
  },
  dob: {
    type: Date,
    required: [true, "DOB is required"],
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  password: {
    type: String,
    minLength: [6, "password must contain at least 6 digit"],
    required: true,
    select: false,
  },
  role: {
    type: String,
    required: true,
    enum: ["Patient", "Doctor", "Admin"],
  },
  doctorDepartment: {
    type: String,
  },
  docAvatar: {
    public_id: String,
    url: String,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bycrpt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bycrpt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const User = mongoose.model("User", userSchema);
