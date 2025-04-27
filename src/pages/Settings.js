import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  TextField, 
  Button, 
  Switch, 
  FormControlLabel, 
  Divider, 
  Avatar, 
  Tab, 
  Tabs, 
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { Save, Notifications, Security, ColorLens, Person, Language } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Settings = () => {
  const { user } = useAuth();
  const [value, setValue] = useState(0);
  const [saved, setSaved] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    bio: user?.bio || '',
    language: 'english',
  });
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    courseUpdates: true,
    discussionReplies: true,
    gradePosted: true,
    newAnnouncements: true
  });

  const [appearance, setAppearance] = useState({
    theme: 'light',
    fontSize: 'medium',
    colorScheme: 'blue',
  });

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleNotificationChange = (event) => {
    setNotifications({
      ...notifications,
      [event.target.name]: event.target.checked
    });
  };

  const handleAppearanceChange = (e) => {
    setAppearance({
      ...appearance,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // API call to save settings would go here
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>Settings</Typography>
      
      {saved && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Your settings have been saved successfully!
        </Alert>
      )}
      
      <Card>
        <CardContent>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={value} 
              onChange={handleTabChange} 
              aria-label="settings tabs"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab icon={<Person />} label="PROFILE" />
              <Tab icon={<Notifications />} label="NOTIFICATIONS" />
              <Tab icon={<ColorLens />} label="APPEARANCE" />
              <Tab icon={<Security />} label="PRIVACY & SECURITY" />
              <Tab icon={<Language />} label="LANGUAGE" />
            </Tabs>
          </Box>
          
          {/* Profile Tab */}
          <TabPanel value={value} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar 
                  src={user?.avatar || "/api/placeholder/150/150"}
                  sx={{ width: 150, height: 150, mb: 2 }}
                />
                <Button variant="outlined" color="primary">
                  Change Photo
                </Button>
              </Grid>
              <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleProfileChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleProfileChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Bio"
                      name="bio"
                      multiline
                      rows={4}
                      value={profileData.bio}
                      onChange={handleProfileChange}
                      placeholder="Tell us a bit about yourself..."
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </TabPanel>
          
          {/* Notifications Tab */}
          <TabPanel value={value} index={1}>
            <Typography variant="h6" gutterBottom>Notification Preferences</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.email}
                      onChange={handleNotificationChange}
                      name="email"
                      color="primary"
                    />
                  }
                  label="Email Notifications"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.push}
                      onChange={handleNotificationChange}
                      name="push"
                      color="primary"
                    />
                  }
                  label="Push Notifications"
                />
              </Grid>
              
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" gutterBottom>Notify me about:</Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.courseUpdates}
                      onChange={handleNotificationChange}
                      name="courseUpdates"
                      color="primary"
                    />
                  }
                  label="Course Updates"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.discussionReplies}
                      onChange={handleNotificationChange}
                      name="discussionReplies"
                      color="primary"
                    />
                  }
                  label="Discussion Replies"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.gradePosted}
                      onChange={handleNotificationChange}
                      name="gradePosted"
                      color="primary"
                    />
                  }
                  label="Grades Posted"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.newAnnouncements}
                      onChange={handleNotificationChange}
                      name="newAnnouncements"
                      color="primary"
                    />
                  }
                  label="New Announcements"
                />
              </Grid>
            </Grid>
          </TabPanel>
          
          {/* Appearance Tab */}
          <TabPanel value={value} index={2}>
            <Typography variant="h6" gutterBottom>Display Settings</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="theme-select-label">Theme</InputLabel>
                  <Select
                    labelId="theme-select-label"
                    id="theme-select"
                    name="theme"
                    value={appearance.theme}
                    label="Theme"
                    onChange={handleAppearanceChange}
                  >
                    <MenuItem value="light">Light</MenuItem>
                    <MenuItem value="dark">Dark</MenuItem>
                    <MenuItem value="system">System Default</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="font-size-select-label">Font Size</InputLabel>
                  <Select
                    labelId="font-size-select-label"
                    id="font-size-select"
                    name="fontSize"
                    value={appearance.fontSize}
                    label="Font Size"
                    onChange={handleAppearanceChange}
                  >
                    <MenuItem value="small">Small</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="large">Large</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="color-scheme-select-label">Color Scheme</InputLabel>
                  <Select
                    labelId="color-scheme-select-label"
                    id="color-scheme-select"
                    name="colorScheme"
                    value={appearance.colorScheme}
                    label="Color Scheme"
                    onChange={handleAppearanceChange}
                  >
                    <MenuItem value="blue">Blue</MenuItem>
                    <MenuItem value="purple">Purple</MenuItem>
                    <MenuItem value="green">Green</MenuItem>
                    <MenuItem value="orange">Orange</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </TabPanel>
          
          {/* Privacy & Security Tab */}
          <TabPanel value={value} index={3}>
            <Typography variant="h6" gutterBottom>Privacy & Security Settings</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked color="primary" />}
                  label="Show my profile to other students"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked color="primary" />}
                  label="Allow others to see when I'm online"
                />
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" gutterBottom>Security</Typography>
              </Grid>
              <Grid item xs={12}>
                <Button variant="outlined" color="primary" sx={{ mr: 2 }}>
                  Change Password
                </Button>
                <Button variant="outlined">
                  Two-Factor Authentication
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
                  Last login: {new Date().toLocaleString()}
                </Typography>
              </Grid>
            </Grid>
          </TabPanel>
          
          {/* Language Tab */}
          <TabPanel value={value} index={4}>
            <FormControl fullWidth>
              <InputLabel id="language-select-label">Select Language</InputLabel>
              <Select
                labelId="language-select-label"
                id="language-select"
                name="language"
                value={profileData.language}
                label="Select Language"
                onChange={handleProfileChange}
              >
                <MenuItem value="english">English</MenuItem>
                <MenuItem value="spanish">Spanish</MenuItem>
                <MenuItem value="french">French</MenuItem>
                <MenuItem value="german">German</MenuItem>
                <MenuItem value="chinese">Chinese</MenuItem>
                <MenuItem value="japanese">Japanese</MenuItem>
                <MenuItem value="arabic">Arabic</MenuItem>
                <MenuItem value="hindi">Hindi</MenuItem>
              </Select>
            </FormControl>
          </TabPanel>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Save />}
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Settings;