const express = require('express');
const auth = require('../middleware/auth');
const Project = require('../models/Project');
const Task = require('../models/Task');

const router = express.Router();

router.post('/addProject', auth, async (req, res)=>{
    const {name, description} = req.body;

    try{
        const newProject = new Project({name, description, user: req.user.id});
        const project = await newProject.save();
        res.json(project);

    }catch(err){
        res.status(500).send('Server Error');
    }
});

router.get('/projects', auth, async (req, res)=>{
    try{
        const projects = await Project.find({user: req.user.id});
        res.json(projects);

    }catch(err){
        res.status(500).send('Server Error');
    }


});

router.post('/deleteProject', auth, async (req, res)=>{
    const {id} = req.body;

    try{
        const project = await Project.findById(id)
        if(!project){
            res.status(404).send('No project found');
        }
        await Task.deleteMany({ project: id });

        
        await project.deleteOne(); 
        res.status(200).send({ id: project._id });

    }catch(err){
        res.status(500).send('Server Error');
    }
});

router.post('/:projectId/editProject', auth, async (req, res)=>{
    const {name, description}= req.body;
    try{
        const project = await Project.findById(req.params.projectId);

        project.name=name
        project.description= description
        
        await project.save();
        res.status(200).send(project);

    }catch(err){
        res.status(500).send('Internal server error')
    }

})

module.exports = router;

