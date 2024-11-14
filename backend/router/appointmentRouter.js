import express from 'express';
import {getAllApointments, postAppointment, updateAppointmentStatus} from '../controller/appointmentController.js';
import { isAdminAuthenticated, isPatientAuthenticated } from '../middlewares/auth.js';

const router = express.Router();
router.post("/post", isPatientAuthenticated, postAppointment)
router.get("/getall", isAdminAuthenticated, getAllApointments)
router.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus)



export default router