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
  Chip,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

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
    enrolled: true,
  },
];

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
          id: 1,
          title: 'Introduction to Computer Science',
          description: 'This comprehensive course covers the fundamentals of computer science including algorithms, data structures, and computational thinking.',
          instructor: 'Dr. Smith',
          category: 'Computer Science',
          level: 'Beginner',
          duration: '12 weeks',
          enrolled: 342,
          rating: 4.7,
          reviewCount: 128,
          image: '/api/placeholder/800/400',
          modules: [
            {
              id: 1,
              title: 'Introduction to Programming Concepts',
              lessons: [
                { id: 1, title: 'What is Programming?', type: 'video', duration: '10:30' },
                { id: 2, title: 'Algorithms and Problem Solving', type: 'video', duration: '15:20' },
              ],
            },
            {
              id: 2,
              title: 'Data Structures',
              lessons: [
                { id: 3, title: 'Arrays and Lists', type: 'video', duration: '12:45' },
                { id: 4, title: 'Stacks and Queues', type: 'video', duration: '14:10' },
              ],
            },
          ],
        },
        {
          id: 2,
          title: 'Java Programming',
          description: 'Learn the basics of Java programming, including syntax, object-oriented programming, and common design patterns.',
          instructor: 'Prof. Johnson',
          category: 'Programming',
          level: 'Intermediate',
          duration: '10 weeks',
          enrolled: 200,
          rating: 4.8,
          reviewCount: 200,
          image: '/api/placeholder/800/400',
          modules: [
            {
              id: 1,
              title: 'Java Basics',
              lessons: [
                { id: 1, title: 'Java Syntax', type: 'video', duration: '10:00' },
                { id: 2, title: 'Variables and Data Types', type: 'video', duration: '15:00' },
              ],
            },
          ],
        },
        {
          id: 3,
          title: 'Computer Organization and Architecture',
          description: 'Explore the fundamental concepts of computer organization and architecture.',
          instructor: 'Dr. Lee',
          category: 'Computer Science',
          level: 'Advanced',
          duration: '8 weeks',
          enrolled: 150,
          rating: 4.6,
          reviewCount: 90,
          image: '/api/placeholder/800/400',
          modules: [],
        },
        {
          id: 4,
          title: 'Startup Management',
          description: 'Learn how to launch and manage a successful startup business.',
          instructor: 'Ms. Taylor',
          category: 'Business',
          level: 'Beginner',
          duration: '6 weeks',
          enrolled: 120,
          rating: 4.5,
          reviewCount: 50,
          image: '/api/placeholder/800/400',
          modules: [],
        },
        {
          id: 5,
          title: 'Foundations of Data Science',
          description: 'Introduction to data science concepts, tools, and techniques.',
          instructor: 'Dr. Patel',
          category: 'Data Science',
          level: 'Beginner',
          duration: '12 weeks',
          enrolled: 300,
          rating: 4.9,
          reviewCount: 300,
          image: '/api/placeholder/800/400',
          modules: [],
        },
      ];

      // Find the course that matches the ID from the URL
      const selectedCourse = mockCourses.find((course) => course.id === parseInt(id));
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
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          <Chip label={course.category} size="small" color="primary" />
          <Chip label={course.level} size="small" />
          <Chip label={course.duration} size="small" />
        </Box>
        <Typography variant="body1" paragraph>
          {course.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Instructor: {course.instructor} | {course.enrolled} students enrolled | Rating: {course.rating} ({course.reviewCount} reviews)
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
            {course.modules && course.modules.length > 0 ? (
              course.modules.map((module) => (
                <Paper key={module.id} sx={{ mb: 2 }}>
                  <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Module {module.id}: {module.title}
                    </Typography>
                    {module.lessons && module.lessons.map((lesson) => (
                      <Box key={lesson.id} sx={{ pl: 2, mt: 1, display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ flexGrow: 1 }}>
                          {lesson.title} ({lesson.duration})
                        </Typography>
                        <Chip label={lesson.type} size="small" variant="outlined" />
                      </Box>
                    ))}
                  </Box>
                </Paper>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No content available yet.
              </Typography>
            )}
          </Box>
        )}

        {/* Overview Tab */}
        {value === 1 && (
          <Box sx={{ py: 3 }}>
            <Typography variant="h6" gutterBottom>
              About This Course
            </Typography>
            <Typography variant="body1" paragraph>
              {course.description}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
              <Paper sx={{ p: 2, minWidth: 120 }}>
                <Typography variant="subtitle2">Level</Typography>
                <Typography variant="body1">{course.level}</Typography>
              </Paper>
              <Paper sx={{ p: 2, minWidth: 120 }}>
                <Typography variant="subtitle2">Duration</Typography>
                <Typography variant="body1">{course.duration}</Typography>
              </Paper>
              <Paper sx={{ p: 2, minWidth: 120 }}>
                <Typography variant="subtitle2">Category</Typography>
                <Typography variant="body1">{course.category}</Typography>
              </Paper>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default CourseDetail;