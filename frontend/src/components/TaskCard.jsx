function TaskCard({ task }) {

    return (

        <div
            style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px"
            }}
        >

            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>Status: {task.status}</p>

            <p>Priority: {task.priority}</p>

            <p>Due: {task.dueDate}</p>

        </div>

    );

}

export default TaskCard;