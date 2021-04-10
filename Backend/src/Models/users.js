const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
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
                if (value < 0) {
                    throw new Error("Age cannot be Negative please enter Correct Age")
                }
            }},
            phone: {
                type: Number,
                required: true,
                unique: true,
                validate(value) {
                    if (value.toString().length != 10) {
                        throw new Error("Please Enter Correct Mobile Number")
                    }
                }
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

userSchema.methods.generateAuthToken = async function () {
    try {
        const user = this
        const token = await jwt.sign({ _id: user._id.toString() }, "secretkey")
        user.tokens = user.tokens.concat({token })
        await user.save()
        return token
    } catch (e) {
        console.log(e)
    }
}
userSchema.statics.findByCredentials = async (email, password) => {
    try {
        const user = await User.findOne({ email })
        if (!user) {
            throw new Error('Unable to login with email ')
        }
        const isMathch = await bcrypt.compare(password, user.password)
        if (!isMathch) {
            throw new Error("Unable to login")
        }
        return user
    } catch (e) {
        console.log(e)
    }
}
// userSchema.statics.changePassword = async (email, password) => {
//     try {
//         const user = await User.findOne({ email })
//         if (!user) {
//             throw new Error('Wrong Email ')
//         }
//        const newpass= await bcrypt.update(user.password,password)
//         return user,newpass
//     } catch (e) {
//         console.log(e)
//     }
// }
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)

    }
    next()
})
const User = mongoose.model('User', userSchema)
module.exports = User