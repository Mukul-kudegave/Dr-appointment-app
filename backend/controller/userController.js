import { catchAsycnErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";

export const PatientRegister = catchAsycnErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    Aadhar,
    dob,
    gender,
    password,
    role,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !Aadhar ||
    !dob ||
    !gender ||
    !password ||
    !role
  ){
    return next(new ErrorHandler("Please fill the form", 400));
  }
  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User Already Registerd", 400));
  }
  user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    Aadhar,
    dob,
    gender,
    password,
    role,
  });
  res.status(200).json({
    success: true,
    message: "User Register Successfully",
  });
});
