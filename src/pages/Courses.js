import React, { useContext, useEffect, useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, CircularProgress, Button } from '@mui/material';
import { CoursesContext } from '../contexts/CoursesContext';

const Courses = () => {
  const { courses, setCourses } = useContext(CoursesContext); // Fetch courses from context
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    // Filter enrolled courses
    const enrolled = courses.filter((course) => course.enrolled === true);
    setEnrolledCourses(enrolled);
  }, [courses]);

  const handleEnroll = (courseId) => {
    // Update the course's enrolled status
    const updatedCourses = courses.map((course) =>
      course.id === courseId ? { ...course, enrolled: true } : course
    );
    setCourses(updatedCourses);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Available Courses
      </Typography>

      {courses.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No courses available.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{course.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {course.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Category: {course.category}
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                    <CircularProgress
                      variant="determinate"
                      value={course.progress || 0}
                      size={40}
                      thickness={4}
                      sx={{ mr: 2 }}
                    />
                    <Typography variant="body2">
                      Progress: {course.progress || 0}%
                    </Typography>
                  </Box>
                  {course.enrolled ? (
                    <Button variant="contained" color="success" sx={{ mt: 2 }} disabled>
                      Enrolled
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2 }}
                      onClick={() => handleEnroll(course.id)}
                    >
                      Enroll
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Courses;