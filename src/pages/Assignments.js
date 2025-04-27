import React, { useState } from 'react';
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
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Badge,
  Divider
} from '@mui/material';
import { 
  Assignment, 
  Search, 
  FilterList, 
  Sort, 
  Add, 
  CheckCircle, 
  Schedule, 
  Download, 
  CalendarToday, 
  ArrowForward, 
  Attachment
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { courses } from './CourseList'; // Import the courses array

// Mock data for assignments
const mockAssignments = [
  {
    id: 1,
    title: 'Introduction to React Hooks',
    course: 'Modern Web Development',
    dueDate: '2025-05-05T23:59:00',
    status: 'upcoming',
    points: 100,
    scored: null,
    attachments: 2
  },
  {
    id: 2,
    title: 'JavaScript Array Methods',
    course: 'JavaScript Fundamentals',
    dueDate: '2025-05-02T23:59:00',
    status: 'upcoming',
    points: 50,
    scored: null,
    attachments: 1
  },
  {
    id: 3,
    title: 'CSS Grid Layout Project',
    course: 'Advanced CSS Techniques',
    dueDate: '2025-04-18T23:59:00',
    status: 'submitted',
    points: 150,
    scored: null,
    submittedOn: '2025-04-17T14:30:00',
    attachments: 3
  },
  {
    id: 4,
    title: 'Database Schema Design',
    course: 'Database Management',
    dueDate: '2025-04-15T23:59:00',
    status: 'graded',
    points: 100,
    scored: 92,
    submittedOn: '2025-04-14T16:45:00',
    feedback: 'Excellent work! Your schema is well normalized.',
    attachments: 2
  },
  {
    id: 5,
    title: 'API Authentication Methods',
    course: 'Backend Development',
    dueDate: '2025-04-10T23:59:00',
    status: 'graded',
    points: 80,
    scored: 75,
    submittedOn: '2025-04-09T22:30:00',
    feedback: 'Good work, but more detail needed on OAuth implementation.',
    attachments: 1
  },
  {
    id: 6,
    title: 'Mobile Responsive Design',
    course: 'UI/UX Fundamentals',
    dueDate: '2025-04-05T23:59:00',
    status: 'late',
    points: 100,
    scored: 70,
    submittedOn: '2025-04-07T10:15:00',
    feedback: 'Late submission. Good work but needs improvement on tablet layouts.',
    attachments: 2
  }
];

{/* Assignment Details Component */}
const AssignmentDetails = ({ assignment }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>{assignment.title}</Typography>
      <Divider sx={{ my: 2 }} />
      
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" color="text.secondary">Course</Typography>
          <Typography variant="body1" gutterBottom>{assignment.course}</Typography>
          
          <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>Due Date</Typography>
          <Typography variant="body1" gutterBottom>
            {new Date(assignment.dueDate).toLocaleString()}
          </Typography>
          
          <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>Points</Typography>
          <Typography variant="body1" gutterBottom>{assignment.points}</Typography>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" color="text.secondary">Status</Typography>
          <Chip 
            label={assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)} 
            color={
              assignment.status === 'graded' ? 'success' : 
              assignment.status === 'submitted' ? 'info' : 
              assignment.status === 'late' ? 'warning' : 'primary'
            }
            size="small"
            sx={{ mt: 0.5 }}
          />
          
          {assignment.submittedOn && (
            <>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>Submitted On</Typography>
              <Typography variant="body1" gutterBottom>{new Date(assignment.submittedOn).toLocaleString()}</Typography>
            </>
          )}
          
          {assignment.scored !== null && (
            <>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>Score</Typography>
              <Typography variant="body1" gutterBottom>
                {assignment.scored} / {assignment.points} ({Math.round(assignment.scored / assignment.points * 100)}%)
              </Typography>
            </>
          )}
        </Grid>
        
        {assignment.feedback && (
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>Feedback</Typography>
            <Card variant="outlined" sx={{ mt: 1, backgroundColor: '#f9f9f9' }}>
              <CardContent>
                <Typography variant="body2">{assignment.feedback}</Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
        
        <Grid item xs={12}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>Attachments ({assignment.attachments})</Typography>
          <Box sx={{ mt: 1 }}>
            {[...Array(assignment.attachments)].map((_, index) => (
              <Button 
                key={index}
                startIcon={<Attachment />} 
                size="small" 
                sx={{ mr: 1, mb: 1 }}
              >
                {assignment.title.split(' ')[0].toLowerCase()}_file_{index + 1}.pdf
              </Button>
            ))}
          </Box>
        </Grid>
      </Grid>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        {assignment.status === 'upcoming' && (
          <Button variant="contained" color="primary">
            Submit Assignment
          </Button>
        )}
        {assignment.status === 'submitted' && (
          <Button variant="outlined" color="primary">
            Edit Submission
          </Button>
        )}
        {(assignment.status === 'graded' || assignment.status === 'late') && (
          <Button variant="outlined" color="secondary" startIcon={<Download />}>
            Download Feedback
          </Button>
        )}
      </Box>
    </Box>
  );
};

const Assignments = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Filter enrolled courses
  const enrolledCourses = courses.filter(course => course.enrolled);

  // Filter assignments based on enrolled courses
  const enrolledAssignments = mockAssignments.filter(assignment =>
    enrolledCourses.some(course => course.title === assignment.course)
  );

  // Filter assignments based on tab and search
  const filteredAssignments = enrolledAssignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.course.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (tabValue === 0) return matchesSearch; // All
    if (tabValue === 1) return assignment.status === 'upcoming' && matchesSearch;
    if (tabValue === 2) return assignment.status === 'submitted' && matchesSearch;
    if (tabValue === 3) return (assignment.status === 'graded' || assignment.status === 'late') && matchesSearch;
    
    return matchesSearch;
  });

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

  const upcomingCount = enrolledAssignments.filter(a => a.status === 'upcoming').length;

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Assignments
        </Typography>
        {user?.role === 'teacher' && (
          <Button variant="contained" color="primary" startIcon={<Add />}>
            Create Assignment
          </Button>
        )}
      </Box>
      
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
                  <Badge badgeContent={upcomingCount} color="error">
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
                        No assignments found matching your criteria.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      
      {/* Progress Summary Card */}
      <Card
        sx={{
          mb: 3,
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
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
                    value={60} 
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                  <Typography variant="body2" color="text.secondary">60%</Typography>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ mt: 1 }}>
                3 of 5 assignments completed
              </Typography>
            </Grid>
            {/* Average Score Section */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Average Score
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={82} 
                    sx={{ height: 10, borderRadius: 5 }}
                    color="success"
                  />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                  <Typography variant="body2" color="text.secondary">82%</Typography>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Average score: 82 / 100 points
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
      {/* Assignment Details Dialog */}
      <Dialog
        open={detailsOpen}
        onClose={handleCloseDetails}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle sx={{ pb: 1 }}>
          Assignment Details
        </DialogTitle>
        <DialogContent dividers>
          {selectedAssignment && <AssignmentDetails assignment={selectedAssignment} onClose={handleCloseDetails} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Assignments;