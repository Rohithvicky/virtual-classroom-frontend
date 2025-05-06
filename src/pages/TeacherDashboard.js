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
} from '@mui/icons-material';
import { CoursesContext } from '../contexts/CoursesContext';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import TabPanel from '../components/TabPanel';

const TeacherDashboard = () => {
  const { courses = [], setCourses } = useContext(CoursesContext) || {}; // Fallback for undefined context
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [currentCourse, setCurrentCourse] = useState(null);

  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    category: '',
    thumbnail: null,
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
    if (type === 'course' && item) {
      setCurrentCourse(item);
      setCourseForm({
        title: item.title,
        description: item.description,
        category: item.category,
        thumbnail: item.thumbnail,
      });
    } else {
      setCourseForm({
        title: '',
        description: '',
        category: '',
        thumbnail: null,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentCourse(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (dialogType === 'course') {
      if (currentCourse) {
        const updatedCourses = courses.map((course) =>
          course.id === currentCourse.id ? { ...course, ...courseForm } : course
        );
        setCourses(updatedCourses);
      } else {
        const newCourse = {
          id: courses.length + 1,
          ...courseForm,
          students: 0,
        };
        setCourses([...courses, newCourse]);
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
      </Tabs>

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

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{currentCourse ? 'Edit Course' : 'Add Course'}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleFormSubmit} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Course Title"
              value={courseForm.title}
              onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              value={courseForm.description}
              onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Category"
              value={courseForm.category}
              onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
              required
              sx={{ mb: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleFormSubmit} variant="contained">
            {currentCourse ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TeacherDashboard;