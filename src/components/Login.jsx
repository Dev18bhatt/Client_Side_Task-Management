import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function Login() {
    const navigate = useNavigate();
    const loggedInData = useContext(UserContext); // Use UserContext as needed

    const [userCred, setUserCred] = useState({
        username: "",
        password: ""
    });

    const [message, setMessage] = useState({
        type: "invisible-msg",
        text: ""
    });

    function handleInput(event) {
        setUserCred(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    useEffect(() => {
        console.log(loggedInData);
    }, [loggedInData]); // Add loggedInData to the dependency array

    function handleSubmit(event) {
        event.preventDefault();

        fetch("http://localhost:5000/login", {
            method: "POST",
            body: JSON.stringify(userCred),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                // Check the response status before parsing JSON
                if (response.status === 404) {
                    setMessage({ type: "Error", text: "Username does not exist" });
                    throw new Error('User not found');
                } else if (response.status === 403) {
                    setMessage({ type: "Error", text: "Incorrect password" });
                    throw new Error('Incorrect password');
                } else if (response.ok) { // Check for a successful response
                    return response.json(); // Parse JSON if response is okay
                } else {
                    throw new Error('Unexpected error');
                }
            })
            .then(data => {
                if (data && data.token) {
                    localStorage.setItem("userData", JSON.stringify(data)); // Stringify the data
                    localStorage.setItem("token", data.token);
                    loggedInData.setLogUser(data);
                    console.log('this is value set', loggedInData.loggedUser);
                    console.log(localStorage.getItem('userData'));
                    navigate('/home');
                }
            })
            .catch(err => {
                console.error(err);
                setMessage({ type: "Error", text: "An unexpected error occurred. Please try again." });
            })
            .finally(() => {
                setTimeout(() => {
                    setMessage({ type: "invisible-msg", text: "" });
                }, 5000);
            });
    }

    return (
        <section className='Container'>
            <form className='form' onSubmit={handleSubmit}>
                <input
                    className="inp"
                    required
                    type='text'
                    onChange={handleInput}
                    name='username'
                    value={userCred.username}
                    placeholder='Enter Username'
                />
                <input
                    className="inp"
                    required
                    type='password'
                    onChange={handleInput}
                    maxLength={8}
                    name='password'
                    value={userCred.password}
                    placeholder='Enter Password'
                />
                <button className="btn" type="submit">Login</button>
                <p>Not Registered? <Link to="/register">Sign Up</Link></p>

                {/* Show message with conditional styling */}
                <p className={message.type}>{message.text}</p>
            </form>
        </section>
    );
}
