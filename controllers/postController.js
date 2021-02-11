const Post =require("../models/postModel").Post

module.exports={
    
        getPost:async(req,res)=>{
            try{
                const post=await Post.find()
    
                res.json({post})
    
            }catch(err){
                return res.status(500).json({msg:err.message})
            }
        },

        createPost:async(req,res)=>{
            try{
                const {title,images,description,numReviews,rating}=req.body;
                const post=await Post.findOne({title:title})

                if(post){
                    return res.status(400).json({msg:"This post already exists."})
                }else{
                    const newPost =new Post({
                        title:title,
                        description,
                        images,
                        numReviews,
                        rating
                    })
                    await newPost.save()
                    
                    res.json({msg:"created"}) 
                }
            }catch(err){
                return res.status(500).json({msg:"Create new Post"})
            }
        },
        reviews:async(req,res)=>{
            try{
               const {rating}=req.body

               if(rating && rating !== 0){
                   const post=await Post.findById(req.params.id)

                   if(!post) return res.status(400).json({msg:'Post does not exist'})

                   let num=post.numReviews
                   let rate=post.rating
                   await Post.findOneAndUpdate({_id:req.params.id},{
                       rating:rate +rating, numReviews:num+1
                   })
                    res.json({msg:'(╭☞ ͡ ͡° ͜ ʖ ͡͡°)╭☞'})
                }
            }catch(err){
                return res.status(500).json({msg:err.message})
            }
        }
    
}

