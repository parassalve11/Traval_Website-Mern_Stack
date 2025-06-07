import Booking from "../models/booking.model.js";



export const BookingAction = async(req,res) =>{
    try {
        const{name,email,phone,dateTime,trip,specialReq } = req.body;

        if(!name || !email || !phone  || !dateTime  || !trip ){
            return res.status(400).json({message:"All filed are requied"})
        };

        const existingEmail = await Booking.findOne({email});
        if(existingEmail){
            return res.status(401).json({message:"Email already exists , try diffrent email"})
        }
        const existingPhoneNumber = await Booking.findOne({phone});
        if(existingPhoneNumber){
            return res.status(401).json({message:"Phone already exists , try diffrent Number"})
        }

        const booking = new Booking({
            name,
            email,
            phone,
            dateTime,
            trip,
            specialReq
        });

        await booking.save();

        res.status(201).json({message:"Your Slot is Booked"})
    } catch (error) {
        console.log("Error in BookingAction controller" , error.message);
        res.status(500).json({message:"Server Error"})
    }
}



export const getAllBookings = async (req, res) => {
  try {
    // Assume admin authentication is handled via middleware
    const bookings = await Booking.find().sort({ createdAt: -1 }); // Sort by newest first
    res.status(200).json(bookings);
  } catch (error) {
    console.log("Error in getAllBookings controller", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};