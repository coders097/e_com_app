import mongoose from 'mongoose';

const ClientSchema=new mongoose.Schema({
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
    orders:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Order"
    }],
    wishlist:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Product"
    }],
    address:[{
        type:String
    }]
});
export default mongoose.model('Client',ClientSchema);