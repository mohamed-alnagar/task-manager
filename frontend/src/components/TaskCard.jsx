import { deleteTask } from "../api/task.api";
import { useNavigate } from "react-router-dom";

function TaskCard({task, onDelete}){
const navigate = useNavigate();

const handleDelete = async()=>{

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this task?"
    );


    if(!confirmDelete){

        return;

    }


    try{

        await deleteTask(task._id);

        onDelete(task._id);


    }catch(error){

        console.log(error);

    }

};


return (

    <div className="task-card">


        <h3>
            {task.title}
        </h3>


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
            Due Date: {task.dueDate?.slice(0,10)}
        </p>



        <button
            onClick={() => navigate(`/tasks/edit/${task._id}`)}
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