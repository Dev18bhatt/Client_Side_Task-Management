import { Link } from 'react-router-dom';
import './HomePage.css'; // Ensure this file exists
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Headers/Header';

function HomePage() {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);


    useEffect(() => {
        getAllTasks();

    }, []);


    function getAllTasks() {
        fetch(`http://localhost:5000/getAllTask`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log("Fetched tasks:", data.allTask);
                setTasks(data.allTask);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    function deleteTask(taskId) {
        console.log('task id that I am parsing is', taskId);
        fetch(`http://localhost:5000/deleteTask/${taskId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((response) => {
                console.log(response);
                if (!response.ok) {
                    throw new Error('Failed to delete task');
                }
                return response.json();
            })
            .then((data) => {
                console.log("Task deleted:", data);
                // Update the tasks state to remove the deleted task
                setTasks(tasks.filter(task => task._id === taskId));
                navigate('/deletetask');


            })
            .catch((error) => {
                console.error("Error deleting task:", error);
            });
    }
    return (
        <div className="homepage-container">
            <Header />

            <div className="task-cards">
                {Array.isArray(tasks) && tasks.length > 0 ? (
                    tasks.map((task) => (
                        <div
                            className={`task-card ${task.status.toLowerCase().replace(" ", "-")}`}
                            key={task._id}
                        >
                            <h2>{task.title}</h2>
                            <p>{task.description}</p>
                            <p>{task.status}</p>
                            {/* <Link to={`/updatetask/${task._id}`} className="view-button">Update Task</Link> */}
                            <button
                                className="update-button"
                                onClick={() => navigate(`/updatetask/${task._id}`)}
                            >
                                Update Task
                            </button>
                            <button
                                className="delete-button"
                                onClick={() => deleteTask(task._id)}
                            >
                                Delete Task
                            </button>

                        </div>
                    ))
                ) : (
                    <h1 className="noTask">No Task Created Yet...</h1>
                )}
            </div>
        </div>
    );
}

export default HomePage;
