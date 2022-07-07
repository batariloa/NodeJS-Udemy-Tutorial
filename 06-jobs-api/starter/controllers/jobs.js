
const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const createJob = async (req,res)=>{
    
    console.log("Bleh")
    req.body.createdBy = req.user.userId

            console.log(req.body, 'BODUYYu  ')

    const job = await Job.create(req.body)
    console.log('yo', job)
    res.status(StatusCodes.CREATED).json({job})
    
}


const getAllJobs = async(req,res) =>{
    const allJobs = await Job.find({createdBy:req.user.userId})
    res.status(StatusCodes.CREATED).json({allJobs})
}

const getJob = async(req,res) =>{
    const {
        user:{userId}, 
        params:{id:jobId}
        } 
    = req

    const job = await Job.findOne({
        _id:jobId,
        createdBy:userId
        })

    if(!job){
        throw new NotFoundError(`No job with id ${jobId} for this user`)
    }

    res.status(StatusCodes.OK).json({job})
}

const updateJob = async(req,res) =>{
        const {
        user:{userId}, 
        params:{id:jobId},
        body:{company, position}
        } 
    = req

    if(company===''|| position===''){
        throw  new BadRequestError('Company or position fields cannot be empty')
    }

    const job = await Job.findByIdAndUpdate(
        {_id:jobId, createdBy:userId}, //find by  
        req.body,
        {new:true}
        )

    res.status(StatusCodes.OK).json({job, msg:'Job updated'})
}

const deleteJob = async(req,res) =>{

    const {
        body:{company, position},
        params:{id:jobId},
        user:{userId}
    } = req

    const job = await Job.findByIdAndRemove(
        {_id:jobId, createdBy: userId}
    )

    if(!job){
        throw new BadRequestError('No such job')
    }
    res.status(StatusCodes.OK).send()
}


module.exports = {
  getAllJobs,
  getJob,
  updateJob,
  createJob,
  deleteJob
}