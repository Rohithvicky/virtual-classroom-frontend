import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Button,
} from '@mui/material';

const ContinueLearning = () => {
  const { id } = useParams(); // Get the course ID from the URL
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching course details for "Continue Learning"
    setTimeout(() => {
      const mockCourses = [
        {
          id: '1',
          title: 'Java Programming',
          lessons: [
            { id: 1, title: 'Introduction to Java', content: 'Lesson content for Introduction to Java.' },
            { id: 2, title: 'Object-Oriented Programming', content: 'Lesson content for Object-Oriented Programming.' },
            { id: 3, title: 'Data Structures in Java', content: 'Lesson content for Data Structures in Java.' },
          ],
        },
        {
          id: '5',
          title: 'Foundations of Data Science',
          lessons: [
            { id: 1, title: 'Introduction to Data Science', content: 'Lesson content for Introduction to Data Science.' },
            { id: 2, title: 'Data Visualization', content: 'Lesson content for Data Visualization.' },
            { id: 3, title: 'Machine Learning Basics', content: 'Lesson content for Machine Learning Basics.' },
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
          Continue Learning: {course.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Select a lesson to continue your learning journey.
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Lessons
        </Typography>
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
            <Button
              variant="outlined"
              onClick={() => alert(`Opening lesson: ${lesson.title}`)}
            >
              Open Lesson
            </Button>
          </Box>
        ))}
      </Paper>
    </Box>
  );
};

export default ContinueLearning;