const mongoose =require('mongoose')
const Schema =mongoose.Schema;

const ChatSchema = new Schema({
    username:String,
    content:String,
    product_id:String,

    rating:{
        type:Number,
        required:true
    }
},{
    reply:Array
},{
    timestamps:true
})

module.exports={Chat:mongoose.model('chat',ChatSchema)};