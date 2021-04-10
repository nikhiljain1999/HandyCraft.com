const express=require('express')
const router=new express.Router()
//const productName=require('../Models/products')
const Comment =require('../Models/comment')
const Product= require('../Models/addproduct')

const auth =require('../middleware/auth')
router.get('/product/randomproduct',async(req,res)=>{
    const productfind=await Product.find({})
    res.send(productfind[Math. floor(Math. random()*productfind. length)])
    
})

router.get('/product/:title',async(req,res)=>{
    try{
        // console.log("sacaio")
        const title1= req.params.title.replace(/\s/g, "").slice(0,3)
 
        
        const expr=new RegExp(title1, "i");
        const product =await Product.find({title:{$in: [expr]}})

       
        if(!product){
           return res.send("Product not found")
        }
        res.send(product)
    }catch(e){
        res.status(400).send("Result not found")
    }
})


router.get("/producttype/:producttype/mostliked",async(req,res)=>{
    try{
       
        const mostliked=await Product.find({producttype:req.params.producttype}).sort({like:-1})
        res.send(mostliked)
    }catch(e){
        res.status(500).send()
    }
})
router.get("/producttype/:producttype/lowprice",async(req,res)=>{
    try{
        const lowprice=await Product.find({producttype:req.params.producttype}).sort({price:+1})
        res.send(lowprice)
    }catch(e){
        res.status(500).send()
    }
})
router.get("/producttype/:producttype/highprice",async(req,res)=>{
    try{
        const lowprice=await Product.find({producttype:req.params.producttype}).sort({price:-1})
        res.send(lowprice)
    }catch(e){
        res.status(500).send()
    }
})
router.get("/producttype/:producttype/offers",async(req,res)=>{
    try{
        const offers=await Product.find({producttype:req.params.producttype}).sort({offer:-1})
        res.send(offers)
    }catch(e){
        res.status(500).send()
    }
})
router.get('/products/:producttype',async(req,res)=>{
    try{
        const type=await Product.find({producttype:req.params.producttype})
        res.send(type)
    } catch(e){
        res.send(400).send("Not Found")
    }
})


router.post('/product/comment/:id',auth,async(req,res)=>{
    try {
        const product = await Product.findOne({ _id: req.params.id })
        
        if (!product) {
            return res.status(404).send()
        }
        const comment = new Comment({
            comment: req.body.comment,
            owner: req.user._id
        })
        await comment.save()
        await product.updateOne({ $push: { comments: comment._id } })

        res.send(comment)
    } catch (e) {
        res.status(400).send(e)

    }
})
router.get('/product/:id', async(req,res)=>{
    try {
        const product =await Product.findOne({_id:req.params.id})
        if (!product) {
            return res.status(404).send("Product not found")
    }
    res.send(product)
} catch (e) {
    res.status(400).send(e)
}})

router.get("/product/like/:id", auth, async (req, res) => {
    try {
        const productToLike = await Product.findOne({ _id: req.params.id })
        if (!productToLike) {
            return res.status(404).send("Product not found")
        }

      await productToLike.updateOne({ like: productToLike.like + 1 })
     const a= await Product.findOne({ _id: req.params.id })
        res.send(a)

    } catch (e) {
        res.status(400).send(e)
    }
})
router.get("/product/dislike/:id", auth, async (req, res) => {
    try {
        const productToDislikeLike = await Product.findOne({ _id: req.params.id })
        if (!productToDislikeLike) {
            return res.status(404).send("Product not found")
        }

      await productToDislikeLike.updateOne({ dislike: productToDislikeLike.dislike + 1 })
     const a= await Product.findOne({ _id: req.params.id })
        res.send(a)

    } catch (e) {
        res.status(400).send(e)
    }
})
 module.exports =router