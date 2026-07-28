import { useEffect, useState } from "react";
import { getTasks } from "../api/task.api";
import TaskCard from "../components/TaskCard";
import { useNavigate } from "react-router-dom";
function Dashboard() {
const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

useEffect(() => {

    const loadTasks = async () => {

        try {

            const response = await getTasks();

            console.log(response.data);

            setTasks(response.data.tasks);

        } catch (error) {

            setError(
                error.response?.data?.message || "Failed to load tasks"
            );

        } finally {

            setLoading(false);

        }

    };

    loadTasks();

}, []);

    if (loading) {

        return <h2>Loading...</h2>;

    }

    if (error) {

        return <h2>{error}</h2>;

    }

    if (!Array.isArray(tasks)) {

        return <h2>Invalid data received from server</h2>;

    }


    return (

    <div>

        <h1>My Tasks</h1>

        <button onClick={() => navigate("/tasks/new")}>
            Add Task
        </button>


        {
            tasks.length === 0 ? (

                <h2>No Tasks Yet</h2>

            ) : (

                tasks.map((task) => (

                    <TaskCard
                        key={task._id}
                        task={task}
                    />

                ))

            )
        }


    </div>

);
}

export default Dashboard;