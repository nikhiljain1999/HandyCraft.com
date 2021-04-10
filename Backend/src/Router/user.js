const express = require('express')
const router = new express.Router()
const User = require('../Models/users')
const  auth = require("../middleware/auth")
router.post("/users", async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
       if(e.keyValue && e.keyValue.email && e.code===11000){
            return res.status(409).send({
                errors: {
                    email: "same email already exist in db!"
                }
            })
       }
       if(e.keyValue && e.keyValue.phone )
       {
           return res.status(409).send({
               errors:{
                   phone:"Mobile number Already exist"
               }
           })
       }
        // console.log(e.name==="MongoError");
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        console.log(req.body)
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token})
    } catch (e) {
        res.status(400).send("Invalid Email or Password")
    }
})



router.get('/users/getprofile', auth , async(req,res)=>{
    try{
        const user=await User.find(req.user)
        if(!user){
           return res.send('User not found')
        }
        console.log(user)
        res.status(201).send(user)
    }catch(e){
        console.log("User not found")
    }
})

module.exports = router