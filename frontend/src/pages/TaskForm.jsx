import { useEffect, useState } from "react";
import { createTask, getTask, updateTask } from "../api/task.api";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/taskForm.css";

function TaskForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "To Do",
        priority: "Medium",
        dueDate: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await getTask(id);

                setFormData({
                    title: response.data.title || "",
                    description: response.data.description || "",
                    status: response.data.status || "To Do",
                    priority: response.data.priority || "Medium",
                    dueDate: response.data.dueDate?.slice(0, 10) || "",
                });
            } catch (error) {
                setError(
                    error.response?.data?.message || "Failed to load task"
                );
            }
        };

        if (isEditMode) {
            fetchTask();
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        const trimmedTitle = formData.title.trim();
        if (!trimmedTitle) {
            return setError("Task title cannot be empty");
        }
        if (trimmedTitle.length > 100) {
            return setError("Task title cannot exceed 100 characters");
        }
        if (formData.description && formData.description.length > 1000) {
            return setError("Description cannot exceed 1000 characters");
        }
        if (!formData.dueDate) {
            return setError("Please select a due date");
        }
        
        const selectedDate = new Date(formData.dueDate);
        const todayDate = new Date(today);
        if (selectedDate < todayDate) {
            return setError("Due date cannot be in the past");
        }

        try {
            setLoading(true);
            setError(""); // Clear previous errors

            if (isEditMode) {
                await updateTask(id, { ...formData, title: trimmedTitle });
            } else {
                await createTask({ ...formData, title: trimmedTitle });
            }

            navigate("/");
        } catch (error) {
            setError(
                error.response?.data?.message || "Failed to save task"
            );
        } finally {
            setLoading(false);
        }
    };

    const today = new Date().toISOString().split("T")[0];

    return (
        <div className="task-form-container">
            <div className="task-form-card">
                <span className="form-tag">TASK MANAGER</span>
                <h1>{isEditMode ? "Edit task" : "Create task"}</h1>

                {error && <p className="form-error">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Task title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            placeholder="Task description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="To Do">To do</option>
                                <option value="In Progress">In progress</option>
                                <option value="Done">Done</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Priority</label>
                            <select
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Due date</label>
                        <input
                            type="date"
                            name="dueDate"
                            value={formData.dueDate}
                            min={today}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-actions">
                        <button disabled={loading}>
                            {loading
                                ? "Saving..."
                                : isEditMode
                                ? "Update task"
                                : "Create task"}
                        </button>

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => navigate("/")}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TaskForm;