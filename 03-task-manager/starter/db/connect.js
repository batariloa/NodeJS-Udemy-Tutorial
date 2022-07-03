const e = require('express')
const mongoose = require('mongoose')




connectDb = (url)=>{
    mongoose
    .connect(url, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify:false,
        useUnifiedTopology:true
    })
    
}

module.exports = connectDb
