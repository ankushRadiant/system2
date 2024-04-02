const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const connectDB = require('./config/database');
const { PORT } = require("./config/keys");
const cors = require('cors');

const app = express();
const port =  PORT || 2000;





app.use(express.json());
connectDB();


app.get('/', (req,res)=>{
    res.send({message:'Welcome to Quiz System Server'})
})

const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes);

const quizRoutes = require('./routes/quizRoutes');
app.use('/quiz', quizRoutes);


const roleRoutes = require('./routes/roleRoutes');
app.use('/role', roleRoutes);


const userRoles = require('./routes/userRoleRoutes');
app.use('/user-role', userRoles);

const permissionRoutes = require('./routes/permissionRoutes');
app.use('/permission', permissionRoutes);

const quizAttemptRoutes = require('./routes/quizAttemptRoutes');
app.use('/quiz-attempt', quizAttemptRoutes);


app.listen(port, (req, res) => {
    console.log(`Server is running on ports ${port}`);
});
