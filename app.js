const express = require('express');
const dotenv = require('dotenv').config();

const taskRouter = require('./routes/taskRoutes');
const userRouter = require('./routes/userRoutes');
const verify = require('./middlewares/verify');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use('/tasks', verify, taskRouter);
app.use('/user', userRouter);

app.get('/', (req, res) => {
    res.json({ message: "Welcome!!" })
})

app.listen(port, () => {
    console.log(`listening on the ${port} port...`)
});

