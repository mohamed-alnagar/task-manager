const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const register = async(req,res)=>{

    try{

        const {
            name,
            email,
            password
        } = req.body;


        const existingUser = await User.findOne({email});


        if(existingUser){
            return res.status(400).json({
                message:"Email already exists"
            });
        }


        const hashedPassword = await bcrypt.hash(password,10);


        const user = await User.create({

            name,
            email,
            password:hashedPassword

        });


        res.status(201).json({

            message:"User registered successfully",

            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }

        });


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

}

// Login

const login = async(req,res)=>{

    try{

        const {
            email,
            password
        } = req.body;



        const user = await User.findOne({email});
        

        if(!user){

            return res.status(404).json({
                message:"Invalid email or password"
            });

        }



        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );



        if(!isPasswordCorrect){

            return res.status(400).json({
                message:"Invalid email or password"
            });

        }



        const token = generateToken(user._id);



        res.status(200).json({

            message:"Login successful",

            token,

            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }

        });


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};



module.exports={
    register , login
};