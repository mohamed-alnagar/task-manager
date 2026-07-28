import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LogOut } from "lucide-react";
import "../styles/navbar.css";

function Navbar() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    if (!user) {
        return null;
    }

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="navbar-title">
                <span>Task Manager</span>
                <span className="navbar-tag">workspace</span>
            </div>

            <button className="logout-btn" onClick={handleLogout}>
                <LogOut size={14} />
                Logout
            </button>
        </nav>
    );
}

export default Navbar;