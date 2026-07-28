import { useEffect, useState } from "react";
import { createTask, getTask, updateTask } from "../api/task.api";
import { useNavigate, useParams } from "react-router-dom";


function TaskForm(){

    const navigate = useNavigate();

    const { id } = useParams();

    const isEditMode = Boolean(id);



    const [formData, setFormData] = useState({

        title: "",
        description: "",
        status: "To Do",
        priority: "Medium",
        dueDate: ""

    });



    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);




    useEffect(() => {


        const fetchTask = async () => {


            try {


                const response = await getTask(id);


                setFormData({

                    title: response.data.title,
                    description: response.data.description,
                    status: response.data.status,
                    priority: response.data.priority,
                    dueDate: response.data.dueDate?.slice(0,10)

                });



            } catch (error) {


                setError(
                    error.response?.data?.message ||
                    "Failed to load task"
                );


            }


        };



        if(isEditMode){

            fetchTask();

        }


    }, [id, isEditMode]);





    const handleChange = (e) => {


        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });


    };





    const handleSubmit = async(e) => {


        e.preventDefault();


        try {


            setLoading(true);



            if(isEditMode){


                await updateTask(id, formData);


            }else{


                await createTask(formData);


            }



            navigate("/");



        } catch(error){


            setError(

                error.response?.data?.message ||
                "Failed to save task"

            );



        } finally {


            setLoading(false);


        }


    };




    return (

        <div>


            <h1>

                {isEditMode ? "Edit Task" : "Create Task"}

            </h1>



            {error && <p>{error}</p>}




            <form onSubmit={handleSubmit}>


                <input

                    type="text"

                    name="title"

                    placeholder="Task title"

                    value={formData.title}

                    onChange={handleChange}

                />



                <textarea

                    name="description"

                    placeholder="Description"

                    value={formData.description}

                    onChange={handleChange}

                />




                <select

                    name="status"

                    value={formData.status}

                    onChange={handleChange}

                >

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

                    name="priority"

                    value={formData.priority}

                    onChange={handleChange}

                >


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





                <input

                    type="date"

                    name="dueDate"

                    value={formData.dueDate}

                    onChange={handleChange}

                />





                <button disabled={loading}>


                    {
                        loading
                        ?
                        "Saving..."
                        :
                        isEditMode
                        ?
                        "Update Task"
                        :
                        "Create Task"
                    }



                </button>



            </form>



        </div>

    );

}


export default TaskForm;