const mongoose = require('mongoose');

const Task = require('../models/taskModel');

const uri = process.env.URI;


const getAllTasks = async function(_, res) {
    try {
        await mongoose.connect(uri);
        console.log ('db connected');

        const tasks = await Task.find({ });
        console.log(tasks);
        res.json(tasks);
    } catch(error) {
        console.error('An error occurred:', error.message);
    } finally{
        await mongoose.disconnect();
        console.log('db disconnected');
    }
}

const getSingleTask = async function(req, res) {
    const id = req.params.id;

    try {
        await mongoose.connect(uri);
        console.log ('db connected');

        const task = await Task.findById(id);
        console.log(task);
        res.json(task);
    } catch(error) {
        console.error('An error occurred:', error.message);
    } finally{
        await mongoose.disconnect();
        console.log('db disconnected');
    }
}

const postTask = async function(req, res) {
    const { name, description, due } = req.body;

    try {
        await mongoose.connect(uri);
        console.log ('db connected');

        const task = await Task.create({ name, description, due });
        console.log(task);
        res.json(task);
    } catch(error) {
        console.error('An error occurred:', error.message);
    } finally{
        await mongoose.disconnect();
        console.log('db disconnected');
    }
}

const updateTask = async function(req, res) {
    const id = req.params.id;
    const { name, description, due } = req.body;

    try {
        await mongoose.connect(uri);
        console.log ('db connected');

        const task = await Task.findOneAndUpdate({ _id: id}, { name, description, due });
        console.log(task);
        res.json(task);
    } catch(error) {
        console.error('An error occurred:', error.message);
    } finally{
        await mongoose.disconnect();
        console.log('db disconnected');
    }
}

const deleteTask = async function(req, res) {
    const id = req.params.id;

    try {
        await mongoose.connect(uri);
        console.log ('db connected');

        const task = await Task.findOneAndDelete({ _id: id});
        console.log(task);
        res.json(task);
    } catch(error) {
        console.error('An error occurred:', error.message);
    } finally{
        await mongoose.disconnect();
        console.log('db disconnected');
    }
}

module.exports = { getAllTasks, getSingleTask, postTask, updateTask, deleteTask }; 