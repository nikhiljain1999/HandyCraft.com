const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://nikhil:nikhil1999@cluster0.z30ix.mongodb.net/handicraftproject?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,

})