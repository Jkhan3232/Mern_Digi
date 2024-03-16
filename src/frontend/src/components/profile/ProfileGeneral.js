import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ProfileGeneral = () => {
  const [userInfo, setUserInfo] = useState({
    username: 'example_user',
    email: 'example@example.com',
    contact: '123-456-7890',
    name: 'John Doe'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfo({
      ...userInfo,
      [name]: value
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    console.log('Updated User Info:', userInfo);
    // Here you can send the updated userInfo to your backend or update it locally.
  };

  return (
    <Box sx={{ height: '55vh', overflowY: 'auto', '&::-webkit-scrollbar': { width: '6px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(0, 0, 0, 0.2)', borderRadius: '10px' }, '&::-webkit-scrollbar-thumb:hover': { backgroundColor: 'rgba(0, 0, 0, 0.4)' }, '&::-webkit-scrollbar-track': { backgroundColor: 'transparent' } }}>
      <TextField
        id="username"
        label="Username"
        name="username"
        value={userInfo.username}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        disabled={!isEditing}
      />
      <TextField
        id="email"
        label="Email"
        name="email"
        value={userInfo.email}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        disabled={!isEditing}
      />
      <TextField
        id="contact"
        label="Contact"
        name="contact"
        value={userInfo.contact}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        disabled={!isEditing}
      />
      <TextField
        id="name"
        label="Name"
        name="name"
        value={userInfo.name}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        disabled={!isEditing}
      />
      <Box sx={{display: "flex", justifyContent: "flex-end", marginTop: "10px"}}>
        {isEditing ? (
        <Button onClick={handleSaveClick} variant="contained" color="primary">
          Save
        </Button>
      ) : (
        <Button onClick={handleEditClick} variant="contained" color="primary">
          Edit
        </Button>
      )}
      </Box>
    </Box>
  );
};

export default ProfileGeneral;
 