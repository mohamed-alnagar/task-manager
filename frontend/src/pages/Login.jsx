import { useState } from "react";
import { loginUser } from "../api/auth.api";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";


function Login(){

    const navigate = useNavigate();

    const { login } = useAuth();


    const [formData,setFormData] = useState({
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

            const response = await loginUser(formData);


            const { token, user } = response.data;


            login(user, token);


            navigate("/");


        }catch(error){

            setError(
                error.response?.data?.message || "Login failed"
            );

        }

    };


    return (

        <div>

            <h1>Login</h1>


            {error && <p>{error}</p>}


            <form onSubmit={handleSubmit}>


                <input
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />


                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />


                <button>
                    Login
                </button>


            </form>


        </div>

    );

}


export default Login;