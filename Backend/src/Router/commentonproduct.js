const Comment = require('../Models/comment')
const express = require('express')
const router = new express.Router()
const Product = require('../Models/addproduct')
const auth = require('../middleware/auth')
const User =require('../Models/users')
router.post('/product/comment/:id', auth, async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id })
        const usercomment = await User.findOne(req.user._id)
        if (!product) {
            return res.status(404).send()
        }
        const comment = new Comment({
            comment: req.body.comment,
            owner: req.user._id,
            product: product._id,
            name :usercomment.name
        })
        await comment.save()
        await product.updateOne({ $push: { comments: comment._id } })

        res.send(comment)
    } catch (e) {
        res.status(400).send(e)

    }
})


router.delete('/comment/:id', auth, async (req, res) => {
    try{
        const comment=await Comment.findOne({_id:req.params.id , owner:req.user.id});
        if(!comment){
            return res.status(404).send('comment not found!');
            

        } 
        const product=await Product.findById(comment.product);
        await Comment.findByIdAndDelete(comment._id);
        await product.updateOne({$pull: {comments: comment._id }});
        const prod=await Product.findById(comment.product).populate("comments");
        res.send(prod);
    }catch(error){

    }
})

module.exports = router