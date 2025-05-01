import React, { useState } from 'react';
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Person as PersonIcon,
  Description as DescriptionIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  School as SchoolIcon,
} from '@mui/icons-material';

export const courses = [
  {
    id: 1,
    title: 'Java Programming',
    description: 'Learn Java programming basics from scratch.',
    instructor: 'Prof. Johnson',
    enrolled: true,
    duration: '8 weeks',
    startDate: '2025-06-01',
    syllabus: [
      'Introduction to Java',
      'Object-Oriented Programming',
      'Collections Framework',
      'Exception Handling',
      'Multithreading'
    ],
    prerequisites: 'Basic programming knowledge'
  },
  {
    id: 2,
    title: 'Foundations of Data Science',
    description: 'Introduction to data science concepts and tools.',
    instructor: 'Dr. Patel',
    enrolled: false,
    duration: '10 weeks',
    startDate: '2025-06-15',
    syllabus: [
      'Python for Data Science',
      'Data Visualization',
      'Statistical Analysis',
      'Machine Learning Basics',
      'Data Cleaning Techniques'
    ],
    prerequisites: 'Basic statistics and Python'
  },
  {
    id: 3,
    title: 'Web Development with React',
    description: 'Master React and build modern web applications.',
    instructor: 'Ms. Lee',
    enrolled: true,
    duration: '6 weeks',
    startDate: '2025-07-01',
    syllabus: [
      'React Fundamentals',
      'Hooks and Context API',
      'State Management',
      'Routing',
      'API Integration'
    ],
    prerequisites: 'HTML, CSS, and JavaScript basics'
  },
];

const CourseList = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleEnroll = (courseId) => {
    console.log(`Enrolling in course ${courseId}`);
    alert(`Enrolled in course ${courseId}!`);
  };

  const handleViewDetails = (course) => {
    setSelectedCourse(course);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCourse(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Available Courses
      </Typography>
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              boxShadow: 3,
              '&:hover': {
                boxShadow: 6,
              },
              transition: 'box-shadow 0.3s',
            }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <PersonIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                  {course.instructor}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {course.description}
                </Typography>
                <Chip
                  label={course.enrolled ? 'Enrolled' : 'Not Enrolled'}
                  color={course.enrolled ? 'success' : 'default'}
                  variant={course.enrolled ? 'filled' : 'outlined'}
                  sx={{ mb: 2 }}
                />
              </CardContent>
              <CardActions>
                <Stack direction="row" spacing={1} sx={{ width: '100%', px: 1, pb: 1 }}>
                  <Button 
                    size="small" 
                    variant="outlined" 
                    sx={{ flex: 1 }}
                    onClick={() => handleViewDetails(course)}
                  >
                    View Details
                  </Button>
                  {!course.enrolled && (
                    <Button 
                      size="small" 
                      variant="contained" 
                      color="primary"
                      sx={{ flex: 1 }}
                      onClick={() => handleEnroll(course.id)}
                    >
                      Enroll
                    </Button>
                  )}
                </Stack>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Course Details Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        {selectedCourse && (
          <>
            <DialogTitle>
              <Typography variant="h5" component="div">
                {selectedCourse.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                <PersonIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                Instructor: {selectedCourse.instructor}
              </Typography>
            </DialogTitle>
            <DialogContent dividers>
              <Typography variant="body1" paragraph>
                {selectedCourse.description}
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    <SchoolIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Course Details
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <ScheduleIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Duration" 
                        secondary={selectedCourse.duration} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Start Date" 
                        secondary={selectedCourse.startDate} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <DescriptionIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Prerequisites" 
                        secondary={selectedCourse.prerequisites} 
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    <DescriptionIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Syllabus
                  </Typography>
                  <List dense>
                    {selectedCourse.syllabus.map((item, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <CheckCircleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
              {!selectedCourse.enrolled && (
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => {
                    handleEnroll(selectedCourse.id);
                    handleCloseDialog();
                  }}
                >
                  Enroll Now
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default CourseList;