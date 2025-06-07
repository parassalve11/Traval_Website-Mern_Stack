import mongoose from "mongoose"



export const connectDB =async() =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongodb connect on ", conn.connection.host);
       
    } catch (error) {
        console.log("error connection DataBase ", error.message);
         process.exit(1);
    }
}