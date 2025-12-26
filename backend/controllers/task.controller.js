import Task from "../models/task.model.js";

export const createTask = async(req,res)=>{
    try{
        const {title,description,status,date} = req.body;
        const task = await Task.create({
            title,description,status,date,
            user:req.user._id
        });

        res.status(201).json({message:"Task created successfully",task});
    }catch(error){
        res.status(500).json({message:"Failed to create task"});
    }
}

export const getMyTasks = async(req,res)=>{
    try{
        const tasks = await Task.find({user:req.user._id});
        res.status(200).json(tasks);
    }catch(error){
        res.status(500).json({message:"Failed to fetch tasks"});
    }
}

export const updateTask = async(req,res)=>{
    try{
        const task = await Task.findOneAndUpdate({_id:req.params.id,user:req.user._id},req.body,{new:true});
        
        if(!task){
            return res.status(404).json({message:"Task not found"});
        }

        res.status(200).json({
            message:"Task updated",task
        })
    }catch(error){
        res.status(500).json({message:"Failed to update task",error:error.message});
    }
}

export const deleteTask = async(req,res)=>{
    try{

        const task = await Task.findByIdAndDelete({_id:req.params.id,
            user:req.user._id
        })

        if(!task){
            return res.status(404).json({message:"Task not found"});
        }

        res.status(200).json({message:"Task deleted successfully"});
    }catch(error){
        res.status(500).json({message:"Failed to delete task"});
    }
}