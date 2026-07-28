import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import { BrowserRouter } from "react-router-dom";
import TaskForm from "../pages/TaskForm";
import ProtectedRoute from "../components/ProtectedRoute";


function AppRoutes(){

    return (
        <BrowserRouter>
        <Routes>

            <Route
                path="/login"
                element={<Login />}
            />


            <Route
                path="/register"
                element={<Register />}
            />


            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/tasks/new"
                element={
                    <ProtectedRoute>
                        <TaskForm />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/tasks/edit/:id"
                element={
                    <ProtectedRoute>
                        <TaskForm />
                    </ProtectedRoute>
                    }
            />
            <Route
                path="/tasks/edit/:id"
                element={
                    <ProtectedRoute>
                        <TaskForm/>
                    </ProtectedRoute>
                }
            />


        </Routes>
        
        </BrowserRouter>

        

    );

}


export default AppRoutes;