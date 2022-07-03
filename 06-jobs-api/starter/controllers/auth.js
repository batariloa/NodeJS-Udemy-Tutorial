const {StatusCodes} = require('http-status-codes')
const User = require('../models/User')
const {BadRequestError} = require('../errors')

//jwt
const jwt = require('jsonwebtoken')


const register = async (req,res)=>{

    const user = await User.create({...req.body})
    const token = await user.generateJwt()
    


    res.status(StatusCodes.CREATED).json({user: {name: user.name},token})
}

const login = async(req,res) =>{
    res.send('login user')
}

module.exports = {
    register,
    login
}