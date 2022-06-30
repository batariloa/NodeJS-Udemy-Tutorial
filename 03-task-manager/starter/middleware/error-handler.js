const {CustomAPIError} = require('../errors/custom-error')
const errorHandlerMiddleware = (err,req,res,next) =>
{
    console.log('Error is ', err )
    if(err instanceof CustomAPIError){
        return res.status(500).json({msg:err.message})
    }
    return res.status(500).json({msg:'Something went wrong:'})
}

module.exports = errorHandlerMiddleware