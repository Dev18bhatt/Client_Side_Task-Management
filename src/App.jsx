
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Register from './components/Register'
import Login from './components/Login';
import Private from './components/Private';
import { useState, } from 'react';

import { UserContext } from './context/UserContext';
import HomePage from './components/Home/HomePage';
import AddTasks from './components/createTask/AddTasks';
import DeletePage from './components/Home/DeletePage';
import UpdateTask from './components/UpdatePage/UpdateTask';
function App() {

  const [loggedUser, setLogUser] = useState(localStorage.getItem("userData"));


  // useEffect(() => {
  //   const user = localStorage.getItem("userData");
  //   console.log('printing the logged user : ', loggedUser);
  //   if (user) {
  //     setLogUser(JSON.parse(user));
  //   }
  // }, [navigate]); // Only run this effect on mount and when navigate changes


  return (

    <UserContext.Provider value={{ loggedUser, setLogUser }}>

      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Private Components={HomePage} />} />
        <Route path='/addTask' element={<Private Components={AddTasks} />} />
        <Route path='/deletetask' element={<Private Components={DeletePage} />} />
        <Route path="/updatetask/:id" element={<Private Components={UpdateTask} />} />


      </Routes>
    </UserContext.Provider>



  )
}

export default App
