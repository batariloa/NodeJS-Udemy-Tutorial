const Task = require('../models/task')
const asyncWrapper = require('../middleware/async') 
const {createCustomError} = require('../errors/custom-error')


const getAllTasks= asyncWrapper( async (req,res)=>{
    
    const tasks = await Task.find({});
    res.status(200).send({success:true, tasks, amount:tasks.length});
  
})

const createTask = async (req,res, next) =>{

    try{
    const task = await Task.create(req.body);
    res.status(201).send(task);
    }
    catch(error){

        res.status(500).json({msg:error})
    }
}

const getTask = asyncWrapper( async (req,res, next) =>{

    
    const {id:taskID} = req.params 
    console.log('TASK ID IS', taskID)
    const task = await Task.findOne({_id: taskID})

    if(!task){
      
        return next(createCustomError('No task with that id', 404))
    }

        console.log('Yes task')
        return res.status(200).json({task})
    

})

const deleteTask = async (req,res) =>{
    try{
        const {id:taskID} = req.params
        const task = await Task.findOneAndDelete({_id:taskID})

       if(!task)
       return res.status(404).json({msg:'No task with such id'})

    res.status(200).json({msg:'Deleted.'})
    }
    catch(error){
        res.status(500).json({msg:'Invalid ID'})

    }
}

const updateTask = async (req,res) =>{
    try{
    const {id:taskID} = req.params
    const task = await Task.findOneAndUpdate({_id:taskID},req.body,{
        new:true,
        runValidators:true,

    })
    res.status(200).json({task})
    
    if(!task)
    return res.status(404).json({msg:'No task with such id'})
    }
    catch(error){
        res.status(500).json({msg:'Bad request'})
    }


}

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
}