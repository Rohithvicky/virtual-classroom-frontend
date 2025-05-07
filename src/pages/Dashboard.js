import React, { useState, useEffect, useMemo, useContext } from 'react';
import { 
  Typography, Grid, Paper, Box, CardContent, CardActions, Button, Chip, Divider,
  List, ListItem, ListItemText, ListItemIcon, Skeleton, Collapse, IconButton, Badge, LinearProgress, TextField, Alert
} from '@mui/material';
import {
  Announcement as AnnouncementIcon,
  School as SchoolIcon,
  TrendingUp as TrendingUpIcon,
  Person as PersonIcon,
  PriorityHigh as PriorityHighIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Search as SearchIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CoursesContext } from '../contexts/CoursesContext';
import Announcements from './Announcements';

// Animated components
const AnimatedCard = motion(Paper);
const AnimatedButton = motion(Button);

// Color scheme and constants
const colors = {
  primary: '#4a148c',
  secondary: '#ff6f00',
  success: '#2e7d32',
  warning: '#ed6c02',
  error: '#d32f2f',
  info: '#0288d1',
  lightPurple: '#f3e5f5',
  lightOrange: '#fff3e0',
  lightGreen: '#e8f5e9',
  darkPurpleTransparent: 'rgba(74, 20, 140, 0.3)',
  darkOrangeTransparent: 'rgba(255, 111, 0, 0.1)',
  darkGreenTransparent: 'rgba(46, 125, 50, 0.1)',
  whiteTransparent: 'rgba(255,255,255,0.05)',
};

// Animations
const cardAnimation = {
  hover: {
    y: -5,
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    transition: { duration: 0.3 },
  },
};
const buttonAnimation = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.98 },
};

const Dashboard = () => {
  const { currentUser } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const { 
    courses, 
    filteredAssignments, 
    filteredLiveClasses 
  } = useContext(CoursesContext);

  // State
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSection, setExpandedSection] = useState({ courses: true });

  // Filter enrolled courses
  useEffect(() => {
    const enrolled = courses.filter((course) => course.enrolled === true);
    setEnrolledCourses(enrolled);
    setLoading(false);
  }, [courses]);

  // Filter courses based on search query
  const filteredCourses = useMemo(
    () =>
      enrolledCourses.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [enrolledCourses, searchQuery]
  );

  // Expand toggle
  const toggleSection = (section) => {
    setExpandedSection((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 3, md: 4 },
        py: 4,
        bgcolor: theme.palette.mode === 'light' ? '#f8f9fa' : '#121212',
        minHeight: '100vh',
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      }}
    >
      {/* Welcome Banner */}
      <AnimatedCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover="hover"
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          p: { xs: 3, md: 5 },
          mb: 6,
          background: `linear-gradient(135deg, ${colors.primary}, #7b1fa2)`,
          color: 'white',
          borderRadius: 4,
          boxShadow: '0 4px 18px rgba(74, 20, 140, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 3, md: 0 },
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" fontWeight={700} mb={1} component="h1">
            Welcome back, {currentUser?.name || 'Student'}!
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.85, mb: 3 }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </Typography>
          <AnimatedButton
            variant="contained"
            color="secondary"
            whileHover={buttonAnimation.hover}
            whileTap={buttonAnimation.tap}
            sx={{
              bgcolor: colors.secondary,
              color: '#fff',
              px: 5,
              py: 1.5,
              fontWeight: 'bold',
              borderRadius: 3,
              boxShadow: '0 3px 10px rgba(255, 111, 0, 0.6)',
              '&:hover': { bgcolor: '#ff8f00' },
              textTransform: 'none',
            }}
            onClick={() => navigate('/courses')}
          >
            Explore Courses
          </AnimatedButton>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'block' }, opacity: 0.15 }}>
          <SchoolIcon sx={{ fontSize: 140 }} />
        </Box>
      </AnimatedCard>

      {/* Main Content */}
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Grid container spacing={6}>
          {/* Left Column */}
          <Grid item xs={12} md={8}>
            {/* My Courses Section */}
            <AnimatedCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              sx={{
                mb: 5,
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: '0 2px 16px rgba(74, 20, 140, 0.15)',
              }}
            >
              <Box
                sx={{
                  p: 3,
                  bgcolor: theme.palette.mode === 'light' ? colors.lightPurple : colors.darkPurpleTransparent,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Typography variant="h6" fontWeight={700} color={colors.primary}>
                  My Courses
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    size="small"
                    placeholder="Search courses..."
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                      startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />,
                    }}
                    sx={{ mr: 1, width: 240 }}
                  />
                  <IconButton onClick={() => toggleSection('courses')}>
                    {expandedSection.courses ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Box>
              </Box>
              <Collapse in={expandedSection.courses}>
                <Box sx={{ p: 3 }}>
                  {loading ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      {[0, 1, 2].map((i) => (
                        <Skeleton key={i} variant="rectangular" height={130} animation="wave" sx={{ borderRadius: 3 }} />
                      ))}
                    </Box>
                  ) : filteredCourses.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 5 }}>
                      <Typography variant="body1" color="text.secondary">
                        No courses found. {searchQuery ? 'Try a different search.' : 'Enroll in courses to get started.'}
                      </Typography>
                      <Button
                        variant="outlined"
                        sx={{ mt: 3, px: 4, py: 1.5, borderRadius: 3 }}
                        onClick={() => navigate('/courses')}
                      >
                        Browse Courses
                      </Button>
                    </Box>
                  ) : (
                    <Grid container spacing={4}>
                      {filteredCourses.map((course) => (
                        <Grid item xs={12} sm={6} key={course.id}>
                          <AnimatedCard
                            whileHover={cardAnimation.hover}
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              height: '100%',
                              borderRadius: 3,
                              borderLeft: `5px solid ${colors.primary}`,
                              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                            }}
                          >
                            <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                              <Typography variant="h6" fontWeight={600} noWrap>
                                {course.title}
                              </Typography>
                              <LinearProgress
                                variant="determinate"
                                value={course.progress || 0}
                                sx={{ height: 9, borderRadius: 5 }}
                                color={course.progress >= 80 ? 'success' : course.progress >= 50 ? 'warning' : 'error'}
                              />
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
                              <Button
                                size="small"
                                onClick={() => navigate(`/course/${course.id}`)}
                                sx={{ color: colors.primary, fontWeight: 700 }}
                              >
                                View Course
                              </Button>
                            </CardActions>
                          </AnimatedCard>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Box>
              </Collapse>
            </AnimatedCard>

            {/* Assignments Section */}
            <AnimatedCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              sx={{
                mb: 5,
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: '0 2px 16px rgba(74, 20, 140, 0.15)',
              }}
            >
              <Box
                sx={{
                  p: 3,
                  bgcolor: theme.palette.mode === 'light' ? colors.lightOrange : colors.darkOrangeTransparent,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Typography variant="h6" fontWeight={700} color={colors.secondary}>
                  Assignments
                </Typography>
              </Box>
              <Box sx={{ p: 3 }}>
                {loading ? (
                  <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 2 }} />
                ) : filteredAssignments && filteredAssignments.length > 0 ? (
                  filteredAssignments.map((assignment) => (
                    <Box key={assignment.id} sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {assignment.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Due Date: {assignment.dueDate}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
                    No assignments due at the moment.
                  </Typography>
                )}
              </Box>
            </AnimatedCard>

            {/* Live Classes Section */}
            <AnimatedCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              sx={{
                mb: 5,
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: '0 2px 16px rgba(74, 20, 140, 0.15)',
              }}
            >
              <Box
                sx={{
                  p: 3,
                  bgcolor: theme.palette.mode === 'light' ? colors.lightPurple : colors.darkPurpleTransparent,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Typography variant="h6" fontWeight={700} color={colors.primary}>
                  Live Classes
                </Typography>
              </Box>
              <Box sx={{ p: 3 }}>
                {loading ? (
                  <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 2 }} />
                ) : filteredLiveClasses && filteredLiveClasses.length > 0 ? (
                  filteredLiveClasses.map((liveClass) => (
                    <Box key={liveClass.id} sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {liveClass.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Date: {liveClass.date}, Time: {liveClass.time || 'TBD'}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        href={liveClass.meetLink}
                        target="_blank"
                        sx={{ mt: 1 }}
                      >
                        Join Class
                      </Button>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
                    No live classes scheduled at the moment.
                  </Typography>
                )}
              </Box>
            </AnimatedCard>

            {/* Announcements Section */}
            <Announcements />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;