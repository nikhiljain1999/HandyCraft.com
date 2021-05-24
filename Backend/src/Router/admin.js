const express = require('express')
const router = new express.Router()
const Admin = require('../Models/admin')
const authadmin = require('../middleware/authadmin')
router.post("/admin", async (req, res) => {
    const admin = new Admin(req.body)
    try {
        await admin.save()
        const token = await admin.generateAuthToken()
        res.status(201).send({ admin, token })
    } catch (e)  {if (e.keyValue && e.keyValue.email && e.code === 11000) {
        return res.status(409).send({
            errors: {email:{
                message: "same email already exist in db!"
            }
            }
        })
    }
    if (e.keyValue && e.keyValue.phone && e.code === 11000) {
        return res.status(409).send({
            errors: {phone:{
                message: "Mobile number Already exist"
            }}
        })
    }
    res.status(400).send(e)
    }
})

router.post('/admin/login', async (req, res) => {
    try {
        const admin = await Admin.findByCredentials(req.body.email, req.body.password)
        const token = await admin.generateAuthToken()
        res.send({ admin, token})
    } catch (e) {
        res.status(400).send("Invalid Email or Password")
    }
})
router.get('/admin/profile' ,authadmin,async(req,res)=>{
    try{
        const admin =await Admin.findOne(req.admin)
        res.send(admin)
    }catch(e){
        res.send(e)
    }
})

router.post('/admin/logout', authadmin, async (req, res) => {
    try {
        req.admin.tokens = req.admin.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.admin.save()
        res.send("Logout Successfully")
    } catch (e) {
        res.status(500).send()
    }
})



module.exports = router