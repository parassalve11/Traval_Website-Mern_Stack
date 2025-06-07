import { Router } from "express";
import { BookingAction, getAllBookings } from "../controllers/booking.controller.js";



const router = Router();

router.post('/book' , BookingAction);
router.get("/all",  getAllBookings);

export default router;