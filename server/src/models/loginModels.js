const mongoose = require('mongoose')

const test = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('table',test)