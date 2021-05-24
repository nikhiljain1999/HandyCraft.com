const express = require('express')
require('./src/db/mongoose')
const cors = require('cors')
const app = express()


app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const port = 3001
const routerUser = require('./src/Router/user')
const adminrouter = require('./src/Router/admin')
const addproductrouter = require('./src/Router/addproduct')
const productrouter = require('./src/Router/products')
const commentonproduct =require('./src/Router/commentonproduct')


app.use(routerUser)
app.use(adminrouter)
app.use(productrouter)
app.use(addproductrouter)
app.use(commentonproduct)


app.listen(port, () => {
    console.log("Server Up at port " + port)
})