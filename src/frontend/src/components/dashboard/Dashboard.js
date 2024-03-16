import React from "react";
import Box from "@mui/system/Box";
import Navbar from "../navbar/Navbar";

const Dashboard = () => {
  return (
    <>
    <Box sx={{height: "100vh"}}>
    <Navbar sx={{height:"12%"}}/>
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        background: "linear-gradient(#2A00B7, #42006C)",
        // flexDirection: "column",
        textAlign: "left",
        alignItems: "center",
        height: "87.9%",
      }}
    >
        
      {/* <Box sx={{display: "flex",
        justifyContent: "center",alignItems: "center",}}> */}
        <p
          style={{
            fontSize: "40px",
            color: "white",
            textAlign: "left",
            
          }}
        >
          Welcome User.
        </p>
      {/* </Box> */}
    </Box>
    </Box>
    </>
  );
};

export default Dashboard;
