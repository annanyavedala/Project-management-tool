// backend/routes/taskRoutes.js
const express = require('express');
const Task = require('../models/Task');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { sendNotification } = require('../kafka/producer');


const router = express.Router();

router.post('/tasks/:projectId/Createtask', auth, async (req, res) => {
    const { name, assignedTo, status, dueDate } = req.body;
    try {
        const task = new Task({ name, project: req.params.projectId, assignedTo, status, dueDate });

        // const projectManagers = await User.find({ role: 'Project Manager' });

        // projectManagers.forEach(async (manager) => {
        //     const notification = {
        //         recipient: manager.email,
        //         message: `A new task "${name}" has been created in a project you manage.`,
        //     };
        //     await sendNotification(notification);
        // });

        const newTask = await task.save();
        res.json(newTask);
    } catch (err) {
        console.error('Error creating task:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});


router.get('/tasks/:projectId', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ project: req.params.projectId });
        res.json(tasks);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/tasks/delete', auth, async (req, res) => {
    const { id } = req.body;
    console.log(id); // Log the received id
    try {
        const task = await Task.findById(id);
        console.log(task); // Log the task found

        if (!task) {
            return res.status(404).send('No task found');
        }


        await task.deleteOne(); // Remove the task

        res.status(200).send({ id: task._id });
    } catch (err) {
        console.error(err); // Log any errors
        res.status(500).send('Internal server error');
    }
});

router.post('/tasks/:taskId/edit', auth, async (req, res)=>{
    
    const {name, assignedTo, status, dueDate}= req.body;
    try{
        const task = await Task.findById(req.params.taskId);
        if(!task){
            return res.status(404).send('Task not found');
        }
        task.name = name;
        task.assignedTo = assignedTo;
        task.status = status;
        task.dueDate = dueDate;

        await task.save();
        res.json(task);


    }catch(err){
        res.status(500).send('Internal server error');
    }

});



module.exports = router;
