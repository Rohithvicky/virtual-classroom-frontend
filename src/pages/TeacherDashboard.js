import React, { useState, useContext, useEffect } from 'react';
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
  IconButton,
  Chip,
} from '@mui/material';
import {
  Book as BookIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Announcement as AnnouncementIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Quiz as QuizIcon,
  Class as ClassIcon,
} from '@mui/icons-material';
import { CoursesContext } from '../contexts/CoursesContext';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TabPanel from '../components/TabPanel';

const TeacherDashboard = () => {
  const {
    courses = [],
    setCourses,
    liveQuizzes = [],
    liveClasses = [],
    setLiveQuizzes,
    setLiveClasses,
    assignments = [],
    setAssignments,
  } = useContext(CoursesContext) || {};

  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [currentItem, setCurrentItem] = useState(null);

  const [formState, setFormState] = useState({
    title: '',
    description: '',
    date: new Date(),
    courseId: '',
    meetLink: '', // Added meetLink for live classes
  });

  useEffect(() => {
    if (!courses.length) {
      setCourses([
        { id: 1, title: 'Math 101', description: 'Basic Mathematics', category: 'Mathematics', students: 30 },
        { id: 2, title: 'Physics 101', description: 'Introduction to Physics', category: 'Science', students: 25 },
      ]);
    }
  }, [courses, setCourses]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = (type, item = null) => {
    setDialogType(type);
    if (item) {
      setCurrentItem(item);
      setFormState({
        title: item.title,
        description: item.description || '',
        date: item.date || new Date(),
        courseId: item.courseId || '',
        meetLink: item.meetLink || '', // Pre-fill meetLink if editing
      });
    } else {
      setFormState({
        title: '',
        description: '',
        date: new Date(),
        courseId: '',
        meetLink: '', // Reset meetLink for new entries
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentItem(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (dialogType === 'quiz') {
      if (currentItem) {
        const updatedQuizzes = liveQuizzes.map((quiz) =>
          quiz.id === currentItem.id ? { ...quiz, ...formState } : quiz
        );
        setLiveQuizzes(updatedQuizzes);
      } else {
        const newQuiz = {
          id: liveQuizzes.length + 1,
          ...formState,
        };
        setLiveQuizzes([...liveQuizzes, newQuiz]);
      }
    } else if (dialogType === 'class') {
      if (currentItem) {
        const updatedClasses = liveClasses.map((liveClass) =>
          liveClass.id === currentItem.id ? { ...liveClass, ...formState } : liveClass
        );
        setLiveClasses(updatedClasses);
      } else {
        const newClass = {
          id: liveClasses.length + 1,
          ...formState,
        };
        setLiveClasses([...liveClasses, newClass]);
      }
    } else if (dialogType === 'assignment') {
      if (currentItem) {
        const updatedAssignments = assignments.map((assignment) =>
          assignment.id === currentItem.id ? { ...assignment, ...formState } : assignment
        );
        setAssignments(updatedAssignments);
      } else {
        const newAssignment = {
          id: assignments.length + 1,
          ...formState,
        };
        setAssignments([...assignments, newAssignment]);
      }
    }
    handleCloseDialog();
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Teacher Dashboard
      </Typography>

      <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
        <Tab label="Courses" icon={<BookIcon />} />
        <Tab label="Students" icon={<PeopleIcon />} />
        <Tab label="Assignments" icon={<AssignmentIcon />} />
        <Tab label="Announcements" icon={<AnnouncementIcon />} />
        <Tab label="Live Quizzes" icon={<QuizIcon />} />
        <Tab label="Live Classes" icon={<ClassIcon />} />
      </Tabs>

      {/* Courses Tab */}
      <TabPanel value={tabValue} index={0}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog('course')}>
            Add Course
          </Button>
        </Box>
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{course.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.description}
                  </Typography>
                  <Chip label={course.category} size="small" sx={{ mt: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Typography variant="caption">{course.students} students</Typography>
                    <Box>
                      <IconButton onClick={() => handleOpenDialog('course', course)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton onClick={() => setCourses(courses.filter((c) => c.id !== course.id))}>
                        <DeleteIcon fontSize="small" color="error" />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Assignments Tab */}
      <TabPanel value={tabValue} index={2}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog('assignment')}>
            Add Assignment
          </Button>
        </Box>
        <Grid container spacing={3}>
          {assignments.map((assignment) => (
            <Grid item xs={12} sm={6} md={4} key={assignment.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{assignment.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Course: {courses.find((course) => course.id === assignment.courseId)?.title || 'Unknown'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Due Date: {new Date(assignment.date).toLocaleDateString()}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <IconButton onClick={() => handleOpenDialog('assignment', assignment)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => setAssignments(assignments.filter((a) => a.id !== assignment.id))}>
                      <DeleteIcon fontSize="small" color="error" />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Live Quizzes Tab */}
      <TabPanel value={tabValue} index={4}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog('quiz')}>
            Add Quiz
          </Button>
        </Box>
        <Grid container spacing={3}>
          {liveQuizzes.map((quiz) => (
            <Grid item xs={12} sm={6} md={4} key={quiz.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{quiz.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Date: {new Date(quiz.date).toLocaleDateString()}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <IconButton onClick={() => handleOpenDialog('quiz', quiz)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => setLiveQuizzes(liveQuizzes.filter((q) => q.id !== quiz.id))}>
                      <DeleteIcon fontSize="small" color="error" />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Live Classes Tab */}
      <TabPanel value={tabValue} index={5}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog('class')}>
            Add Class
          </Button>
        </Box>
        <Grid container spacing={3}>
          {liveClasses.map((liveClass) => (
            <Grid item xs={12} sm={6} md={4} key={liveClass.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{liveClass.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Date: {new Date(liveClass.date).toLocaleDateString()}
                  </Typography>
                  {liveClass.meetLink && (
                    <Typography variant="body2" color="primary">
                      <a href={liveClass.meetLink} target="_blank" rel="noopener noreferrer">
                        Join Google Meet
                      </a>
                    </Typography>
                  )}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <IconButton onClick={() => handleOpenDialog('class', liveClass)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => setLiveClasses(liveClasses.filter((c) => c.id !== liveClass.id))}>
                      <DeleteIcon fontSize="small" color="error" />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Dialog for Adding/Editing */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {currentItem
            ? `Edit ${dialogType === 'quiz' ? 'Quiz' : dialogType === 'class' ? 'Class' : 'Assignment'}`
            : `Add ${dialogType === 'quiz' ? 'Quiz' : dialogType === 'class' ? 'Class' : 'Assignment'}`}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleFormSubmit} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Title"
              value={formState.title}
              onChange={(e) => setFormState({ ...formState, title: e.target.value })}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              value={formState.description}
              onChange={(e) => setFormState({ ...formState, description: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              select
              label="Course"
              value={formState.courseId}
              onChange={(e) => setFormState({ ...formState, courseId: e.target.value })}
              SelectProps={{ native: true }}
              required
              sx={{ mb: 2 }}
            >
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </TextField>
            {dialogType === 'class' && (
              <TextField
                fullWidth
                label="Google Meet Link"
                value={formState.meetLink}
                onChange={(e) => setFormState({ ...formState, meetLink: e.target.value })}
                placeholder="https://meet.google.com/..."
                sx={{ mb: 2 }}
              />
            )}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Date"
                value={formState.date}
                onChange={(newValue) => setFormState({ ...formState, date: newValue })}
                renderInput={(params) => <TextField {...params} fullWidth required sx={{ mb: 2 }} />}
              />
            </LocalizationProvider>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleFormSubmit} variant="contained">
            {currentItem ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TeacherDashboard;