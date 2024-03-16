import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ProfilePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangeCurrentPassword = (event) => {
    setCurrentPassword(event.target.value);
  };

  const handleChangeNewPassword = (event) => {
    setNewPassword(event.target.value);
  };

  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate if the new password matches the confirmed password
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }
    // You can add more complex validation logic here

    // Clear the form fields after submission
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setErrorMessage('');
    // Handle password change submission here
    console.log('Current Password:', currentPassword);
    console.log('New Password:', newPassword);
    console.log('Confirm Password:', confirmPassword);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <TextField
          id="current-password"
          label="Current Password"
          type="password"
          value={currentPassword}
          onChange={handleChangeCurrentPassword}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          id="new-password"
          label="New Password"
          type="password"
          value={newPassword}
          onChange={handleChangeNewPassword}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          id="confirm-password"
          label="Confirm New Password"
          type="password"
          value={confirmPassword}
          onChange={handleChangeConfirmPassword}
          fullWidth
          margin="normal"
          required
        />
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        <Box sx={{display: "flex", justifyContent: "flex-end", marginTop: "10px"}}><Button type="submit" variant="contained" color="primary">
          Change Password
        </Button></Box>
      </form>
    </Box>
  );
};

export default ProfilePassword;
