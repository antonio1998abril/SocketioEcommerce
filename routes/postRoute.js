const router=require('express').Router()
const postCtrl=require('../controllers/postController')



router.route('/post')
    .get(postCtrl.getPost)
    .post(postCtrl.createPost)

router.route('/post/:id')
    .patch(postCtrl.reviews)
module.exports=router