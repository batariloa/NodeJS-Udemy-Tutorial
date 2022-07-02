const {UnauthenticatedError} = require('../errors')

const jwt = require('jsonwebtoken')

const authenticationMiddleware = async (req,res, next) =>{

    console.log(req.headers.authorization)
    const authHeader = req.headers.authorization;
    
    if(!authHeader || !authHeader.startsWith('Bearer '))
    throw new UnauthenticatedError('Bearer token not provided')

    const token = authHeader.split(' ')[1] //extract jwt
   

try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    const {id, username} = decoded
    req.user = {id,username}


    next()
    console.log(decoded)
}
catch(error){
    throw new UnauthenticatedError('Not Authorized')
}
    
}

module.exports = authenticationMiddleware
