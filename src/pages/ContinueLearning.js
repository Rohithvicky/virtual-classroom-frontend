import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Button,
} from '@mui/material';
import { courses } from './CourseList';

const ContinueLearning = () => {
  const { id } = useParams(); // Get the course ID from the URL
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching course details for "Continue Learning"
    setTimeout(() => {
      // Use the same course IDs as defined in CourseList.js
      const mockCourses = [
        {
          id: 1, // Matches ID from CourseList.js
          title: 'Java Programming',
          lessons: [
            { id: 1, title: 'Introduction to Java', content: 'Lesson content for Introduction to Java.' },
            { id: 2, title: 'Object-Oriented Programming', content: 'Lesson content for Object-Oriented Programming.' },
            { id: 3, title: 'Data Structures in Java', content: 'Lesson content for Data Structures in Java.' },
          ],
        },
        {
          id: 2, // Matches ID from CourseList.js
          title: 'Foundations of Data Science',
          lessons: [
            { id: 1, title: 'Introduction to Data Science', content: 'Lesson content for Introduction to Data Science.' },
            { id: 2, title: 'Data Visualization', content: 'Lesson content for Data Visualization.' },
            { id: 3, title: 'Machine Learning Basics', content: 'Lesson content for Machine Learning Basics.' },
          ],
        },
        {
          id: 3, // Matches ID from CourseList.js
          title: 'Web Development with React',
          lessons: [
            { id: 1, title: 'React Fundamentals', content: 'Lesson content for React Fundamentals.' },
            { id: 2, title: 'Component Lifecycle', content: 'Lesson content for Component Lifecycle.' },
            { id: 3, title: 'React Hooks', content: 'Lesson content for React Hooks.' },
          ],
        },
      ];

      // Convert ID from string to number to match properly
      const numericId = parseInt(id, 10);
      const selectedCourse = mockCourses.find((course) => course.id === numericId);
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
        <Button variant="contained" onClick={() => navigate('/dashboard')} sx={{ mt: 2 }}>
          Back to Dashboard
        </Button>
      </Box>
    );
  }

  // Find the original course to get additional info like instructor
  const originalCourse = courses.find(c => c.id === course.id);
  
  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Continue Learning: {course.title}
        </Typography>
        {originalCourse && (
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Instructor: {originalCourse.instructor}
          </Typography>
        )}
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
              p: 2,
              mb: 2,
              borderRadius: 1,
              border: '1px solid #e0e0e0',
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <Typography variant="body1">{lesson.title}</Typography>
            <Button
              variant="contained"
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