import React, { useContext, useState } from 'react';
import { Box, Typography, Card, CardContent, Button, Grid, Chip, Alert, Paper } from '@mui/material';
import { CoursesContext } from '../contexts/CoursesContext';

const LiveQuizzes = () => {
  const { courses } = useContext(CoursesContext);
  const [joinedQuizzes, setJoinedQuizzes] = useState([]);

  // Sample quizzes data - typically would come from an API
  const quizzes = [
    {
      id: 1,
      title: 'JavaScript Basics Quiz',
      course: 'JavaScript Fundamentals',
      startTime: '2025-04-30T10:00:00',
      duration: '30 minutes',
    },
    {
      id: 2,
      title: 'React Hooks Quiz',
      course: 'Modern Web Development',
      startTime: '2025-05-01T14:00:00',
      duration: '45 minutes',
    },
    {
      id: 3,
      title: 'Database Optimization Quiz',
      course: 'Database Management',
      startTime: '2025-05-02T16:00:00',
      duration: '40 minutes',
    },
    {
      id: 4,
      title: 'Advanced JavaScript Concepts',
      course: 'JavaScript Fundamentals',
      startTime: '2025-05-03T11:00:00',
      duration: '60 minutes',
    },
  ];

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString();
  };

  const handleJoinQuiz = (quizId) => {
    setJoinedQuizzes([...joinedQuizzes, quizId]);
    // Here you would typically redirect to the quiz interface or perform an API call
    console.log(`Joined quiz with id: ${quizId}`);
  };

  // Get list of enrolled course titles
  const enrolledCourseTitles = courses
    .filter(course => course.enrolled)
    .map(course => course.title);

  // Filter quizzes for enrolled courses
  const availableQuizzes = quizzes.filter(quiz => 
    enrolledCourseTitles.includes(quiz.course)
  );

  // Check if quiz is active (can be joined)
  const isQuizActive = (startTime) => {
    const now = new Date();
    const quizTime = new Date(startTime);
    // Quiz is active 15 minutes before start time
    const fifteenMinsBefore = new Date(quizTime.getTime() - 15 * 60000);
    return now >= fifteenMinsBefore;
  };

  // Check if quiz is upcoming (not yet active)
  const isQuizUpcoming = (startTime) => {
    const now = new Date();
    const quizTime = new Date(startTime);
    const fifteenMinsBefore = new Date(quizTime.getTime() - 15 * 60000);
    return now < fifteenMinsBefore;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Live Quizzes
      </Typography>
      
      {availableQuizzes.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          No quizzes available for your enrolled courses. Please check back later.
        </Alert>
      ) : (
        <>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Here are the upcoming quizzes for your enrolled courses. You can join a quiz 15 minutes before the start time.
          </Typography>
          
          <Grid container spacing={3}>
            {availableQuizzes.map((quiz) => {
              const active = isQuizActive(quiz.startTime);
              const upcoming = isQuizUpcoming(quiz.startTime);
              const joined = joinedQuizzes.includes(quiz.id);
              
              return (
                <Grid item xs={12} sm={6} md={4} key={quiz.id}>
                  <Card
                    sx={{
                      borderRadius: '12px',
                      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                      transition: 'transform 0.2s ease-in-out',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                      },
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Typography variant="h6" gutterBottom>
                          {quiz.title}
                        </Typography>
                        <Chip 
                          label={active ? "Active" : "Upcoming"} 
                          color={active ? "success" : "primary"} 
                          size="small" 
                        />
                      </Box>
                      
                      <Paper sx={{ p: 2, mb: 2, bgcolor: 'background.paper' }}>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Course:</strong> {quiz.course}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Start Time:</strong> {formatDateTime(quiz.startTime)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Duration:</strong> {quiz.duration}
                        </Typography>
                      </Paper>
                      
                      <Button
                        variant="contained"
                        color={joined ? "success" : active ? "primary" : "secondary"}
                        sx={{ mt: 'auto' }}
                        fullWidth
                        disabled={!active || joined}
                        onClick={() => handleJoinQuiz(quiz.id)}
                      >
                        {joined ? "Quiz Joined" : active ? "Join Quiz" : "Not Available Yet"}
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default LiveQuizzes;