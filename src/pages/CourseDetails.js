import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Divider,
  Button,
} from '@mui/material';

const CourseDetails = () => {
  const { id } = useParams(); // Get the course ID from the URL
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching course details
    setTimeout(() => {
      const mockCourses = [
        {
          id: '1',
          title: 'Java Programming',
          description: 'Learn the basics of Java programming, including syntax, OOP, and more.',
          instructor: 'Prof. Johnson',
          progress: 95,
          lessons: [
            { id: 1, title: 'Introduction to Java', completed: true },
            { id: 2, title: 'Object-Oriented Programming', completed: false },
            { id: 3, title: 'Data Structures in Java', completed: false },
          ],
        },
        {
          id: '5',
          title: 'Foundations of Data Science',
          description: 'Explore the fundamentals of data science, including statistics and machine learning.',
          instructor: 'Dr. Patel',
          progress: 80,
          lessons: [
            { id: 1, title: 'Introduction to Data Science', completed: true },
            { id: 2, title: 'Data Visualization', completed: true },
            { id: 3, title: 'Machine Learning Basics', completed: false },
          ],
        },
      ];

      const selectedCourse = mockCourses.find((course) => course.id === id);
      setCourse(selectedCourse);
      setLoading(false);
    }, 500); // Simulated delay
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!course) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 4,
        }}
      >
        <Typography variant="h4" color="error">
          Course not found
        </Typography>
        <Button variant="contained" href="/dashboard" sx={{ mt: 2 }}>
          Back to Dashboard
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {course.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Instructor: {course.instructor}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {course.description}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          Progress: {course.progress}%
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" color="primary">
            Continue Learning
          </Button>
          <Button variant="outlined" color="secondary">
            View Lessons
          </Button>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Lessons
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {course.lessons.map((lesson) => (
          <Box
            key={lesson.id}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography variant="body1">{lesson.title}</Typography>
            <Typography
              variant="body2"
              color={lesson.completed ? 'success.main' : 'text.secondary'}
            >
              {lesson.completed ? 'Completed' : 'Pending'}
            </Typography>
          </Box>
        ))}
      </Paper>
    </Box>
  );
};

export default CourseDetails;