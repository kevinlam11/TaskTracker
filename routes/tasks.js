const mongoose = require ('mongoose')

const TaskSchema = new mongoose.Schema ({
    name:{
        type:String,
        required: [true, 'must provide name'],
        trime:true,
        maxlength: [40, "Name cant be more than 40 characters"]
    }, 

    completed: {type:Boolean, default: false,},
})

module.exports = mongoose.model('Task',TaskSchema)


const router = require ("express").Router()

const {  getAllTasks, createNewTask,
    getTaskById, deleteTaskById, updateTaskById} = require ('../controllers/tasks')

    router.route('/').get(getAllTasks).post(createNewTask)

    router.route('/:id').get(getTaskById).patch(updateTaskById).delete(deleteTaskById)

    module.exports = router;