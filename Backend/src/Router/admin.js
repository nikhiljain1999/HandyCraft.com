const express = require('express')
const router = new express.Router()
const Admin = require('../Models/admin')
const AddProduct=require('../Models/addproduct')
const authadmin = require('../middleware/authadmin')
router.post("/admin", async (req, res) => {
    console.log(req.body)
    const admin = new Admin(req.body)
    try {
        await admin.save()
        const token = await admin.generateAuthToken()
        res.status(201).send({ admin, token })
    } catch (e) {
        console.log(e)
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