const express = require('express');
const cors = require('cors');
const app =express();

// middlewares 
app.use(cors());
app.use(express.json())

app.get('/',(req,res)=>{
    res.json({
        message:"Task Manager API is running..."
    })
})
module.exports = app;