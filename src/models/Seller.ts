import mongoose from 'mongoose';

const SellerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    pic:{
        type:String, 
        required:true 
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    sells:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Order"
    }],
    products:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Product"
    }]
});
export default mongoose.model('Seller',SellerSchema);