import React, { useState, useContext } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  Paper,
  Divider,
  Avatar,
} from '@mui/material';
import {
  VideoCall as VideoCallIcon,
  Assignment as AssignmentIcon,
  Quiz as QuizIcon,
  Book as BookIcon,
  CheckCircle as CheckCircleIcon,
  Announcement as AnnouncementIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { CoursesContext } from '../contexts/CoursesContext';

const TeacherDashboard = () => {
  const { courses } = useContext(CoursesContext); // Example context for courses
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Overview Panel */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Teacher Dashboard
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2, textAlign: 'center' }}>
            <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 1 }}>
              <BookIcon />
            </Avatar>
            <Typography variant="h6">Total Courses</Typography>
            <Typography variant="h4">{courses.length}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2, textAlign: 'center' }}>
            <Avatar sx={{ bgcolor: 'secondary.main', mx: 'auto', mb: 1 }}>
              <PeopleIcon />
            </Avatar>
            <Typography variant="h6">Enrolled Students</Typography>
            <Typography variant="h4">120</Typography> {/* Example data */}
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2, textAlign: 'center' }}>
            <Avatar sx={{ bgcolor: 'success.main', mx: 'auto', mb: 1 }}>
              <VideoCallIcon />
            </Avatar>
            <Typography variant="h6">Upcoming Classes</Typography>
            <Typography variant="h4">5</Typography> {/* Example data */}
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2, textAlign: 'center' }}>
            <Avatar sx={{ bgcolor: 'error.main', mx: 'auto', mb: 1 }}>
              <QuizIcon />
            </Avatar>
            <Typography variant="h6">Upcoming Quizzes</Typography>
            <Typography variant="h4">3</Typography> {/* Example data */}
          </Card>
        </Grid>
      </Grid>

      {/* Tabs for Different Sections */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Courses" icon={<BookIcon />} iconPosition="start" />
          <Tab label="Students" icon={<PeopleIcon />} iconPosition="start" />
          <Tab label="Assignments" icon={<AssignmentIcon />} iconPosition="start" />
          <Tab label="Announcements" icon={<AnnouncementIcon />} iconPosition="start" />
          <Tab label="Discussions" icon={<CheckCircleIcon />} iconPosition="start" />
          <Tab label="Quizzes" icon={<QuizIcon />} iconPosition="start" />
          <Tab label="Live Classes" icon={<VideoCallIcon />} iconPosition="start" />
          <Tab label="Profile & Settings" icon={<SettingsIcon />} iconPosition="start" />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      {currentTab === 0 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Manage Courses
          </Typography>
          <Grid container spacing={3}>
            {courses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <Card sx={{ p: 2 }}>
                  <Typography variant="h6">{course.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.description}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Button variant="contained" color="primary" fullWidth>
                    Edit Course
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {currentTab === 1 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Manage Students
          </Typography>
          <Typography variant="body2">View and manage enrolled students.</Typography>
        </Box>
      )}

      {currentTab === 2 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Manage Assignments
          </Typography>
          <Typography variant="body2">Create and grade assignments.</Typography>
        </Box>
      )}

      {currentTab === 3 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Announcements
          </Typography>
          <Typography variant="body2">Post and manage announcements.</Typography>
        </Box>
      )}

      {currentTab === 4 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Discussions
          </Typography>
          <Typography variant="body2">Monitor and reply to discussions.</Typography>
        </Box>
      )}

      {currentTab === 5 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Manage Quizzes
          </Typography>
          <Typography variant="body2">Create and manage quizzes.</Typography>
        </Box>
      )}

      {currentTab === 6 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Live Classes
          </Typography>
          <Typography variant="body2">Schedule and manage live classes.</Typography>
        </Box>
      )}

      {currentTab === 7 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Profile & Settings
          </Typography>
          <Typography variant="body2">Update your profile and preferences.</Typography>
        </Box>
      )}
    </Box>
  );
};

export default TeacherDashboard;