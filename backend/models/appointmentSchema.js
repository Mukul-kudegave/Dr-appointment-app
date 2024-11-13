import mongoose from "mongoose";
import mongoose from "mongoose";
import validator from "validator";
// import bycrpt from "bcrypt";
// import jwt from "jsonwebtoken";

const appointmentSchema = new mongoose.Schema({
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
  appointment_date:{
    type:String,
    required:true,
  },
  department:{
    type:String,
    required:true,
  },
  doctor:{
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true,
    },
  },
  hasvisited:{
    type:Boolean,
    required:true,
  },
  doctorId:{
    type:mongoose.Schema.ObjectId,
    required:true,
  },
  patientId:{
    type:mongoose.Schema.ObjectId,
    required:true,
  },
  address:{
    type:String,
    required:true,
  },
  status:{
    type:String,
    enum:["Pending","Accepted","Rejected"],
    default:"Pending",
  },
});



export const Appointment = mongoose.model("Appointment", appointmentSchema);
