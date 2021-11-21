import mongoose from 'mongoose';

const CommentSchema=new mongoose.Schema({
    productId:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true
    },
    clientId:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    creationDate:{
        type:Date,
        default:Date.now
    }
});
export default mongoose.model('Comment',CommentSchema);