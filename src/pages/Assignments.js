import React, { useState, useMemo, useContext } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Chip, 
  Button, 
  Tabs, 
  Tab, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton, 
  LinearProgress,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Badge,
  Divider,
  Avatar,
  Stack
} from '@mui/material';
import { 
  Assignment, 
  Search, 
  Add, 
  CheckCircle, 
  Schedule, 
  Download, 
  CalendarToday, 
  ArrowForward, 
  Attachment,
  Person,
  Description,
  School
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { CoursesContext } from '../contexts/CoursesContext';

// Mock data for assignments
const mockAssignments = [
  {
    id: 1,
    title: 'Introduction to React Hooks',
    course: 'Web Development with React',
    dueDate: '2025-05-05T23:59:00',
    status: 'upcoming',
    points: 100,
    scored: null,
    attachments: 2
  },
  {
    id: 2,
    title: 'Java OOP Principles',
    course: 'Java Programming',
    dueDate: '2025-05-02T23:59:00',
    status: 'upcoming',
    points: 50,
    scored: null,
    attachments: 1
  },
  {
    id: 3,
    title: 'Data Analysis Project',
    course: 'Foundations of Data Science',
    dueDate: '2025-04-18T23:59:00',
    status: 'submitted',
    points: 150,
    scored: null,
    submittedOn: '2025-04-17T14:30:00',
    attachments: 3
  }
];

// Enhanced course data with more details
const enhancedCourses = [
  {
    id: 1,
    title: 'Java Programming',
    description: 'Learn Java programming basics from scratch.',
    instructor: 'Prof. Johnson',
    enrolled: true,
    color: '#4e342e',
    duration: '8 weeks',
    startDate: '2025-06-01',
    syllabus: [
      'Introduction to Java',
      'Object-Oriented Programming',
      'Collections Framework',
      'Exception Handling',
      'Multithreading'
    ],
    assignments: mockAssignments.filter(a => a.course === 'Java Programming')
  },
  {
    id: 2,
    title: 'Foundations of Data Science',
    description: 'Introduction to data science concepts and tools.',
    instructor: 'Dr. Patel',
    enrolled: false,
    color: '#1565c0',
    duration: '10 weeks',
    startDate: '2025-06-15',
    syllabus: [
      'Python for Data Science',
      'Data Visualization',
      'Statistical Analysis',
      'Machine Learning Basics',
      'Data Cleaning Techniques'
    ],
    assignments: mockAssignments.filter(a => a.course === 'Foundations of Data Science')
  },
  {
    id: 3,
    title: 'Web Development with React',
    description: 'Master React and build modern web applications.',
    instructor: 'Ms. Lee',
    enrolled: true,
    color: '#6a1b9a',
    duration: '6 weeks',
    startDate: '2025-07-01',
    syllabus: [
      'React Fundamentals',
      'Hooks and Context API',
      'State Management',
      'Routing',
      'API Integration'
    ],
    assignments: mockAssignments.filter(a => a.course === 'Web Development with React')
  }
];

const CourseDetails = ({ course, onEnroll }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Avatar sx={{ bgcolor: course.color, width: 56, height: 56 }}>
          {course.title.charAt(0)}
        </Avatar>
        <Box>
          <Typography variant="h5">{course.title}</Typography>
          <Typography variant="body1" color="text.secondary">
            Instructor: {course.instructor}
          </Typography>
        </Box>
      </Stack>
      
      <Divider sx={{ my: 2 }} />
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <Description sx={{ mr: 1 }} /> Course Description
          </Typography>
          <Typography variant="body1" paragraph>
            {course.description}
          </Typography>
          
          <Typography variant="h6" gutterBottom sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
            <Person sx={{ mr: 1 }} /> Instructor
          </Typography>
          <Typography variant="body1">
            {course.instructor}
          </Typography>
          
          <Typography variant="h6" gutterBottom sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
            <School sx={{ mr: 1 }} /> Course Details
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <Typography component="li" variant="body1">
              Duration: {course.duration}
            </Typography>
            <Typography component="li" variant="body1">
              Start Date: {course.startDate}
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <Assignment sx={{ mr: 1 }} /> Syllabus
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            {course.syllabus.map((item, index) => (
              <Typography key={index} component="li" variant="body1">
                {item}
              </Typography>
            ))}
          </Box>
          
          <Typography variant="h6" gutterBottom sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
            <Assignment sx={{ mr: 1 }} /> Assignments
          </Typography>
          {course.assignments.length > 0 ? (
            <Box component="ul" sx={{ pl: 2 }}>
              {course.assignments.map((assignment) => (
                <Typography key={assignment.id} component="li" variant="body1">
                  {assignment.title} - Due {new Date(assignment.dueDate).toLocaleDateString()}
                </Typography>
              ))}
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No assignments yet
            </Typography>
          )}
        </Grid>
      </Grid>
      
      <Divider sx={{ my: 3 }} />
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        {course.enrolled ? (
          <Chip label="Enrolled" color="success" sx={{ px: 2, py: 1, fontSize: '1rem' }} />
        ) : (
          <Button 
            variant="contained" 
            size="large"
            onClick={() => onEnroll(course.id)}
          >
            Enroll Now
          </Button>
        )}
      </Box>
    </Box>
  );
};

const Assignments = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [courseDialogOpen, setCourseDialogOpen] = useState(false);
  const [courses, setCourses] = useState(enhancedCourses);

  // Get enrolled courses
  const enrolledCourses = courses.filter(course => course.enrolled);

  // Get all assignments from enrolled courses
  const enrolledAssignments = enrolledCourses.flatMap(course => 
    course.assignments.map(assignment => ({
      ...assignment,
      courseId: course.id
    }))
  );

  // Calculate assignment statistics
  const assignmentStats = useMemo(() => {
    const totalAssignments = enrolledAssignments.length;
    const completedAssignments = enrolledAssignments.filter(
      a => a.status === 'graded' || a.status === 'late'
    ).length;
    const upcomingAssignments = enrolledAssignments.filter(
      a => a.status === 'upcoming'
    ).length;

    const gradedAssignments = enrolledAssignments.filter(
      a => a.status === 'graded' || a.status === 'late'
    );
    const averageScore = gradedAssignments.length > 0
      ? Math.round(
          gradedAssignments.reduce(
            (sum, a) => sum + (a.scored / a.points) * 100, 
            0
          ) / gradedAssignments.length
        )
      : 0;

    return {
      totalAssignments,
      completedAssignments,
      upcomingAssignments,
      completionPercentage: totalAssignments > 0
        ? Math.round((completedAssignments / totalAssignments) * 100)
        : 0,
      averageScore,
    };
  }, [enrolledAssignments]);

  // Filter assignments based on tab and search
  const filteredAssignments = enrolledAssignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.course.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (tabValue === 0) return matchesSearch;
    if (tabValue === 1) return assignment.status === 'upcoming' && matchesSearch;
    if (tabValue === 2) return assignment.status === 'submitted' && matchesSearch;
    if (tabValue === 3) return (assignment.status === 'graded' || assignment.status === 'late') && matchesSearch;
    
    return matchesSearch;
  });

  const handleEnroll = (courseId) => {
    setCourses(courses.map(course => 
      course.id === courseId ? { ...course, enrolled: true } : course
    ));
    alert(`Successfully enrolled in course!`);
    setCourseDialogOpen(false);
  };

  const handleViewCourse = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    setSelectedCourse(course);
    setCourseDialogOpen(true);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAssignmentClick = (assignment) => {
    setSelectedAssignment(assignment);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
  };

  const handleCloseCourseDialog = () => {
    setCourseDialogOpen(false);
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'upcoming': return <Schedule color="primary" />;
      case 'submitted': return <CheckCircle color="info" />;
      case 'graded': return <CheckCircle color="success" />;
      case 'late': return <CheckCircle color="warning" />;
      default: return <Assignment />;
    }
  };

  const formatDueDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.round((date - now) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    if (diffDays > 1 && diffDays < 7) return `Due in ${diffDays} days`;
    return date.toLocaleDateString();
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          {user?.role === 'teacher' ? 'Manage Assignments' : 'My Assignments'}
        </Typography>
        {user?.role === 'teacher' && (
          <Button variant="contained" color="primary" startIcon={<Add />}>
            Create Assignment
          </Button>
        )}
      </Box>
      
      {/* Courses Summary Card */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            My Enrolled Courses
          </Typography>
          {enrolledCourses.length > 0 ? (
            <Grid container spacing={2}>
              {enrolledCourses.map((course) => (
                <Grid item xs={12} sm={6} md={4} key={course.id}>
                  <Card 
                    variant="outlined"
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer',
                      '&:hover': {
                        boxShadow: 2,
                      }
                    }}
                    onClick={() => handleViewCourse(course.id)}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                        <Avatar sx={{ bgcolor: course.color, mr: 2 }}>
                          {course.title.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1">{course.title}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {course.instructor}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body2" paragraph>
                        {course.description.substring(0, 100)}...
                      </Typography>
                      <Chip 
                        label={`${course.assignments.length} assignments`} 
                        size="small" 
                        variant="outlined"
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                You haven't enrolled in any courses yet.
              </Typography>
              <Button 
                variant="outlined" 
                onClick={() => setCourseDialogOpen(true)}
              >
                Browse Available Courses
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Assignments Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              aria-label="assignment tabs"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="All" />
              <Tab 
                label={
                  <Badge badgeContent={assignmentStats.upcomingAssignments} color="error">
                    Upcoming
                  </Badge>
                } 
              />
              <Tab label="Submitted" />
              <Tab label="Graded" />
            </Tabs>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
            <TextField
              placeholder="Search assignments..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ width: { xs: '100%', sm: '300px' } }}
            />
          </Box>
          
          <TableContainer component={Paper} variant="outlined">
            <Table sx={{ minWidth: 650 }} aria-label="assignments table">
              <TableHead>
                <TableRow>
                  <TableCell>Assignment</TableCell>
                  <TableCell>Course</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Points</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAssignments.length > 0 ? (
                  filteredAssignments.map((assignment) => (
                    <TableRow 
                      key={assignment.id}
                      hover
                      onClick={() => handleAssignmentClick(assignment)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {getStatusIcon(assignment.status)}
                          <Typography sx={{ ml: 1.5 }}>{assignment.title}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{assignment.course}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CalendarToday fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                          {formatDueDate(assignment.dueDate)}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)} 
                          color={
                            assignment.status === 'graded' ? 'success' : 
                            assignment.status === 'submitted' ? 'info' : 
                            assignment.status === 'late' ? 'warning' : 'primary'
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="right">
                        {assignment.scored !== null 
                          ? `${assignment.scored}/${assignment.points}`
                          : assignment.points
                        }
                      </TableCell>
                      <TableCell align="right">
                        <IconButton 
                          color="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAssignmentClick(assignment);
                          }}
                        >
                          <ArrowForward />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography variant="body1" sx={{ py: 3 }}>
                        {enrolledCourses.length === 0 
                          ? 'Enroll in courses to see assignments'
                          : 'No assignments found matching your criteria.'
                        }
                      </Typography>
                      {enrolledCourses.length === 0 && (
                        <Button 
                          variant="outlined" 
                          onClick={() => setCourseDialogOpen(true)}
                        >
                          Browse Courses
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      
      {/* Progress Summary Card */}
      {enrolledCourses.length > 0 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Assignment Progress</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Completed vs. Total Assignments
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={assignmentStats.completionPercentage} 
                      sx={{ height: 10, borderRadius: 5 }}
                    />
                  </Box>
                  <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color="text.secondary">
                      {assignmentStats.completionPercentage}%
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {assignmentStats.completedAssignments} of {assignmentStats.totalAssignments} assignments completed
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Average Score
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={assignmentStats.averageScore} 
                      sx={{ height: 10, borderRadius: 5 }}
                      color="success"
                    />
                  </Box>
                  <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color="text.secondary">
                      {assignmentStats.averageScore}%
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Average score across all graded assignments
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
      
      {/* Available Courses Dialog */}
      <Dialog
        open={courseDialogOpen}
        onClose={handleCloseCourseDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Available Courses</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            {courses.map((course) => (
              <Grid item xs={12} key={course.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ bgcolor: course.color, mr: 2 }}>
                          {course.title.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="h6">{course.title}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Instructor: {course.instructor}
                          </Typography>
                        </Box>
                      </Box>
                      <Button 
                        variant={course.enrolled ? "text" : "outlined"}
                        color={course.enrolled ? "success" : "primary"}
                        onClick={() => course.enrolled ? null : handleEnroll(course.id)}
                        disabled={course.enrolled}
                      >
                        {course.enrolled ? 'Enrolled' : 'Enroll'}
                      </Button>
                    </Box>
                    <Typography variant="body2" sx={{ mt: 2 }}>
                      {course.description}
                    </Typography>
                    <Box sx={{ display: 'flex', mt: 2 }}>
                      <Chip 
                        label={course.duration} 
                        size="small" 
                        variant="outlined" 
                        sx={{ mr: 1 }}
                      />
                      <Chip 
                        label={`Starts ${course.startDate}`} 
                        size="small" 
                        variant="outlined" 
                        sx={{ mr: 1 }}
                      />
                      <Chip 
                        label={`${course.assignments.length} assignments`} 
                        size="small" 
                        variant="outlined"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCourseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
      
      {/* Assignment Details Dialog */}
      <Dialog
        open={detailsOpen}
        onClose={handleCloseDetails}
        fullWidth
        maxWidth="md"
      >
        {selectedAssignment && (
          <>
            <DialogTitle>
              <Typography variant="h5">{selectedAssignment.title}</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {selectedAssignment.course}
              </Typography>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">Due Date</Typography>
                  <Typography variant="body1" gutterBottom>
                    {new Date(selectedAssignment.dueDate).toLocaleString()}
                  </Typography>
                  
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>Status</Typography>
                  <Chip 
                    label={selectedAssignment.status.charAt(0).toUpperCase() + selectedAssignment.status.slice(1)} 
                    color={
                      selectedAssignment.status === 'graded' ? 'success' : 
                      selectedAssignment.status === 'submitted' ? 'info' : 
                      selectedAssignment.status === 'late' ? 'warning' : 'primary'
                    }
                    size="medium"
                    sx={{ mt: 0.5 }}
                  />
                  
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>Points</Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedAssignment.points}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  {selectedAssignment.submittedOn && (
                    <>
                      <Typography variant="subtitle2" color="text.secondary">Submitted On</Typography>
                      <Typography variant="body1" gutterBottom>
                        {new Date(selectedAssignment.submittedOn).toLocaleString()}
                      </Typography>
                    </>
                  )}
                  
                  {selectedAssignment.scored !== null && (
                    <>
                      <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>Score</Typography>
                      <Typography variant="body1" gutterBottom>
                        {selectedAssignment.scored} / {selectedAssignment.points} ({Math.round(selectedAssignment.scored / selectedAssignment.points * 100)}%)
                      </Typography>
                    </>
                  )}
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">Attachments</Typography>
                  <Box sx={{ mt: 1 }}>
                    {[...Array(selectedAssignment.attachments)].map((_, index) => (
                      <Button 
                        key={index}
                        startIcon={<Attachment />} 
                        size="small" 
                        sx={{ mr: 1, mb: 1 }}
                      >
                        {selectedAssignment.title.split(' ')[0].toLowerCase()}_file_{index + 1}.pdf
                      </Button>
                    ))}
                  </Box>
                </Grid>
                
                {selectedAssignment.feedback && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">Feedback</Typography>
                    <Card variant="outlined" sx={{ mt: 1, backgroundColor: '#f9f9f9' }}>
                      <CardContent>
                        <Typography variant="body2">{selectedAssignment.feedback}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                )}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDetails}>Close</Button>
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => {
                  handleViewCourse(selectedAssignment.courseId);
                  handleCloseDetails();
                }}
              >
                View Course
              </Button>
              {selectedAssignment.status === 'upcoming' && (
                <Button variant="contained" color="secondary">
                  Submit Assignment
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Assignments;