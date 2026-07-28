import { useEffect, useState } from "react";
import { getTasks } from "../api/task.api";
import TaskCard from "../components/TaskCard";
import { useNavigate } from "react-router-dom";
function Dashboard() {
const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filters,setFilters] = useState({

    search:"",
    status:"",
    priority:""

});

useEffect(() => {

    const loadTasks = async () => {

        try {

            const response = await getTasks(filters);

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

}, [filters]);

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
        <input
    placeholder="Search tasks..."
    value={filters.search}
    onChange={(e)=>
        setFilters({
            ...filters,
            search:e.target.value
        })
    }
/>


<select
    value={filters.status}
    onChange={(e)=>
        setFilters({
            ...filters,
            status:e.target.value
        })
    }
>

    <option value="">
        All Status
    </option>

    <option value="To Do">
        To Do
    </option>

    <option value="In Progress">
        In Progress
    </option>

    <option value="Done">
        Done
    </option>

</select>



<select
    value={filters.priority}
    onChange={(e)=>
        setFilters({
            ...filters,
            priority:e.target.value
        })
    }
>

    <option value="">
        All Priority
    </option>


    <option value="Low">
        Low
    </option>


    <option value="Medium">
        Medium
    </option>


    <option value="High">
        High
    </option>


</select>

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
                        onDelete={(id)=>{

                        setTasks(tasks.filter(task => task._id !== id));

                        }}
                    />

                ))

            )
        }


    </div>

);
}

export default Dashboard;