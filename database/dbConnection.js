import mongoose from "mongoose";

export const dbConnection =()=> {
mongoose.connect(process.env.MONGO_URI,{
    dbName: "HOSPITAL_MANAGEMENT_SYSTEM",
}).then(()=>{
    console.log("Connected to DB");
}).catch((e)=>{
    console.log(`Some error found while connecting to DB: ${e}`);
})
}