import React from 'react';
import { Box, Typography, Card, CardContent, Button, Grid } from '@mui/material';

const LiveQuizzes = () => {
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
  ];

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Live Quizzes
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>Content 1</Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>Content 2</Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>Content 3</Card>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {quizzes.map((quiz) => (
          <Grid item xs={12} sm={6} md={4} key={quiz.id}>
            <Card
              sx={{
                borderRadius: '12px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)', // Lift effect on hover
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {quiz.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Course: {quiz.course}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Start Time: {formatDateTime(quiz.startTime)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Duration: {quiz.duration}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  fullWidth
                >
                  Join Quiz
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LiveQuizzes;