import React from 'react';
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
} from '@mui/material';

// Define and export the courses array
export const courses = [
  {
    id: 1,
    title: 'Java Programming',
    description: 'Learn Java programming basics.',
    instructor: 'Prof. Johnson',
    enrolled: true,
  },
  {
    id: 2,
    title: 'Foundations of Data Science',
    description: 'Introduction to data science concepts.',
    instructor: 'Dr. Patel',
    enrolled: false,
  },
  {
    id: 3,
    title: 'Web Development with React',
    description: 'Master React and build modern web applications.',
    instructor: 'Ms. Lee',
    enrolled: true,
  },
];

const CourseList = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Available Courses
      </Typography>
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Instructor: {course.instructor}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {course.description}
                </Typography>
                <Chip
                  label={course.enrolled ? 'Enrolled' : 'Not Enrolled'}
                  color={course.enrolled ? 'success' : 'default'}
                />
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CourseList;