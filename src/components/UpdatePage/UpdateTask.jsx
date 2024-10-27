import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../Update.css';

export default function UpdateTask() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        deadline: "",
        status: "Not Started"
    });

    const [loading, setLoading] = useState(true);  // Loading indicator
    const [error, setError] = useState(null);      // Error state

    useEffect(() => {
        fetch(`http://localhost:5000/getTask/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch task data.");
                }
                return response.json();
            })
            .then(data => {
                if (data && data.task) {
                    setTaskData({
                        title: data.task.title || "",
                        description: data.task.description || "",
                        deadline: data.task.deadline ? data.task.deadline.substring(0, 10) : "", // Ensure correct date format
                        status: data.task.status || "Pending"
                    });
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching task:", error);
                setError("Could not load task details.");
                setLoading(false);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedData = {
            task: {
                title: taskData.title,
                description: taskData.description,
                status: taskData.status,
                deadline: taskData.deadline,
            }
        };

        fetch(`http://localhost:5000/updateTask/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(formattedData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to update task.");
                }
                return response.json();
            })
            .then(data => {
                console.log('Task updated successfully:', data);
                navigate('/home');
            })
            .catch(error => {
                console.error("Error updating task:", error);
                setError("Could not update task.");
            });
    };

    if (loading) return <p>Loading task details...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="update-task-container">
            <h1>Update Task</h1>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    value={taskData.title}
                    onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                    required
                />

                <label>Description:</label>
                <textarea
                    value={taskData.description}
                    onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                    required
                />

                <label>Deadline:</label>
                <input
                    type="date"
                    value={taskData.deadline}
                    onChange={(e) => setTaskData({ ...taskData, deadline: e.target.value })}
                />

                <label>Status:</label>
                <select
                    value={taskData.status}
                    onChange={(e) => setTaskData({ ...taskData, status: e.target.value })}
                >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>

                <button type="submit" className="update-button">Update Task</button>
            </form>
        </div>
    );
}
