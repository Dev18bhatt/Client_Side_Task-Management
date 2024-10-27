import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import './Header.css'; // Import the CSS file

export default function Header() {
    const loggedInData = useContext(UserContext);
    const navigate = useNavigate();

    // function Logout() {
    //     localStorage.removeItem("userData");
    //     loggedInData.setLogUser(null);

    // }
    function Logout() {
        localStorage.removeItem("userDate");
        localStorage.removeItem("token");
        loggedInData.loggedUser = null;
        console.log(localStorage);
        navigate("/login");

    }


    return (
        <div className="header-container">
            <h1 className="header-title">Task Management</h1>
            <ul className="header-menu">
                {/* <Link to='/addTask' className="view-button">Add Task</Link> */}
                <li onClick={() => {
                    navigate('/addTask')
                }}>Add Task</li>
                <li onClick={() => {
                    Logout();
                }}>Logout</li>
            </ul>
        </div>
    )
}
