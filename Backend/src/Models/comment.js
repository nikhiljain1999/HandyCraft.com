const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,

    }, owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        
    },name:{
        type:String
    }
}

)
const comment = mongoose.model('Comment', commentSchema)
module.exports = comment