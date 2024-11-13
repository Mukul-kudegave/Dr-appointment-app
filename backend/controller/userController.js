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
  generateTokens(user, "User Register Successfully",200,res )
});


export const login = catchAsycnErrors(async(req,res,next)=>{
    const {email, password, confirmPassword, role}=req.body;
    if(!email || !password || !confirmPassword || !role){
        return next(new ErrorHandler("Please fill all the Details",400));
    }
    if(password !== confirmPassword){
        return next(new ErrorHandler("password and Confirmed password should be same!",400));
        
    }
    const user = await User.findOne({email}).select("+password")
    if(!user){
        return next(new ErrorHandler("Invalid Password or Email!",400));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Password or Email!",400));
    }

    if(role !== user.role){
        return next(new ErrorHandler("User with this role not found!",400));
    }
    generateTokens(user, "User Register Successfully",200,res )
})

// export const 