import React, { useState, useContext } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Tabs, 
  Tab, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Paper,
  Divider
} from '@mui/material';
import { 
  VideoCall as VideoCallIcon,
  Assignment as AssignmentIcon,
  Quiz as QuizIcon,
  Book as BookIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { CoursesContext } from '../contexts/CoursesContext';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import TabPanel from '../components/TabPanel'; // Import TabPanel from the components folder

const TeacherDashboard = () => {
  const { courses } = useContext(CoursesContext);
  const [currentTab, setCurrentTab] = useState(0);

  // State for dialog controls
  const [openQuizDialog, setOpenQuizDialog] = useState(false);
  const [openLiveClassDialog, setOpenLiveClassDialog] = useState(false);
  const [openContentDialog, setOpenContentDialog] = useState(false);
  const [openAssignmentDialog, setOpenAssignmentDialog] = useState(false);

  // State for form data
  const [selectedCourse, setSelectedCourse] = useState('');
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    startTime: new Date(),
    duration: 30,
    questions: []
  });
  const [liveClassData, setLiveClassData] = useState({
    title: '',
    description: '',
    meetLink: '',
    startTime: new Date(),
    duration: 60
  });
  const [contentData, setContentData] = useState({
    title: '',
    description: '',
    type: 'document',
    content: ''
  });
  const [assignmentData, setAssignmentData] = useState({
    title: '',
    description: '',
    dueDate: new Date(),
    points: 10
  });

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleOpenDialog = (dialogType) => {
    if (dialogType === 'quiz') setOpenQuizDialog(true);
    if (dialogType === 'liveClass') setOpenLiveClassDialog(true);
    if (dialogType === 'content') setOpenContentDialog(true);
    if (dialogType === 'assignment') setOpenAssignmentDialog(true);
  };

  const handleCloseDialog = (dialogType) => {
    if (dialogType === 'quiz') setOpenQuizDialog(false);
    if (dialogType === 'liveClass') setOpenLiveClassDialog(false);
    if (dialogType === 'content') setOpenContentDialog(false);
    if (dialogType === 'assignment') setOpenAssignmentDialog(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
        <Tabs 
          value={currentTab} 
          onChange={handleTabChange} 
          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Dashboard" icon={<CheckCircleIcon />} iconPosition="start" />
          <Tab label="Courses" icon={<BookIcon />} iconPosition="start" />
          <Tab label="Quizzes" icon={<QuizIcon />} iconPosition="start" />
          <Tab label="Live Classes" icon={<VideoCallIcon />} iconPosition="start" />
          <Tab label="Assignments" icon={<AssignmentIcon />} iconPosition="start" />
        </Tabs>
      </Box>

      {/* Dashboard Overview Tab */}
      <TabPanel value={currentTab} index={0}>
        <Typography variant="h4" gutterBottom>
          Teacher Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, borderRadius: '12px' }}>
              <Typography variant="h6" gutterBottom>Quick Actions</Typography>
              <Grid container spacing={2}>
                <Grid item>
                  <Button 
                    variant="contained" 
                    startIcon={<QuizIcon />}
                    onClick={() => handleOpenDialog('quiz')}
                  >
                    Create Quiz
                  </Button>
                </Grid>
                <Grid item>
                  <Button 
                    variant="contained" 
                    startIcon={<VideoCallIcon />}
                    onClick={() => handleOpenDialog('liveClass')}
                  >
                    Schedule Class
                  </Button>
                </Grid>
                <Grid item>
                  <Button 
                    variant="contained" 
                    startIcon={<BookIcon />}
                    onClick={() => handleOpenDialog('content')}
                  >
                    Add Content
                  </Button>
                </Grid>
                <Grid item>
                  <Button 
                    variant="contained" 
                    startIcon={<AssignmentIcon />}
                    onClick={() => handleOpenDialog('assignment')}
                  >
                    Create Assignment
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Add dialogs for quizzes, live classes, content, and assignments */}
      <Dialog open={openQuizDialog} onClose={() => handleCloseDialog('quiz')} maxWidth="md" fullWidth>
        <DialogTitle>Create New Quiz</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Course</InputLabel>
                <Select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  label="Course"
                >
                  {courses.map((course) => (
                    <MenuItem key={course.id} value={course.id}>{course.title}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Quiz Title"
                value={quizData.title}
                onChange={(e) => setQuizData({...quizData, title: e.target.value})}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseDialog('quiz')}>Cancel</Button>
          <Button onClick={() => console.log('Quiz Created')} variant="contained">
            Create Quiz
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TeacherDashboard;