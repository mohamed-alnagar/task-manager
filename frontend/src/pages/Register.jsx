import { useState } from "react";
import { registerUser } from "../api/auth.api";
import { useNavigate } from "react-router-dom";


function Register(){

    const navigate = useNavigate();


    const [formData,setFormData] = useState({
        name:"",
        email:"",
        password:""
    });


    const [error,setError] = useState("");


    const handleChange = (e)=>{

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async(e)=>{

        e.preventDefault();

        try{

            await registerUser(formData);

            navigate("/login");


        }catch(error){

    console.log(error);

    setError(
        error.response?.data?.message || error.message
    );

}

    };


    return (

        <div>

            <h1>Register</h1>


            {error && <p>{error}</p>}


            <form onSubmit={handleSubmit}>


                <input
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                />


                <input
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />


                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                />


                <button>
                    Register
                </button>


            </form>


        </div>

    );

}


export default Register;