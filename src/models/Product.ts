import mongoose from 'mongoose';

const ProductSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    pics:[{
        type:String
    }],
    qty:{ 
        type:Number,
        required:true
    },
    sellerId:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:"Seller"
    },
    price:{
        type:Number,
        required:true
    },
    group:{
        type: String,
        enum : ['fashion','tech','household'],
        required:true
    },
    subgroup:{
        type: String,
        enum : ['mobile','comp','gadgets','tv','men','women','furniture','accessories'],
        required:true
    },
    creationDate:{
        type:Date,
        default:Date.now
    }
});
export default mongoose.model('Product',ProductSchema);