
const TASK=require('../model/taskeSchema')
const creatTask=async(req,res)=>{

    try {
        
const {title,description,UserID}=req.body
const newTask=await TASK.create({title,description,owner:UserID})
res.status(201).json({msg:'task created',newTask})

    } catch (error) {
        res.status(500).json({msg:'somthing went wrong!'})
    }
} 
const getTask=async(req,res)=>{

    try {
        const {UserID}=req.body
const Tasks=await TASK.find({owner:UserID})
res.status(201).json({msg:'get user tasks',Tasks})



    } catch (error) {
        res.status(500).json({msg:'somthing went wrong!'})
    }
} 

const deleteUserTask=async(req,res)=>{

    try {

        
const userTasks=await TASK.findByIdAndDelete({_id:req.params.id})
res.status(201).json({msg:'task deleted'})



    } catch (error) {
        res.status(500).json({msg:'somthing went wrong!'})
    }
} 


const updateUserTask=async(req,res)=>{

    try {

        
const updateTasks=await TASK.findByIdAndUpdate({_id:req.params.id},req.body,{new:true})
res.status(201).json({msg:'task updated',updateTasks})



    } catch (error) {
        res.status(500).json({msg:'somthing went wrong!'})
    }
} 


module.exports={creatTask,getTask,deleteUserTask,updateUserTask}
