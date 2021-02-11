const mongoose =require('mongoose')
const Schema =mongoose.Schema;

const PostSchema = new Schema({
    title:{
        type:String,
        required:true
    },
 
    description:{
        type:String,
        required:true
    },
    numReviews:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        required:true
    }
},{
    timestamps:true
})

module.exports={Post:mongoose.model('posts',PostSchema)};