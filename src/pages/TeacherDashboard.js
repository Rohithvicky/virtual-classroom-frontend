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
  Container,
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
  const { courses } = useContext(CoursesContext);
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => setCurrentTab(newValue);

  const teacherStats = {
    totalCourses: courses.length,
    enrolledStudents: 120,
    upcomingClasses: 5,
    upcomingQuizzes: 3,
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Teacher Dashboard
      </Typography>

      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { title: 'Total Courses', value: teacherStats.totalCourses, icon: <BookIcon />, color: 'primary.main' },
          { title: 'Enrolled Students', value: teacherStats.enrolledStudents, icon: <PeopleIcon />, color: 'secondary.main' },
          { title: 'Upcoming Classes', value: teacherStats.upcomingClasses, icon: <VideoCallIcon />, color: 'success.main' },
          { title: 'Upcoming Quizzes', value: teacherStats.upcomingQuizzes, icon: <QuizIcon />, color: 'error.main' },
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ p: 2, textAlign: 'center', borderRadius: '12px', height: '100%' }}>
              <Avatar sx={{ bgcolor: stat.color, mx: 'auto', mb: 1 }}>
                {stat.icon}
              </Avatar>
              <Typography variant="h6">{stat.title}</Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#4361ee' }}>
                {stat.value}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Tabs */}
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
          <Tab label="Settings" icon={<SettingsIcon />} iconPosition="start" />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      <Box>
        {currentTab === 0 && (
          <>
            <Typography variant="h5" gutterBottom>
              Manage Courses
            </Typography>
            <Grid container spacing={3}>
              {courses.map((course) => (
                <Grid item xs={12} sm={6} md={4} key={course.id}>
                  <Card sx={{ p: 2, height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6">{course.title}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {course.description}
                      </Typography>
                    </CardContent>
                    <Divider sx={{ my: 1 }} />
                    <Button variant="contained" color="primary" fullWidth>
                      Edit Course
                    </Button>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {currentTab === 1 && (
          <Typography variant="h5" gutterBottom>
            Manage Students
          </Typography>
        )}

        {currentTab === 2 && (
          <Typography variant="h5" gutterBottom>
            Manage Assignments
          </Typography>
        )}

        {currentTab === 3 && (
          <Typography variant="h5" gutterBottom>
            Announcements
          </Typography>
        )}

        {currentTab === 4 && (
          <Typography variant="h5" gutterBottom>
            Discussions
          </Typography>
        )}

        {currentTab === 5 && (
          <Typography variant="h5" gutterBottom>
            Manage Quizzes
          </Typography>
        )}

        {currentTab === 6 && (
          <Typography variant="h5" gutterBottom>
            Live Classes
          </Typography>
        )}

        {currentTab === 7 && (
          <Typography variant="h5" gutterBottom>
            Settings
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default TeacherDashboard;