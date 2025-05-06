import React, { useContext, useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Grid, 
  Paper,
  Chip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Divider
} from '@mui/material';
import { 
  VideoCall as VideoCallIcon,
  OpenInNew as OpenInNewIcon,
  Event as EventIcon,
  AccessTime as AccessTimeIcon
} from '@mui/icons-material';
import { CoursesContext } from '../contexts/CoursesContext';

const LiveClasses = () => {
  const { filteredLiveClasses } = useContext(CoursesContext); // Get filtered classes from context
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString();
  };

  const handleJoinClass = (liveClass) => {
    setSelectedClass(liveClass);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenMeetLink = () => {
    if (selectedClass && selectedClass.meetLink) {
      window.open(selectedClass.meetLink, '_blank');
      setOpenDialog(false);
    }
  };

  // Check if class is active (can be joined)
  const isClassActive = (startTime) => {
    const now = new Date();
    const classTime = new Date(startTime);
    
    // Class is active 15 minutes before and during the class
    const fifteenMinsBefore = new Date(classTime.getTime() - 15 * 60000);
    const classEndTime = new Date(classTime.getTime() + 90 * 60000); // Assuming max class is 90 mins
    
    return now >= fifteenMinsBefore && now <= classEndTime;
  };

  // Check if class is upcoming
  const isClassUpcoming = (startTime) => {
    const now = new Date();
    const classTime = new Date(startTime);
    const fifteenMinsBefore = new Date(classTime.getTime() - 15 * 60000);
    
    return now < fifteenMinsBefore;
  };

  // Check if class has ended
  const isClassEnded = (startTime) => {
    const now = new Date();
    const classTime = new Date(startTime);
    const classEndTime = new Date(classTime.getTime() + 90 * 60000); // Assuming max class is 90 mins
    
    return now > classEndTime;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Live Classes
      </Typography>
      
      {filteredLiveClasses.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          No live classes are scheduled for your enrolled courses. Please check back later.
        </Alert>
      ) : (
        <>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Here are the upcoming live classes for your enrolled courses. You can join a class 15 minutes before the scheduled start time.
          </Typography>
          
          <Grid container spacing={3}>
            {filteredLiveClasses.map((liveClass) => {
              const active = isClassActive(liveClass.startTime);
              const upcoming = isClassUpcoming(liveClass.startTime);
              const ended = isClassEnded(liveClass.startTime);
              
              let statusColor = "primary";
              let statusText = "Upcoming";
              
              if (active) {
                statusColor = "success";
                statusText = "Live Now";
              } else if (ended) {
                statusColor = "default";
                statusText = "Ended";
              }
              
              return (
                <Grid item xs={12} sm={6} md={4} key={liveClass.id}>
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
                          {liveClass.title}
                        </Typography>
                        <Chip 
                          label={statusText} 
                          color={statusColor} 
                          size="small" 
                        />
                      </Box>
                      
                      <Paper sx={{ p: 2, mb: 2, bgcolor: 'background.paper' }}>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Course:</strong> {liveClass.course}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Instructor:</strong> {liveClass.instructor}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                          <EventIcon sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {formatDateTime(liveClass.startTime)}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                          <AccessTimeIcon sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {liveClass.duration}
                          </Typography>
                        </Box>
                      </Paper>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {liveClass.description}
                      </Typography>
                      
                      <Button
                        variant="contained"
                        color={active ? "success" : "primary"}
                        sx={{ mt: 'auto' }}
                        fullWidth
                        disabled={!active}
                        startIcon={<VideoCallIcon />}
                        onClick={() => handleJoinClass(liveClass)}
                      >
                        {active ? "Join Class Now" : upcoming ? "Not Available Yet" : "Class Ended"}
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
      
      {/* Join Class Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Join Live Class</DialogTitle>
        <DialogContent>
          {selectedClass && (
            <>
              <DialogContentText>
                You are about to join the live class: <strong>{selectedClass.title}</strong>
              </DialogContentText>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" gutterBottom>
                <strong>Course:</strong> {selectedClass.course}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Instructor:</strong> {selectedClass.instructor}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Start Time:</strong> {formatDateTime(selectedClass.startTime)}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Duration:</strong> {selectedClass.duration}
              </Typography>
              <DialogContentText sx={{ mt: 2 }}>
                Clicking "Join Now" will open Google Meet in a new tab. Make sure your camera and microphone are set up.
              </DialogContentText>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleOpenMeetLink}
            endIcon={<OpenInNewIcon />}
          >
            Join Now
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LiveClasses;