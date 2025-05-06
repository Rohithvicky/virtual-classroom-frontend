import React, { useContext } from 'react';
import { CoursesContext } from '../contexts/CoursesContext';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';

const LiveQuizzes = () => {
  const { filteredLiveQuizzes } = useContext(CoursesContext); // Get filtered live quizzes for enrolled courses

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Live Quizzes
      </Typography>

      {filteredLiveQuizzes.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No live quizzes available.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredLiveQuizzes.map((quiz) => (
            <Grid item xs={12} sm={6} md={4} key={quiz.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{quiz.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Date: {new Date(quiz.date).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default LiveQuizzes;