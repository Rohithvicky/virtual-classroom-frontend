import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CoursesContext } from '../contexts/CoursesContext';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
} from '@mui/material';

const CourseDetails = () => {
  const { id } = useParams(); // Get the course ID from the URL
  const { courses } = useContext(CoursesContext); // Access courses from the shared context

  // Find the course with the matching ID
  const course = courses.find((course) => course.id === parseInt(id));

  if (!course) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5" color="error">
          Course not found
        </Typography>
        <Button variant="contained" href="/courses" sx={{ mt: 2 }}>
          Back to Courses
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ p: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {course.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Instructor: {course.instructor}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {course.description}
          </Typography>
          <Chip
            label={course.enrolled ? 'Enrolled' : 'Not Enrolled'}
            color={course.enrolled ? 'success' : 'default'}
            sx={{ mb: 2 }}
          />
          <Typography variant="body2" color="text.secondary">
            Progress: {course.progress || 0}%
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CourseDetails;