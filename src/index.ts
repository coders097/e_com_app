import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
const app=express();

// Load Environment Variables
dotenv.config({path:"config.env"});

// Middlewares
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(morgan("dev"));


// Routes
import authRoute from './routes/auth';
app.use("/auth",authRoute);
import adminRoute from './routes/admin';
app.use("/admin",adminRoute);


// Test Route
app.get("/",(req,res)=>{
    res.send("BADOL Maji");
})

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL!);
const db=mongoose.connection;
db.on('error',()=>console.log("connection error"));
db.once('open',()=>{
    console.log("We are connected!");
});

let PORT=process.env.PORT?parseInt(process.env.PORT):3001;
app.listen(PORT,"192.168.0.101",()=>{
    console.log("http://192.168.0.101:3001");
});
