const Task = require("../models/Task")
const asyncWrapper = require ('../middleware/async')
const {createCustomError }= require ('../errors/custom-api-errors')

const getAllTasks = asyncWrapper (async (req,res) => {
    const tasks = await Task.find()
    res.status(200).json(tasks)
})

const createNewTask = asyncWrapper (async (req,res) => {
    const tasks = await Task.create(req.body)
    res.status(201).json(tasks)
})

const getTaskById = asyncWrapper (async (req,res) => {
    const {id: taskId} = req.params
    const task = await Task.findOne({_id:taskId})

    if(!task){
        return next(createCustomError(`Task not found with id: ${taskId}`, 404))
    }
    res.status(200).json(tasks)
})

const deleteTaskById= asyncWrapper (async (req,res) => {
    const {id: taskId} = req.params
    const task = await Task.findByIdAndDelete({_id:taskId})

    if(!task){
        return next(createCustomError(`Task not found with id: ${taskId}`, 404))
    }
    res.status(200).json("Deleted Successfully...")
})


const updateTaskById= asyncWrapper (async (req,res) => {
    const {id: taskId} = req.params
    const task = await Task.findByIdAndUpdate({_id:taskId}, req.body,{
        new:true,
        runValidators: true
    })

    if(!task){
        return next(createCustomError(`Task not found with id: ${taskId}`, 404))
    }
    res.status(200).json("Deleted Successfully...")
})

module.exports = {
    getAllTasks, createNewTask,
    getTaskById, deleteTaskById, updateTaskById
}