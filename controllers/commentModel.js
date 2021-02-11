const Chat=require('../models/chatModel').Chat

module.exports={
    
    getComments:async(req,res)=>{
        try{
            const comments=await Chat.find({post_id:req.params.id})
            res.json({comments})
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },



}
