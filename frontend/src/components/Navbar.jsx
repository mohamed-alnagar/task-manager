import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


function Navbar(){

    const navigate = useNavigate();

    const { user, logout } = useAuth();


    if(!user){

        return null;

    }


    const handleLogout = () => {

        logout();

        navigate("/login");

    };


    return (

        <nav>

            <h2>
                Task Manager
            </h2>


            <button onClick={handleLogout}>
                Logout
            </button>

        </nav>

    );

}


export default Navbar;