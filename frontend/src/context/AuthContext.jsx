import { useState } from "react";
import { AuthContext } from "./auth.context";


export const AuthProvider = ({children}) => {

    const [user,setUser] = useState(null);


    const login = (userData, token) => {

        setUser(userData);

        localStorage.setItem("token", token);

    };


    const logout = () => {

        setUser(null);

        localStorage.removeItem("token");

    };


    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );

};