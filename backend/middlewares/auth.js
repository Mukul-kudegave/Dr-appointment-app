import { User } from "../models/userSchema.js";
import { catchAsycnErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken";

export const isAdminAuthenticated = catchAsycnErrors(async (req, res, next) => {
  const token = req.cookies.adminToken;
  if (!token) {
    return next(new ErrorHandler("Admin Not Authenticated", 400));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  if (req.user.role !== "Admin") {
    return next(
      new ErrorHandler(`${req.user.role} not authorized for this resource`, 403)
    );
  }
  next();
});

export const isPatientAuthenticated = catchAsycnErrors(
  async (req, res, next) => {
    const token = req.cookies.patientToken;
    if (!token) {
      return next(new ErrorHandler("User is not authenticated!", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if (req.user.role !== "Patient") {
      return next(
        new ErrorHandler(
          `${req.user.role} not authorized for this resource!`,
          403
        )
      );
    }
    next();
  }
);