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
  FormHelperText, 
  IconButton,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip
} from '@mui/material';
import { 
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  VideoCall as VideoCallIcon,
  Assignment as AssignmentIcon,
  Quiz as QuizIcon,
  Book as BookIcon,
  Link as LinkIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';
import { CoursesContext } from '../contexts/CoursesContext';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';

// Tab panel component for different sections
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`teacher-tabpanel-${index}`}
      aria-labelledby={`teacher-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const TeacherDashboard = () => {
  const { courses } = useContext(CoursesContext);
  const [currentTab, setCurrentTab] = useState(0);
  
  // State for all dialog controls
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
    type: 'document', // document, video, etc.
    content: ''
  });
  const [assignmentData, setAssignmentData] = useState({
    title: '',
    description: '',
    dueDate: new Date(),
    points: 10
  });

  // Sample data for the dashboard
  const teacherCourses = [
    { id: 1, title: 'JavaScript Fundamentals', students: 45, completed: 18 },
    { id: 2, title: 'Modern Web Development', students: 32, completed: 12 },
    { id: 3, title: 'Database Management', students: 28, completed: 9 }
  ];

  const upcomingLiveClasses = [
    { id: 1, title: 'JavaScript ES6 Features', course: 'JavaScript Fundamentals', startTime: '2025-05-02T14:00:00', meetLink: 'https://meet.google.com/abc-defg-hij' },
    { id: 2, title: 'React Components Deep Dive', course: 'Modern Web Development', startTime: '2025-05-03T15:30:00', meetLink: 'https://meet.google.com/xyz-abcd-efg' }
  ];

  const activeQuizzes = [
    { id: 1, title: 'JavaScript Basics Quiz', course: 'JavaScript Fundamentals', startTime: '2025-05-01T10:00:00', submissions: 28 },
    { id: 2, title: 'React Hooks Quiz', course: 'Modern Web Development', startTime: '2025-05-02T14:00:00', submissions: 15 }
  ];

  const recentAssignments = [
    { id: 1, title: 'JS Array Methods Implementation', course: 'JavaScript Fundamentals', dueDate: '2025-05-05T23:59:59', submissions: 22 },
    { id: 2, title: 'Building a React Component Library', course: 'Modern Web Development', dueDate: '2025-05-10T23:59:59', submissions: 8 }
  ];

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  // Format date time
  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString();
  };

  // Handle dialog openings
  const handleOpenQuizDialog = () => {
    setOpenQuizDialog(true);
  };

  const handleOpenLiveClassDialog = () => {
    setOpenLiveClassDialog(true);
  };

  const handleOpenContentDialog = () => {
    setOpenContentDialog(true);
  };

  const handleOpenAssignmentDialog = () => {
    setOpenAssignmentDialog(true);
  };

  // Handle dialog closings
  const handleCloseQuizDialog = () => {
    setOpenQuizDialog(false);
  };

  const handleCloseLiveClassDialog = () => {
    setOpenLiveClassDialog(false);
  };

  const handleCloseContentDialog = () => {
    setOpenContentDialog(false);
  };

  const handleCloseAssignmentDialog = () => {
    setOpenAssignmentDialog(false);
  };

  // Handle form submissions
  const handleCreateQuiz = () => {
    console.log('Creating quiz:', { course: selectedCourse, ...quizData });
    // Here you would send this data to your API
    handleCloseQuizDialog();
    // Reset form
    setSelectedCourse('');
    setQuizData({
      title: '',
      description: '',
      startTime: new Date(),
      duration: 30,
      questions: []
    });
  };

  const handleCreateLiveClass = () => {
    console.log('Creating live class:', { course: selectedCourse, ...liveClassData });
    // Here you would send this data to your API
    handleCloseLiveClassDialog();
    // Reset form
    setSelectedCourse('');
    setLiveClassData({
      title: '',
      description: '',
      meetLink: '',
      startTime: new Date(),
      duration: 60
    });
  };

  const handleAddContent = () => {
    console.log('Adding content:', { course: selectedCourse, ...contentData });
    // Here you would send this data to your API
    handleCloseContentDialog();
    // Reset form
    setSelectedCourse('');
    setContentData({
      title: '',
      description: '',
      type: 'document',
      content: ''
    });
  };

  const handleCreateAssignment = () => {
    console.log('Creating assignment:', { course: selectedCourse, ...assignmentData });
    // Here you would send this data to your API
    handleCloseAssignmentDialog();
    // Reset form
    setSelectedCourse('');
    setAssignmentData({
      title: '',
      description: '',
      dueDate: new Date(),
      points: 10
    });
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
          {/* Quick Stats */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, borderRadius: '12px' }}>
              <Typography variant="h6" gutterBottom>Quick Statistics</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <Card sx={{ backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
                    <CardContent>
                      <Typography variant="h5">{teacherCourses.length}</Typography>
                      <Typography variant="body2">Active Courses</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card sx={{ backgroundColor: '#e8f5e9', borderRadius: '8px' }}>
                    <CardContent>
                      <Typography variant="h5">{teacherCourses.reduce((acc, course) => acc + course.students, 0)}</Typography>
                      <Typography variant="body2">Total Students</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card sx={{ backgroundColor: '#fff8e1', borderRadius: '8px' }}>
                    <CardContent>
                      <Typography variant="h5">{activeQuizzes.length}</Typography>
                      <Typography variant="body2">Active Quizzes</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card sx={{ backgroundColor: '#f3e5f5', borderRadius: '8px' }}>
                    <CardContent>
                      <Typography variant="h5">{upcomingLiveClasses.length}</Typography>
                      <Typography variant="body2">Upcoming Classes</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, borderRadius: '12px' }}>
              <Typography variant="h6" gutterBottom>Quick Actions</Typography>
              <Grid container spacing={2}>
                <Grid item>
                  <Button 
                    variant="contained" 
                    startIcon={<QuizIcon />}
                    onClick={handleOpenQuizDialog}
                  >
                    Create Quiz
                  </Button>
                </Grid>
                <Grid item>
                  <Button 
                    variant="contained" 
                    startIcon={<VideoCallIcon />}
                    onClick={handleOpenLiveClassDialog}
                  >
                    Schedule Class
                  </Button>
                </Grid>
                <Grid item>
                  <Button 
                    variant="contained" 
                    startIcon={<BookIcon />}
                    onClick={handleOpenContentDialog}
                  >
                    Add Content
                  </Button>
                </Grid>
                <Grid item>
                  <Button 
                    variant="contained" 
                    startIcon={<AssignmentIcon />}
                    onClick={handleOpenAssignmentDialog}
                  >
                    Create Assignment
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Upcoming Classes */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, borderRadius: '12px', height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Upcoming Live Classes</Typography>
                <IconButton color="primary" onClick={handleOpenLiveClassDialog}>
                  <AddIcon />
                </IconButton>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <List>
                {upcomingLiveClasses.map((liveClass) => (
                  <ListItem 
                    key={liveClass.id}
                    secondaryAction={
                      <IconButton edge="end" color="primary">
                        <LinkIcon />
                      </IconButton>
                    }
                    sx={{ 
                      mb: 1, 
                      borderRadius: '8px',
                      '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' } 
                    }}
                  >
                    <ListItemText
                      primary={liveClass.title}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            {liveClass.course}
                          </Typography>
                          {` — ${formatDateTime(liveClass.startTime)}`}
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Active Quizzes */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, borderRadius: '12px', height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Active Quizzes</Typography>
                <IconButton color="primary" onClick={handleOpenQuizDialog}>
                  <AddIcon />
                </IconButton>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <List>
                {activeQuizzes.map((quiz) => (
                  <ListItem 
                    key={quiz.id}
                    secondaryAction={
                      <Chip 
                        label={`${quiz.submissions} submissions`} 
                        size="small" 
                        color="primary" 
                      />
                    }
                    sx={{ 
                      mb: 1, 
                      borderRadius: '8px',
                      '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' } 
                    }}
                  >
                    <ListItemText
                      primary={quiz.title}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            {quiz.course}
                          </Typography>
                          {` — ${formatDateTime(quiz.startTime)}`}
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Courses Tab */}
      <TabPanel value={currentTab} index={1}>
        <Typography variant="h4" gutterBottom>
          My Courses
        </Typography>
        <Grid container spacing={3}>
          {teacherCourses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <Card sx={{ 
                borderRadius: '12px', 
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                }
              }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{course.title}</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Students:</strong> {course.students}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Completed:</strong> {course.completed}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button startIcon={<BookIcon />} size="small">
                      Content
                    </Button>
                    <Button startIcon={<QuizIcon />} size="small">
                      Quizzes
                    </Button>
                    <Button startIcon={<VideoCallIcon />} size="small">
                      Classes
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Quizzes Tab */}
      <TabPanel value={currentTab} index={2}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">
            Quizzes
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={handleOpenQuizDialog}
          >
            Create Quiz
          </Button>
        </Box>
        
        <Grid container spacing={3}>
          {activeQuizzes.map((quiz) => (
            <Grid item xs={12} sm={6} md={4} key={quiz.id}>
              <Card sx={{ 
                borderRadius: '12px', 
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                height: '100%'
              }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{quiz.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Course: {quiz.course}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Start: {formatDateTime(quiz.startTime)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Submissions: {quiz.submissions}
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Button startIcon={<EditIcon />} size="small">
                      Edit
                    </Button>
                    <Button startIcon={<DeleteIcon />} size="small" color="error">
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Live Classes Tab */}
      <TabPanel value={currentTab} index={3}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">
            Live Classes
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={handleOpenLiveClassDialog}
          >
            Schedule Class
          </Button>
        </Box>
        
        <Grid container spacing={3}>
          {upcomingLiveClasses.map((liveClass) => (
            <Grid item xs={12} sm={6} md={4} key={liveClass.id}>
              <Card sx={{ 
                borderRadius: '12px', 
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                height: '100%'
              }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{liveClass.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Course: {liveClass.course}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Start: {formatDateTime(liveClass.startTime)}
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Button 
                      variant="contained" 
                      startIcon={<LinkIcon />} 
                      color="primary"
                      href={liveClass.meetLink}
                      target="_blank"
                    >
                      Join
                    </Button>
                    <Button startIcon={<EditIcon />} size="small">
                      Edit
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Assignments Tab */}
      <TabPanel value={currentTab} index={4}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">
            Assignments
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={handleOpenAssignmentDialog}
          >
            Create Assignment
          </Button>
        </Box>
        
        <Grid container spacing={3}>
          {recentAssignments.map((assignment) => (
            <Grid item xs={12} sm={6} md={4} key={assignment.id}>
              <Card sx={{ 
                borderRadius: '12px', 
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                height: '100%'
              }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{assignment.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Course: {assignment.course}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Due: {formatDateTime(assignment.dueDate)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Submissions: {assignment.submissions}
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Button startIcon={<EditIcon />} size="small">
                      Edit
                    </Button>
                    <Button size="small" color="primary">
                      View Submissions
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Create Quiz Dialog */}
      <Dialog open={openQuizDialog} onClose={handleCloseQuizDialog} maxWidth="md" fullWidth>
        <DialogTitle>Create New Quiz</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Course</InputLabel>
                <Select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  label="Course"
                >
                  {teacherCourses.map((course) => (
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
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                value={quizData.description}
                onChange={(e) => setQuizData({...quizData, description: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="Start Time"
                  value={quizData.startTime}
                  onChange={(newValue) => setQuizData({...quizData, startTime: newValue})}
                  renderInput={(params) => <TextField {...params} fullWidth required />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                type="number"
                label="Duration (minutes)"
                value={quizData.duration}
                onChange={(e) => setQuizData({...quizData, duration: parseInt(e.target.value)})}
                InputProps={{ inputProps: { min: 5, max: 180 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                After creating the quiz, you'll be able to add questions.
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseQuizDialog}>Cancel</Button>
          <Button onClick={handleCreateQuiz} variant="contained" disabled={!selectedCourse || !quizData.title}>
            Create Quiz
          </Button>
        </DialogActions>
      </Dialog>

      {/* Schedule Live Class Dialog */}
      <Dialog open={openLiveClassDialog} onClose={handleCloseLiveClassDialog} maxWidth="md" fullWidth>
        <DialogTitle>Schedule Live Class</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Course</InputLabel>
                <Select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  label="Course"
                >
                  {teacherCourses.map((course) => (
                    <MenuItem key={course.id} value={course.id}>{course.title}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Class Title"
                value={liveClassData.title}
                onChange={(e) => setLiveClassData({...liveClassData, title: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                value={liveClassData.description}
                onChange={(e) => setLiveClassData({...liveClassData, description: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Google Meet Link"
                value={liveClassData.meetLink}
                onChange={(e) => setLiveClassData({...liveClassData, meetLink: e.target.value})}
                placeholder="https://meet.google.com/xxx-xxxx-xxx"
              />
              <FormHelperText>
                Create a Google Meet link and paste it here. This will be shared with enrolled students.
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="Start Time"
                  value={liveClassData.startTime}
                  onChange={(newValue) => setLiveClassData({...liveClassData, startTime: newValue})}
                  renderInput={(params) => <TextField {...params} fullWidth required />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                type="number"
                label="Duration (minutes)"
                value={liveClassData.duration}
                onChange={(e) => setLiveClassData({...liveClassData, duration: parseInt(e.target.value)})}
                InputProps={{ inputProps: { min: 15, max: 180 } }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLiveClassDialog}>Cancel</Button>
          <Button 
            onClick={handleCreateLiveClass} 
            variant="contained" 
            disabled={!selectedCourse || !liveClassData.title || !liveClassData.meetLink}
          >
            Schedule Class
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Course Content Dialog */}
      <Dialog open={openContentDialog} onClose={handleCloseContentDialog} maxWidth="md" fullWidth>
        <DialogTitle>Add Course Content</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Course</InputLabel>
                <Select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  label="Course"
                >
                  {teacherCourses.map((course) => (
                    <MenuItem key={course.id} value={course.id}>{course.title}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Content Title"
                value={contentData.title}
                onChange={(e) => setContentData({...contentData, title: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                value={contentData.description}
                onChange={(e) => setContentData({...contentData, description: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Content Type</InputLabel>
                <Select
                  value={contentData.type}
                  onChange={(e) => setContentData({...contentData, type: e.target.value})}
                  label="Content Type"
                >
                  <MenuItem value="document">Document</MenuItem>
                  <MenuItem value="video">Video Link</MenuItem>
                  <MenuItem value="presentation">Presentation</MenuItem>
                  <MenuItem value="link">External Resource</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              {contentData.type === 'video' || contentData.type === 'link' ? (
                <TextField
                  fullWidth
                  required
                  label="