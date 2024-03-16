import React, { useState } from 'react';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';

const ProfileSecurity = () => {
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  const handleTwoFactorAuthChange = () => {
    setTwoFactorAuth((prev) => !prev);
  };

  const handleSaveSettings = () => {
    // You can implement logic to save security settings here
    console.log('Two Factor Authentication:', twoFactorAuth);
    // Additional logic to save other security settings
  };

  return (
    <Box>
      {/* <h2>Security Settings</h2> */}
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={twoFactorAuth} onChange={handleTwoFactorAuthChange} />}
          label="Enable Two-Factor Authentication"
        />
        {/* Add more security settings options here */}
      </FormGroup>
      <Box sx={{display: "flex", justifyContent: "flex-end"}}><Button variant="contained" color="primary" onClick={handleSaveSettings}>
        Save Settings
      </Button></Box>
    </Box>
  );
};

export default ProfileSecurity;
