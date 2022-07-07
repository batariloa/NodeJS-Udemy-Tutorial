const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
//jwt
const jwt = require('jsonwebtoken')



const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please provide a name'],
        minlength: 3,
        maxlength: 50
    },
    email:{
        type:String,
        required:[true, 'Please provide an email'],
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          , 'Must provide a valid email'  
        ],
        unique: true
    },
    password:{
        type:String,
        required:[true, 'Please provide a password'],
        minlength: 6,
        maxlength: 100
    },
})

UserSchema.pre('save', async function (next){

    console.log('PRE')
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

UserSchema.methods.generateJwt = async function(){

    const token = await jwt.sign({userId:this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    })

    return token;
}

UserSchema.methods.comparePassword = async function (candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)

    return isMatch
}

module.exports = mongoose.model('User', UserSchema)