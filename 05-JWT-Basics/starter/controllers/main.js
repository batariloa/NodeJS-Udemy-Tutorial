const CustomAPIError = require('../errors/custom-error')
const {BadRequest} = require('../errors/bad-request')
const jwt = require('jsonwebtoken')

const login = async (req,res) =>{

    console.log(req.body)
    const {username,password} = req.body
    console.log('Throw error')

   if(!username || !password){
        console.log('Throw error')
         throw new BadRequest('Please provide email and password')
    }

    const id  = new Date().getDate()//just for demo

    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn:'30d'})

    res.status(200).json({msg:'user created', token})

}

const dashboard = async (req,res) =>{ 

    
    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200).json({msg:`Hello, ${req.user.username}. Randomized number ${luckyNumber}`})
}

module.exports = {
    dashboard,login
}