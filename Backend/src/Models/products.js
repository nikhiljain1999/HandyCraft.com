const mongoose =require('mongoose')
const productSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    like:{
        type:Number,
        defsult:0
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
          },
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User"

        },
},{
    timestamps: true
})

const ProductDetails =mongoose.model("Product",productSchema)
module.exports=ProductDetails

