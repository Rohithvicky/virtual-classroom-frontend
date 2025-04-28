// src/pages/CourseDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Paper,
  Button,
  CircularProgress,
  Tabs,
  Tab,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

const CourseDetail = () => {
  const { id } = useParams(); // Get the course ID from the URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const [value, setValue] = useState(0); // State for active tab

  const handleChange = (event, newValue) => {
    setValue(newValue); // Update the active tab
  };

  useEffect(() => {
    // Simulate API call to fetch course data based on the ID
    setTimeout(() => {
      const mockCourses = [
        {
          id: '1',
          title: 'Java Programming',
          description: 'Learn the basics of Java programming, including syntax, OOP, and more.',
          instructor: 'Prof. Johnson',
          category: 'Programming',
          level: 'Beginner',
          duration: '10 weeks',
          enrolled: 200,
          rating: 4.5,
          reviewCount: 50,
          modules: [
            {
              id: 1,
              title: 'Introduction to Java',
              lessons: [
                { id: 1, title: 'What is Java?', type: 'video', duration: '10:00' },
                { id: 2, title: 'Setting up Java Environment', type: 'video', duration: '15:00' },
              ],
            },
          ],
        },
        {
          id: '2',
          title: 'Introduction to Computer Science',
          description: 'This comprehensive course covers the fundamentals of computer science.',
          instructor: 'Dr. Smith',
          category: 'Computer Science',
          level: 'Beginner',
          duration: '12 weeks',
          enrolled: 342,
          rating: 4.7,
          reviewCount: 128,
          modules: [
            {
              id: 1,
              title: 'Introduction to Programming Concepts',
              lessons: [
                { id: 1, title: 'What is Programming?', type: 'video', duration: '10:30' },
              ],
            },
          ],
        },
      ];

      // Find the course that matches the ID from the URL
      const selectedCourse = mockCourses.find((course) => course.id === id);
      setCourse(selectedCourse || null); // Set course to null if not found
      setLoading(false);
    }, 800); // Simulated network delay
  }, [id]);

  const handleBack = () => {
    navigate('/courses');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!course) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h5" color="error">
          Course not found
        </Typography>
        <Button
          variant="contained"
          onClick={handleBack}
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2 }}
        >
          Back to Courses
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Button
          variant="outlined"
          onClick={handleBack}
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 2 }}
        >
          Back to Courses
        </Button>
      </Box>

      {/* Course Header */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {course.title}
        </Typography>
        <Typography variant="body1" paragraph>
          {course.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Instructor: {course.instructor}
        </Typography>
      </Paper>

      {/* Course Tabs */}
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="course tabs">
            <Tab label="Content" />
            <Tab label="Overview" />
          </Tabs>
        </Box>

        {/* Content Tab */}
        {value === 0 && (
          <Box sx={{ py: 3 }}>
            <Typography variant="h6" gutterBottom>
              Course Content
            </Typography>
            {course.modules.map((module) => (
              <Paper key={module.id} sx={{ mb: 2 }}>
                <Box sx={{ p: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Module {module.id}: {module.title}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Box>
        )}

        {/* Overview Tab */}
        {value === 1 && (
          <Box sx={{ py: 3 }}>
            <Typography variant="h6" gutterBottom>
              About This Course
            </Typography>
            <Typography variant="body1">{course.description}</Typography>
          </Box>
        )}
      </Box>
    </>
  );
};

export default CourseDetail;