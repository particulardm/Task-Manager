const express = require('express');
const dotenv = require('dotenv').config();

const taskRouter = require('./routes/taskRoutes');
const userRouter = require('./routes/userRoutes');
const { connectDB, disconnectDB } = require('./config/db');
const verify = require('./config/verify');

const app = express();
const port = process.env.PORT || 3001;

connectDB();

app.use(express.json());
app.use('/tasks', verify, taskRouter);
app.use('/user', userRouter);

app.get('/', (_, res) => {
    res.json({ message: "Welcome!!" })
})

const server = app.listen(port, () => {
    console.log(`listening on the ${port} port...`)
});


process.on('SIGINT', () => disconnectDB(server));