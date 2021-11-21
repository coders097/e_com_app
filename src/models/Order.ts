import mongoose from 'mongoose';

const OrderSchema=new mongoose.Schema({
    clientId:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:"Client"
    },
    status:{
        type: String,
        enum : ['process','success','cancel'],
        default:'process'
    },
    products:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Product"
    }],
    productNos:[{
        type:Number
    }],
    totalPrice:{
        type:Number,
        required:true
    },
    creationDate:{
        type:Date,
        default:Date.now
    }
});
export default mongoose.model('Order',OrderSchema);