const jwt = require('jsonwebtoken')

const {UnauthenticatedError} = require('../errors')

const User = require('../models/User')

const auth = async (req,res,next)=>{

    const authHeader = req.headers.authorization


    if(!authHeader || !authHeader.startsWith('Bearer' )){
 
        console.log(authHeader, ' auth')
        throw new UnauthenticatedError('Authentication invalid.')
    }

    console.log('yup')
    const token = authHeader.split(' ')[1]

    try{

        const payload = jwt.verify(token, process.env.JWT_SECRET)
        //attach user to job route
        req.user = {userId:payload.userId, name:payload.name}
        next();
        
    }
    catch(error){

        throw new UnauthenticatedError('Verification error')
    }

 
}

module.exports = auth