const express = require('express')
const router = new express.Router()
const Admin = require('../Models/admin')
const AddProduct=require('../Models/addproduct')
const authadmin = require('../middleware/authadmin')
const multer=require('multer')
const Product =require('../Models/addproduct')
// const upload =multer({
//     dest:'images'
// })
router.post('/admin/addproduct',authadmin,async(req,res)=>{
    console.log(req) 
    try{
        const addProduct =new AddProduct({
            ...req.body,
            owner:req.admin._id
        })
      await addProduct.save()
        res.status(201).send()
    }catch(e){
         res.status(400).send(e)
    }
})

router.get('/product/getproduct/:id',authadmin, async(req,res)=>{
    try{
        const product =await Product.find({ _id: req.params.id, owner: req.admin._id })
        
        console.log(product)
        res.status(201).send(product)
    }catch(e){
        res.status(400).send("Product not found")
    }
})
router.delete('/admin/delete/:id',authadmin,async(req,res)=>{
    try {
        const product = await Product.findOneAndDelete({ _id: req.params.id, owner: req.admin._id })
        if (!product) {
            return res.status(404).send({ product: "Product not found" })
        }
        res.send(product)
    } catch (e) {
        console.log(e)
        res.status(500).send("Invalid opreation")
    }
})
router.get('/admin/getAddedidems',authadmin,async(req,res)=>{
    try{

        const mostliked=await Product.find({owner:req.admin._id})
        res.send(mostliked)
    }catch(e){
        res.status(500).send()
    }
})

router.patch('/admin/edit/:id', authadmin, async (req, res) => {
    const update = Object.keys(req.body)
    const allowUpdate = ['title','Description','producttype','price']
    const isValidOperation = update.every((update) => allowUpdate.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: "invalid Update" })
    }
    try {
        const product = await Product.findOne({ _id: req.params.id, owner: req.admin._id })
        if (!product) {
            return res.status(400).send("Not found")
        }
        update.forEach((upsates) => {
            if(!!req.body[upsates]){
                product[upsates] = req.body[upsates]
            }
        })
        console.log(product);
        await product.save()
        res.send(product)

    } catch (e) {
        console.log(e);
        res.status(400).send(e)
    }

})
module.exports = router