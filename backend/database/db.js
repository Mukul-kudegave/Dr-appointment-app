import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "dr_appointment_app",
    })
    .then(() => {
      console.log("MongoDB Connected Succesfully");
    })
    .catch((err) => {
      console.log(`Some error occur while connecting: ${err}`);
    });
};
