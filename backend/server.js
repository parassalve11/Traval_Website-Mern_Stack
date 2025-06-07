import dotenv from 'dotenv'
import express from 'express'


import cookieParser from 'cookie-parser';

import cors from 'cors'
import { connectDB } from './lib/db.js';
import Booking from './routers/booking.router.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use(express.json({limit:"5mb"}));//parse JSON request bodies
app.use(cookieParser());


app.use('/api/v1/booking',Booking)


app.listen(PORT,() =>{
    console.log(`Server is Running on ${PORT}.`);
    connectDB()
});