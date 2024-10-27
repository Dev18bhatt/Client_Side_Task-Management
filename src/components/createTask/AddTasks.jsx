import { useState } from "react";
import '../createTask/addTask.css';
import { useNavigate } from "react-router-dom";

export default function AddTasks() {
    const navigate = useNavigate();
    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        deadline: "",
        created_by: "",
        status: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData({
            ...taskData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Task Data:", taskData);
        fetch('http://localhost:5000/addTask', {
            method: 'POST',
            body: JSON.stringify(taskData),
            headers: {
                "Content-Type": "application/json",  // Set Content-Type
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }
        ).then((response) => response.json())
            .then((data) => {
                console.log(data);
                navigate("/home")
            })
            .catch((err) => {
                console.log(err);
            })
    };

    return (
        <>
            <br />
            <br />
            <br />
            <div className="form-container">
                <h1>Add New Task</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Title:
                        <input
                            type="text"
                            name="title"
                            value={taskData.title}
                            onChange={handleChange}
                            placeholder="Enter task title"
                            required
                        />
                    </label>
                    <label>
                        Description:
                        <textarea
                            name="description"
                            value={taskData.description}
                            onChange={handleChange}
                            placeholder="Enter task description"
                            required
                        />
                    </label>
                    <label>
                        Deadline:
                        <input
                            type="date"
                            name="deadline"
                            value={taskData.deadline}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Status:
                        <select
                            name="status"
                            value={taskData.status}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Status</option>
                            <option value="Not Started">Not Started</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </label>
                    <label>
                        Created By:
                        <input
                            type="text"
                            name="created_by" // Change this to "created_by"
                            value={taskData.created_by}
                            onChange={handleChange}
                            placeholder="Enter creator's name"
                            required
                        />
                    </label>
                    <button type="submit">Add Task</button>
                </form>
            </div>

        </>
    );
}
