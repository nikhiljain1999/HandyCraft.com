const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is not valid")
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length < 6) {
                throw new Error("Password must be greater than or equal to 6 characters")
            }
            if (value === "password" || value === "Password") {
                throw new Error(value + "cannot be the Password")

            }

        }
    },
    age: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0 || value > 100) {
                throw new Error("Age cannot be Negative or greater than 100 please enter Correct Age")
            }
        }
    },
    phone: {
        type: Number,
        
        required: true,
        unique: true,
        validate(value) {
            if (value.toString().length != 10) {
                throw new Error("Please Enter Correct Mobile Number")
            }
        }
    }, address: {
        type: String,
        required: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

},
    {
        timestamps: true

    })

AdminSchema.methods.generateAuthToken = async function () {
    try {
        const admin = this
        const token = await jwt.sign({ _id: admin._id.toString() }, "secretkey")
        admin.tokens = admin.tokens.concat({ token })
        await admin.save()
        return token
    } catch (e) {
        console.log(e)
    }
}
AdminSchema.statics.findByCredentials = async (email, password) => {
    try {
        const admin = await Admin.findOne({ email })
        if (!admin) {
            throw new Error('Unable to login ')
        }
        const isMathch = await bcrypt.compare(password, admin.password)
        if (!isMathch) {
            throw new Error("Unable to login")
        }
        return admin
    } catch (e) {
        console.log(e)
    }
}
AdminSchema.pre('save', async function (next) {
    const admin = this
    if (admin.isModified('password')) {
        admin.password = await bcrypt.hash(admin.password, 8)

    }
    next()
})

const Admin = mongoose.model('Admin', AdminSchema)
module.exports = Admin