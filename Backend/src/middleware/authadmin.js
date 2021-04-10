const jwt =require('jsonwebtoken')
const Admin =require('../Models/admin')

const authadmin =async (req,res,next)=>{
    try{
        const token =req.header('Authorization').replace('Bearer ',"")
        const decoded=jwt.verify(token,"secretkey")
        const admin=await Admin.findOne({_id:decoded._id,"tokens.token":token})

        if(!admin){
            throw new Error ("Admin Not found")

        }
        req.token=token
        req.admin=admin
        next()
    }catch(e){
        console.log(e)
        res.status(401).send({error:"Please authenticate"})
    }
}
module.exports=authadmin