import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ProfileSocialLinks = () => {
  const [socialLinks, setSocialLinks] = useState({
    github: '',
    twitter: '',
    instagram: '',
    linkedin: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSocialLinks((prevLinks) => ({
      ...prevLinks,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can handle submission logic here, like sending data to the backend
    console.log('Social Links:', socialLinks);
  };

  return (
    <Box sx={{ height: '55vh', overflowY: 'auto', '&::-webkit-scrollbar': { width: '6px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(0, 0, 0, 0.2)', borderRadius: '10px' }, '&::-webkit-scrollbar-thumb:hover': { backgroundColor: 'rgba(0, 0, 0, 0.4)' }, '&::-webkit-scrollbar-track': { backgroundColor: 'transparent' } }}>
      {/* <h2>Social Media Links</h2> */}
      <form onSubmit={handleSubmit}>
        <TextField
          id="github"
          name="github"
          label="Github"
          value={socialLinks.github}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          id="twitter"
          name="twitter"
          label="Twitter"
          value={socialLinks.twitter}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          id="instagram"
          name="instagram"
          label="Instagram"
          value={socialLinks.instagram}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          id="linkedin"
          name="linkedin"
          label="LinkedIn"
          value={socialLinks.linkedin}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ProfileSocialLinks;
