const mongoose =require('mongoose')
const multer=require('multer')
const validator = require('validator')
const ProductSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    producttype:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        validate(value) {
            if (value< 0) {
                throw new Error("Price cannot be negative")
            }}
    },
    like:{
        type:Number,
        default:0
    },
    dislike:{
        type:Number,
        default:0
    },comments:[{
            type:mongoose.Types.ObjectId,
            ref:'Comment'
        }],
    image: {
         data: Buffer, 
         contentType: String 
    }, offer:{
        type:Number,
        default:0,
        validate(value) {
            if (value> 99) {
                throw new Error("Offer Cannot be more than 99%")
            }}

    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Admin'
    } 
    

})
const ProductAdd= mongoose.model('Product',ProductSchema)
module.exports=ProductAdd