import React from 'react'
import Box from '@mui/system/Box';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Register = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [fullName, setFullName] = useState();
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState('');

    const handleLoginClick = () => {
        navigate("/login");
    }

    const handleSignUp = async () => {
        console.log(username);
        console.log(email);
        console.log(fullName);
        console.log(phone);
        console.log(password);
        // navigate("/todo");
        try {
          const response = await axios.post('http://localhost:9000/api/v1/users/register', {
                username,
                email,
                fullName,
                phone,
                password
            });
            setMessage(response);
            navigate("/todo");
        } catch (error) {
            setMessage('An error occurred. Please try again.');
      }
    }

    const handleForm = (event) => {
        event.preventDefault();
    }

  return (
    
    <>
    <Box sx={{display: "flex",
    justifyContent: "center",
    background: 'linear-gradient(#2A00B7, #42006C)',
    // flexDirection: "column",
    textAlign: "left",
    alignItems: "center",
    height: "100vh",

    }}>
      
      
      <div className="w-full max-w-xs">
      <form onSubmit={handleForm} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Username
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" onChange={e=>setUsername(e.target.value)}/>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email Id
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email Id" onChange={e=>setEmail(e.target.value)}/>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
          Full Name
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fullName" type="text" placeholder="Full Name" onChange={e=>setFullName(e.target.value)}/>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
          Phone
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="text" placeholder="+91 XXXXX-XXXXX" onChange={e=>setPhone(e.target.value)}/>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" onChange={e=>setPassword(e.target.value)}/>
          {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            Forgot Password?
          </a> */}
          {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline" type="button" onClick={handleSignUp}>
            Sign Up
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline" type="button" onClick={handleLoginClick}>
            Login
          </button>
        </div>
      </form>
      <p className="text-center text-xs" style={{color: "white"}}>
        &copy;2024 All rights reserved.
      </p>
      {message && <p>{message}</p>} {/* Display the message */}
    </div>
    </Box>
    </>
  )
}

export default Register
