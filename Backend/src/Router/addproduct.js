const express = require('express')
const router = new express.Router()
const authadmin = require('../middleware/authadmin')
const Product = require('../Models/addproduct')
const multer = require('multer');
const path = require('path')
const fs = require('fs')

const storage = new multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../assets/"));
    },
    filname: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({
    limits: {
        fileSize: 1000000,
        },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/gm)) {
            return cb(new Error("Please upload file with proper extension only!"));
        }
        cb(undefined, true);
    },
});

const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: "dodiji7ay",
    api_key: "257245825758265",
    api_secret: "i-mMWFOAViUaSQhZp8EYgNwDR00",
});

router.post("/upload", authadmin, async (req, res) => {
    const upload = multer({ storage }).any("photo");
    await upload(req, res, async function (err) {

        if (err) return res.send(err);
        const { title, Description, producttype, price, offer, stock } = req.body
        const product = new Product({

            title, Description, producttype, price, offer, stock,
            owner: req.admin._id

        })
        //  console.log(req.file, req.files)
        //  res.send()
        try {
            if (req.files.length) {
                const [first,second]=req.files
                await cloudinary.uploader.upload(
                    first.path,
                    {
                        public_id: `project-images/${product._id}/image`,
                        tags: "projectphoto"
                    },

                    async function (err, image) {
                        if (err) return res.status(400).send(err);
                        fs.unlinkSync(first.path);
                        product.image = image.url
                    },

                );
                await cloudinary.uploader.upload(
                    second.path,
                    {
                        public_id: `project-images/${product._id}/image1`,
                        tags: "projectphoto"
                    },

                    async function (err, image) {
                        if (err) return res.status(400).send(err);
                        fs.unlinkSync(second.path);
                        product.image1 = image.url
                    },

                );
            }
            await product.save()
            res.status(201).send(product)
        } catch (e) {
            res.status(400).send(e)
        }
    })
   
});

router.get('/product/getproduct/:id', authadmin, async (req, res) => {
    try {
        const product = await Product.find({ _id: req.params.id, owner: req.admin._id })
        res.status(201).send(product)
    } catch (e) {
        res.status(400).send("Product not found")
    }
})
router.delete('/admin/delete/:id', authadmin, async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ _id: req.params.id, owner: req.admin._id })
        if (!product) {
            return res.status(404).send({ product: "Product not found" })
        }
        res.send(product)
    } catch (e) {
        res.status(500).send("Invalid opreation")
    }
})
router.get('/admin/getAddedidems', authadmin, async (req, res) => {
    try {

        const mostliked = await Product.find({ owner: req.admin._id })
        res.send(mostliked)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/admin/edit/:id', authadmin, async (req, res) => {
    const update = Object.keys(req.body)
    const allowUpdate = ['title', 'Description', 'producttype', 'price', 'offer', 'stock']
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
            if (!!req.body[upsates]) {
                product[upsates] = req.body[upsates]

            }
        })
        await product.save()
        res.send(product)

    } catch (e) {
        res.status(400).send(e)
    }

})
module.exports = router