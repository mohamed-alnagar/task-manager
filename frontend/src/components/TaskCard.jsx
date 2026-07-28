import { deleteTask } from "../api/task.api";
import { useNavigate } from "react-router-dom";

function TaskCard({task, onDelete}){
const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/tasks/edit/${task._id}`);
    };
    const handleDelete = async()=>{

        await deleteTask(task._id);

        onDelete(task._id);

    };


    return (

        <div>

            <h3>{task.title}</h3>

            <p>
                {task.description}
            </p>


            <p>
                Status: {task.status}
            </p>


            <p>
                Priority: {task.priority}
            </p>


            <p>
                Due Date: {task.dueDate}
            </p>
            <button
                onClick={handleEdit}
            >
                Edit
            </button>


            <button onClick={handleDelete}>
                Delete
            </button>


        </div>

    );

}


export default TaskCard;