const express = require('express');
const cors = require('cors');
const app =express();
const authRoutes=require('./routes/auth.routes')
const errorHandler = require("./middleware/error.middleware");


// middlewares 
app.use(cors());
app.use(express.json())
const taskRoutes = require("./routes/task.routes");
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get('/',(req,res)=>{
    res.json({
        message:"Task Manager API is running..."
    })
})

app.use(errorHandler);
module.exports = app;