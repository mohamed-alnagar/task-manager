import { deleteTask } from "../api/task.api";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, ChevronDown } from "lucide-react";
import { useState } from "react";
import "../styles/taskcard.css";


const PRIORITY_CLASS = {
    High: "priority-high",
    Medium: "priority-medium",
    Low: "priority-low",
};


function TaskCard({ task, onDelete }) {

    const navigate = useNavigate();

    const [expanded, setExpanded] = useState(false);



    const handleDelete = async () => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this task?"
        );


        if (!confirmDelete) {
            return;
        }


        try {

            await deleteTask(task._id);

            onDelete(task._id);


        } catch (error) {

            console.log(error);

        }

    };



    const descriptionLimit = 120;

    const isLongDescription =
        (task.description?.length || 0) > descriptionLimit;



    return (

        <div 
            className={`task-card ${
                PRIORITY_CLASS[task.priority] || ""
            }`}
        >


            <div className="task-card-bar" />



            <div className="task-card-body">


                <div className="task-card-top">


                    <h3>
                        {task.title}
                    </h3>


                    


                </div>





                <div className="task-description">

                    {expanded || !isLongDescription
                        ? task.description
                        : `${task.description?.slice(0, descriptionLimit).replace(/\s+\S*$/, "")}...`}

                </div>





                {
                    isLongDescription && (

                        <button

                            className="read-more-btn"

                            onClick={() =>
                                setExpanded(!expanded)
                            }

                        >


                            {
                                expanded
                                ?
                                "Read less"
                                :
                                "Read more"
                            }


                            <ChevronDown

                                size={14}

                                className={
                                    expanded
                                    ?
                                    "rotate-icon"
                                    :
                                    ""
                                }

                            />


                        </button>


                    )
                }







                <div className="task-meta">


                    <span
                        className={`status-pill status-${task.status
                            ?.replace(/\s+/g, "-")
                            .toLowerCase()}`}
                    >

                        {task.status}

                    </span>





                    <span
                        className={
                            `priority-pill ${
                                PRIORITY_CLASS[task.priority] || ""
                            }`
                        }
                    >

                        {task.priority} priority

                    </span>





                    <span className="due-date">

                        DUE {task.dueDate?.slice(0,10)}

                    </span>


                </div>







                <div className="task-actions">


                    <button

                        onClick={() =>
                            navigate(
                                `/tasks/edit/${task._id}`
                            )
                        }

                    >

                        <Pencil size={13}/>

                        Edit

                    </button>






                    <button

                        className="delete-btn"

                        onClick={handleDelete}

                    >

                        <Trash2 size={13}/>

                        Delete


                    </button>



                </div>




            </div>



        </div>


    );

}


export default TaskCard;