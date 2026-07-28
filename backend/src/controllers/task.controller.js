const Task = require("../models/task.model");


const createTask = async (req, res) => {

    try {

        const {
            title,
            description,
            status,
            priority,
            dueDate
        } = req.body;


        const task = await Task.create({

            title,
            description,
            status,
            priority,
            dueDate,

            user: req.user._id

        });


        res.status(201).json({

            message: "Task created successfully",

            task

        });


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
const getTasks = async (req,res)=>{

    try{

        const {
            search,
            status,
            priority,
            page = 1,
            limit = 10
        } = req.query;


        let filter = {

            user:req.user._id

        };


        // Search by title

        if(search){

            filter.title = {
                $regex: search,
                $options:"i"
            };

        }


        // Filter by status

        if(status){

            filter.status = status;

        }


        // Filter by priority

        if(priority){

            filter.priority = priority;

        }


        // Pagination settings
        const pageNumber = parseInt(page, 10) || 1;
        const limitNumber = parseInt(limit, 10) || 10;
        const skip = (pageNumber - 1) * limitNumber;

        const tasks = await Task.find(filter).skip(skip).limit(limitNumber);

        const totalDocs = await Task.countDocuments(filter);
        const totalPages = Math.ceil(totalDocs / limitNumber);

        const doneDocs = await Task.countDocuments({ ...filter, status: "Done" });
        const openDocs = totalDocs - doneDocs;

        res.status(200).json({

            count: tasks.length,

            tasks,
            
            currentPage: pageNumber,
            
            totalPages,
            
            stats: {
                total: totalDocs,
                done: doneDocs,
                open: openDocs
            }

        });



    }catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};
const updateTask = async(req,res)=>{

    try{

        const task = await Task.findOne({
            _id:req.params.id,
            user:req.user._id
        });


        if(!task){

            return res.status(404).json({
                message:"Task not found"
            });

        }


        const {
            title,
            description,
            status,
            priority,
            dueDate
        } = req.body;



        task.title = title ?? task.title;

        task.description = description ?? task.description;

        task.status = status ?? task.status;

        task.priority = priority ?? task.priority;

        task.dueDate = dueDate ?? task.dueDate;



        await task.save();



        res.status(200).json({

            message:"Task updated successfully",

            task

        });



    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};
const deleteTask = async(req,res)=>{

    try{

        const task = await Task.findOne({
            _id:req.params.id,
            user:req.user._id
        });


        if(!task){

            return res.status(404).json({
                message:"Task not found"
            });

        }


        await task.deleteOne();


        res.status(200).json({

            message:"Task deleted successfully"

        });



    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};
module.exports = {
    createTask ,getTasks ,updateTask ,deleteTask
};