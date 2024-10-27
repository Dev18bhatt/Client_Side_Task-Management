import { useState } from 'react';
import { Link } from 'react-router-dom';
export default function Register() {
    const [userDetails, setUserDetails] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState({
        type: "invisible-msg",
        text: ""
    });

    function handleInput(event) {
        setUserDetails(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(userDetails);

        fetch("http://localhost:5000/register", {
            method: "POST",
            body: JSON.stringify(userDetails),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                // Check if the response is JSON before parsing
                if (response.ok) {
                    return response.json();  // Parse JSON once here
                } else {
                    throw new Error(`Failed to register. Status: ${response.status}`);
                }
            })
            .then(data => {
                setMessage({ type: "Success", text: data.message });
                setUserDetails({
                    username: "",  // Ensure consistency with the original state
                    email: "",
                    password: ""
                });
                setTimeout(() => {
                    setMessage({ type: "invisible-msg", text: "" });
                }, 5000);
            })
            .catch(err => {
                console.error(err);
                setMessage({ type: "Error", text: "Registration failed. Please try again." });
                setTimeout(() => {
                    setMessage({ type: "invisible-msg", text: "" });
                }, 5000);
            });
    }



    return (
        <section className='Container'>
            <form className='form'>
                <input className="inp" required type='text' onChange={handleInput} name='username' placeholder='Enter Name' value={userDetails.username} />
                <input className="inp" required type='text' onChange={handleInput} name='email' placeholder='Enter email' value={userDetails.email} />
                <input className="inp" required type='text' onChange={handleInput} maxLength={8} name='password' value={userDetails.password} placeholder='Enter Password' />

                <button className="btn" onClick={handleSubmit}>Join</button>
                <p>Already Registered ?  <Link to="/login">Login</Link> </p>

                <p className={message.type}> {message.text}</p>


            </form>




        </section>
    )
}
