import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
} from '@mui/material';

const liveClasses = [
  {
    id: 1,
    title: 'Java Programming - Live Class',
    instructor: 'Prof. Johnson',
    date: '2025-05-02',
    time: '10:00 AM - 11:30 AM',
    meetLink: 'https://meet.google.com/example-java',
    enrolled: true,
  },
  {
    id: 2,
    title: 'Data Science Basics - Live Class',
    instructor: 'Dr. Patel',
    date: '2025-05-03',
    time: '2:00 PM - 3:30 PM',
    meetLink: 'https://meet.google.com/example-data-science',
    enrolled: false,
  },
  {
    id: 3,
    title: 'React Development - Live Class',
    instructor: 'Ms. Lee',
    date: '2025-05-04',
    time: '4:00 PM - 5:30 PM',
    meetLink: 'https://meet.google.com/example-react',
    enrolled: true,
  },
];

const LiveClasses = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Live Classes
      </Typography>
      <Grid container spacing={3}>
        {liveClasses.map((liveClass) => (
          <Grid item xs={12} sm={6} md={4} key={liveClass.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {liveClass.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Instructor: {liveClass.instructor}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date: {liveClass.date}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Time: {liveClass.time}
                </Typography>
                <Chip
                  label={liveClass.enrolled ? 'Enrolled' : 'Not Enrolled'}
                  color={liveClass.enrolled ? 'success' : 'default'}
                  sx={{ mb: 2 }}
                />
                {liveClass.enrolled ? (
                  <Button
                    variant="contained"
                    color="primary"
                    href={liveClass.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join Class
                  </Button>
                ) : (
                  <Button variant="outlined" color="secondary" disabled>
                    Not Enrolled
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LiveClasses;