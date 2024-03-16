import React from "react";
import Box from "@mui/system/Box";
import Navbar from "../navbar/Navbar";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import ProfilePassword from "./ProfilePassword";
import ProfileSecurity from "./ProfileSecurity";
import ProfileSocialLinks from "./ProfileSocialLinks";
import ProfileNotification from "./ProfileNotification";
import ProfileGeneral from "./ProfileGeneral";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`horizontal-tabpanel-${index}`}
      aria-labelledby={`horizontal-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `horizontal-tab-${index}`,
    "aria-controls": `horizontal-tabpanel-${index}`,
  };
}

export default function ProfileWrapper() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ height: "100vh", background: "linear-gradient(#2A00B7, #42006C)" }}
    >
      <Navbar />
      <Box
        sx={{
          display: "flex",
          background: "#fff",
          margin: "2rem",
          padding: "2rem",
          borderRadius: "10px",
          height: "80vh",
          flexDirection: "row", // Change flex direction to row
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginRight: "1rem",
            flexDirection: "column",
            justifyContent: "center",
            flex: "0 0 15%", // Set width to 15%
          }}
        >
          <img
            src="https://static.vecteezy.com/system/resources/previews/002/275/847/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg"
            alt="Profile_photo"
            style={{ width: "120px", height: "120px", borderRadius: "50%" }}
          />
          <br />
          <Typography variant="h6">John Doe</Typography>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            display: "flex",
            flexDirection: "column",
            // alignItems: "center",
            // justifyContent: "center",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Horizontal tabs example"
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              "& .MuiTabs-flexContainer": { justifyContent: "space-evenly" },
            }}
          >
            <Tab label="General" {...a11yProps(0)} />
            <Tab label="Password" {...a11yProps(1)} />
            <Tab label="Security" {...a11yProps(2)} />
            <Tab label="Social Links" {...a11yProps(3)} />
            <Tab label="Notification" {...a11yProps(4)} />
          </Tabs>

          <TabPanel value={value} index={0}>
          <ProfileGeneral/>
          </TabPanel>
          <TabPanel value={value} index={1}>
          <ProfilePassword/>
          </TabPanel>
          <TabPanel value={value} index={2}>
          <ProfileSecurity/>
          </TabPanel>
          <TabPanel value={value} index={3}>
          <ProfileSocialLinks/>
          </TabPanel>
          <TabPanel value={value} index={4}>
          <ProfileNotification/>
          </TabPanel>
        </Box>
      </Box>
    </Box>
  );
}
