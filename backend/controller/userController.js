import { catchAsycnErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateTokens } from "../utils/jwtToken.js";

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
  ) {
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
  generateTokens(user, "User Register Successfully", 200, res);
});

export const login = catchAsycnErrors(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;
  if (!email || !password || !confirmPassword || !role) {
    return next(new ErrorHandler("Please fill all the Details", 400));
  }
  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("password and Confirmed password should be same!", 400)
    );
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Password or Email!", 400));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Password or Email!", 400));
  }

  if (role !== user.role) {
    return next(new ErrorHandler("User with this role not found!", 400));
  }
  generateTokens(user, "User Register Successfully", 200, res);
});

export const addNewAdmin = catchAsycnErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, Aadhar, dob, gender, password } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !Aadhar ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ErrorHandler("Please fill the form", 400));
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler(
        `${isRegistered.role} with this email is Already Exists!`,
        400
      )
    );
  }
  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    Aadhar,
    dob,
    gender,
    password,
    role: "Admin",
  });
  res.status(200).json({
    success: true,
    message: "New Admin Registered",
  });
});

export const getAllDoctors = catchAsycnErrors(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({
    success: true,
    doctors,
  });
});

export const getUserDetails = catchAsycnErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const logoutAdmin = catchAsycnErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin Log out Successfully",
    });
});

export const logoutPatient = catchAsycnErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "User Log out Successfully",
    });
});


// export const 