import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
const app=express();
import autoComplete from './utils/autoComplete';

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




// Models
import Product from './models/Product';

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL!);
const db=mongoose.connection;
db.on('error',()=>console.log("connection error"));
db.once('open',async ()=>{
    console.log("We are connected!");
    let initialValuesForTrie:string="";
    let products=await Product.find();
    products.forEach(product=>initialValuesForTrie+=product.title+" ");
    autoComplete.init(app,initialValuesForTrie);
    autoComplete.addWordToTrie("zebra");
});

let PORT=process.env.PORT?parseInt(process.env.PORT):3001;
app.listen(PORT,"localhost",()=>{
    console.log("http://localhost:3001");
});
