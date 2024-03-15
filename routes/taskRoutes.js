const express = require('express');
const router = express.Router();

const { getAllTasks, getSingleTask, postTask, updateTask, deleteTask } = require('../controllers/taskController');

// Access: public 
router.route('/')
.get(getAllTasks)
.post(postTask);

router.route('/:id')
.get(getSingleTask)
.put(updateTask)
.delete(deleteTask);

module.exports = router;