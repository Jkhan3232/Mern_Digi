import React, { useEffect, useState } from "react";
import Box from "@mui/system/Box";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // const [showLoginButton, setShowLoginButton] = useState(false);
  // const [showSignUpButton, setShowSignUpButton] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // setShowLoginButton(true);
      // setShowSignUpButton(true);
      setShowButton(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignUpClick = () => {
    navigate("/register");
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(#2A00B7, #42006C)",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column", // To stack elements vertically
        // padding: '20px',
        color: "#fff",
        // fontSize: "40px"
      }}
    >
      <h1 style={{ fontSize: "40px", padding: "20px" }}>
        UMS - User Management System
      </h1>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mr-4"
          type="button"
          onClick={handleSignUpClick}
          style={{
            // opacity: showSignUpButton ? 1 : 0,
            opacity: showButton ? 1 : 0,
            transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
            transform: showButton ? "translateY(0)" : "translateY(-20px)"
          }}
        >
          Sign Up
        </button>
        {/* {showLoginButton && (   */} 
        {/* done with the help of opacity */}
          <button
            className="login-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleLoginClick}
            style={{
              // opacity: showLoginButton ? 1 : 0,
              opacity: showButton ? 1 : 0,
            transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
            transform: showButton ? "translateY(0)" : "translateY(-20px)" 
          }}
          >
            Login
          </button>
        {/* )} */}
      </div>
    </Box>
  );
};

export default Home;
