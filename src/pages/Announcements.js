import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Skeleton,
  Button,
} from '@mui/material';
import {
  Announcement as AnnouncementIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching announcements
    setTimeout(() => {
      setAnnouncements([
        {
          id: 1,
          title: 'Welcome to Java Programming!',
          text: 'Course starts on May 1st. Please check the syllabus.',
          date: '2025-04-25',
        },
        {
          id: 2,
          title: 'Foundations of Data Science Update',
          text: 'New resources added for Week 2. Check the course materials.',
          date: '2025-04-24',
        },
        {
          id: 3,
          title: 'Assignment Deadline Reminder',
          text: 'Submit your assignments by the end of this week.',
          date: '2025-04-23',
        },
      ]);
      setLoading(false);
    }, 200); // Reduced delay to 200ms
  }, []);

  const paginatedAnnouncements = announcements.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f8f9fa',
        px: { xs: 2, md: 4 },
        py: 3,
      }}
    >
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/dashboard')}
        sx={{ mb: 3 }}
      >
        Back to Dashboard
      </Button>

      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Announcements
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Stay updated with the latest announcements from your courses.
      </Typography>

      {loading ? (
        <Grid container spacing={3}>
          {[1, 2].map((item) => (
            <Grid item xs={12} key={item}>
              <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 2 }} />
            </Grid>
          ))}
        </Grid>
      ) : paginatedAnnouncements.length === 0 ? (
        <Box
          sx={{
            textAlign: 'center',
            py: 4,
            border: '1px dashed #ccc',
            borderRadius: 2,
          }}
        >
          <AnnouncementIcon sx={{ fontSize: 60, opacity: 0.3, mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No announcements available.
          </Typography>
        </Box>
      ) : (
        <>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <List>
              {paginatedAnnouncements.map((announcement, index) => (
                <React.Fragment key={announcement.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemIcon>
                      <AnnouncementIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" fontWeight="bold">
                          {announcement.title}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" color="text.secondary">
                            {announcement.text}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ mt: 1, display: 'block' }}
                          >
                            {new Date(announcement.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  {index < paginatedAnnouncements.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Previous
            </Button>
            <Button
              disabled={page * itemsPerPage >= announcements.length}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Announcements;