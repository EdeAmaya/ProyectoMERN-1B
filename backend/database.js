import mongoose from "mongoose";

const URI = "mongodb://localhost:27017/cocacolaDB"

mongoose.connect(URI)


const connection = mongoose.connection
connection.once("open", ()=>{
    console.log("DB is connected");
});

connection.once("disconnected", ()=>{
    console.log("DB is disconnected");
});

connection.once("error", (error)=>{
    console.log("Error found" + error);
});