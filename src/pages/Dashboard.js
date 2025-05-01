import React, { useState, useEffect, useMemo } from 'react';
import {
  Typography,
  Grid,
  Paper,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Avatar,
  useTheme,
  TextField,
  Alert,
  Skeleton,
  Collapse,
  IconButton
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  Announcement as AnnouncementIcon,
  School as SchoolIcon,
  CheckCircle as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
  Person as PersonIcon,
  PriorityHigh as PriorityHighIcon,
  Download as DownloadIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { courses } from './CourseList';

// Custom components
const AnimatedCard = motion(Paper);
const AnimatedButton = motion(Button);

// Color scheme
const colors = {
  primary: '#4a148c',
  secondary: '#ff6f00',
  success: '#2e7d32',
  warning: '#ed6c02',
  error: '#d32f2f',
  info: '#0288d1'
};

// Animations
const cardAnimation = {
  hover: {
    y: -5,
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    transition: { duration: 0.3 }
  }
};

const buttonAnimation = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  tap: {
    scale: 0.98
  }
};

const Dashboard = () => {
  const { currentUser } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();

  // State for data fetching
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [upcomingAssignments, setUpcomingAssignments] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [stats, setStats] = useState({
    enrolledCourses: 0,
    pendingAssignments: 0,
    averageProgress: 0,
  });
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [loading, setLoading] = useState({
    courses: true,
    assignments: true,
    announcements: true,
    stats: true,
    profile: true,
  });
  const [error, setError] = useState(null);
  const [mobileView, setMobileView] = useState(window.innerWidth < 900);

  // Add missing state hooks
  const [expandedSection, setExpandedSection] = useState({
    assignments: false,
    announcements: false,
  }); // For collapsible sections

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);

        // Simulate API calls in parallel
        const [userEnrolledCourses, mockAssignments, mockAnnouncements] = await Promise.all([
          new Promise(resolve => setTimeout(() => {
            resolve(
              courses
                .filter(course => course.title === 'Java Programming' || course.title === 'Foundations of Data Science')
                .map(course => ({
                  ...course,
                  progress: Math.floor(Math.random() * 100), // Add random progress for demo
                  enrolled: true, // Mark as enrolled
                }))
            );
          }, 200)), // Reduced delay to 200ms
          new Promise(resolve => setTimeout(() => {
            resolve([
              { id: 1, title: 'Programming Assignment #3', course: 'Java Programming', dueDate: '2025-05-02', priority: 'high' },
              { id: 2, title: 'Data Science Project Proposal', course: 'Foundations of Data Science', dueDate: '2025-05-05', priority: 'medium' },
            ]);
          }, 200)), // Reduced delay to 200ms
          new Promise(resolve => setTimeout(() => {
            resolve([
              { id: 1, title: 'Welcome to Java Programming!', text: 'Course starts on May 1st', date: '2025-04-25' },
              { id: 2, title: 'Foundations of Data Science Update', text: 'New resources added for Week 2', date: '2025-04-24' },
            ]);
          }, 200)), // Reduced delay to 200ms
        ]);

        // Update state with fetched data
        setEnrolledCourses(userEnrolledCourses);
        setUpcomingAssignments(mockAssignments);
        setAnnouncements(mockAnnouncements);
        setStats({
          enrolledCourses: userEnrolledCourses.length,
          pendingAssignments: mockAssignments.length,
          averageProgress: userEnrolledCourses.length > 0
            ? Math.round(userEnrolledCourses.reduce((sum, course) => sum + course.progress, 0) / userEnrolledCourses.length)
            : 0,
        });
        setProfileCompletion(80);

        setLoading({
          courses: false,
          assignments: false,
          announcements: false,
          stats: false,
          profile: false,
        });
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('Failed to load dashboard data. Please try again later.');
        setLoading({
          courses: false,
          assignments: false,
          announcements: false,
          stats: false,
          profile: false,
        });
      }
    };

    fetchData();

    // Handle responsiveness
    const handleResize = () => {
      setMobileView(window.innerWidth < 900);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentUser]);

  // Helper functions
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return colors.error;
      case 'medium': return colors.warning;
      case 'low': return colors.success;
      default: return colors.info;
    }
  };

  const getDueText = (dueDate) => {
    const daysLeft = Math.ceil((new Date(dueDate) - new Date()) / (1000 * 60 * 60 * 24));
    return daysLeft <= 0 ? "Due now" : `Due in ${daysLeft} day${daysLeft !== 1 ? 's' : ''}`;
  };

  const exportToCalendar = () => {
    // In a real app, this would generate an iCal file
    alert('Export functionality would generate an iCal file in a real application');
  };

  const toggleSection = (section) => {
    setExpandedSection(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button 
          variant="contained" 
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      px: { xs: 2, md: 4 }, 
      py: 3, 
      bgcolor: theme.palette.mode === 'light' ? '#f8f9fa' : '#121212',
      minHeight: '100vh'
    }}>
      {/* Welcome Banner */}
      <AnimatedCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover="hover"
        sx={{
          p: { xs: 3, md: 4 },
          mb: 5,
          background: `linear-gradient(135deg, ${colors.primary}, #7b1fa2)`,
          color: '#fff',
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" gutterBottom fontWeight="bold">
                Welcome back, {currentUser?.name || 'Student'}!
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
                Here's what's happening with your courses today
              </Typography>
              <AnimatedButton
                variant="contained"
                color="secondary"
                whileHover={buttonAnimation.hover}
                whileTap={buttonAnimation.tap}
                sx={{ 
                  bgcolor: colors.secondary,
                  '&:hover': { bgcolor: '#ff8f00' },
                  borderRadius: 2,
                  px: 4,
                  py: 1
                }}
                onClick={() => navigate('/courses')}
                aria-label="Explore courses"
              >
                Explore Courses
              </AnimatedButton>
            </Grid>
            <Grid item xs={12} md={4} sx={{ display: { xs: 'none', md: 'block' } }}>
              <SchoolIcon sx={{ fontSize: 120, opacity: 0.2, float: 'right' }} />
            </Grid>
          </Grid>
        </Box>
      </AnimatedCard>

      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          {loading.profile ? (
            <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 3 }} />
          ) : (
            <AnimatedCard 
              variants={cardAnimation}
              whileHover="hover"
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: 'background.paper',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: '#e3f2fd', color: colors.info, mr: 2 }}>
                  <PersonIcon />
                </Avatar>
                <Typography variant="h6">Profile Completion</Typography>
              </Box>
              <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Box sx={{ position: 'relative', display: 'inline-flex', alignSelf: 'center' }}>
                  <CircularProgress 
                    variant="determinate" 
                    value={profileCompletion} 
                    size={120}
                    thickness={4}
                    sx={{ color: colors.success }}
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="h5" component="div" fontWeight="bold">
                      {profileCompletion}%
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
                  {profileCompletion < 100 ? 'Complete your profile for better recommendations' : 'Profile complete!'}
                </Typography>
              </Box>
              {profileCompletion < 100 && (
                <Button 
                  size="small" 
                  color="primary" 
                  sx={{ mt: 2, alignSelf: 'flex-end' }}
                  startIcon={<CheckCircleIcon />}
                  onClick={() => navigate('/profile')}
                >
                  Complete Profile
                </Button>
              )}
            </AnimatedCard>
          )}
        </Grid>

        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {[
              { 
                title: 'Enrolled Courses', 
                value: stats.enrolledCourses, 
                icon: <SchoolIcon />,
                color: colors.primary,
                bgcolor: '#f3e5f5',
                loading: loading.stats
              },
              { 
                title: 'Pending Assignments', 
                value: stats.pendingAssignments, 
                icon: <AssignmentIcon />,
                color: colors.warning,
                bgcolor: '#fff3e0',
                loading: loading.stats
              },
              { 
                title: 'Average Progress', 
                value: `${stats.averageProgress}%`, 
                icon: <TrendingUpIcon />,
                color: colors.success,
                bgcolor: '#e8f5e9',
                loading: loading.stats
              }
            ].map((stat, index) => (
              <Grid item xs={12} sm={4} key={index}>
                {stat.loading ? (
                  <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 3 }} />
                ) : (
                  <AnimatedCard
                    variants={cardAnimation}
                    whileHover="hover"
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      bgcolor: 'background.paper',
                      height: '100%'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ bgcolor: stat.bgcolor, color: stat.color, mr: 2 }}>
                        {stat.icon}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          {stat.title}
                        </Typography>
                        <Typography variant="h4" fontWeight="bold" color={stat.color}>
                          {stat.value}
                        </Typography>
                      </Box>
                    </Box>
                  </AnimatedCard>
                )}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* My Courses Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>
            <SchoolIcon sx={{ mr: 1, color: colors.primary }} /> My Courses
          </Typography>
        </Box>
        
        {loading.courses ? (
          <Grid container spacing={3}>
            {[1, 2, 3].map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item}>
                <Skeleton variant="rectangular" height={220} sx={{ borderRadius: 3 }} />
              </Grid>
            ))}
          </Grid>
        ) : enrolledCourses.length === 0 ? (
          <Box sx={{ 
            textAlign: 'center', 
            py: 4,
            border: `1px dashed ${theme.palette.divider}`,
            borderRadius: 3
          }}>
            <SchoolIcon sx={{ fontSize: 60, opacity: 0.3, mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              No courses enrolled yet
            </Typography>
            <Button 
              variant="contained" 
              sx={{ mt: 2 }}
              onClick={() => navigate('/courses')}
            >
              Browse Courses
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {enrolledCourses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <AnimatedCard
                  whileHover={{ scale: 1.03 }}
                  onClick={() => navigate(`/course/${course.id}`)}
                  sx={{
                    borderRadius: 3,
                    bgcolor: 'background.paper',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 3,
                    cursor: 'pointer'
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ position: 'relative', display: 'inline-flex', mr: 2 }}>
                        <CircularProgress 
                          variant="determinate" 
                          value={course.progress} 
                          size={40}
                          thickness={4}
                          sx={{ color: colors.success }}
                        />
                        <Box
                          sx={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Typography variant="caption" fontWeight="bold">
                            {course.progress}%
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="h6" fontWeight="medium">
                        {course.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Instructor: {course.instructor}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {course.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button 
                      size="small" 
                      color="primary" 
                      sx={{ textTransform: 'none', borderRadius: 1 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/course/${course.id}/continue`);
                      }}
                      aria-label={`Continue learning ${course.title}`}
                    >
                      Continue Learning
                    </Button>
                  </CardActions>
                </AnimatedCard>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      <Grid container spacing={3}>
        {/* Announcements */}
        <Grid item xs={12} md={6}>
          <AnimatedCard
            variants={cardAnimation}
            whileHover="hover"
            sx={{
              borderRadius: 3,
              bgcolor: 'background.paper',
              height: '100%'
            }}
          >
            <Box sx={{ p: 3 }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: expandedSection.announcements ? 2 : 0
              }}>
                <Typography variant="h6" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>
                  <AnnouncementIcon sx={{ mr: 1, color: colors.secondary }} /> Announcements
                </Typography>
                {mobileView && (
                  <IconButton 
                    size="small" 
                    onClick={() => toggleSection('announcements')}
                    aria-label={expandedSection.announcements ? 'Collapse announcements' : 'Expand announcements'}
                  >
                    {expandedSection.announcements ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                )}
              </Box>
              
              <Collapse in={!mobileView || expandedSection.announcements}>
                {loading.announcements ? (
                  <Box>
                    {[1, 2].map((item) => (
                      <Skeleton key={item} variant="rectangular" height={72} sx={{ mb: 1, borderRadius: 1 }} />
                    ))}
                  </Box>
                ) : announcements.length === 0 ? (
                  <Box sx={{ 
                    textAlign: 'center', 
                    py: 3,
                    border: `1px dashed ${theme.palette.divider}`,
                    borderRadius: 2
                  }}>
                    <AnnouncementIcon sx={{ fontSize: 40, opacity: 0.3, mb: 1 }} />
                    <Typography variant="body1" color="text.secondary">
                      No announcements
                    </Typography>
                  </Box>
                ) : (
                  <>
                    <List dense disablePadding>
                      {announcements.map((announcement, index) => (
                        <React.Fragment key={announcement.id}>
                          <ListItem 
                            sx={{ 
                              py: 1.5,
                              px: 2,
                              borderRadius: 1,
                              '&:hover': { bgcolor: 'action.hover' }
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <AnnouncementIcon color="secondary" />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography variant="subtitle2" fontWeight="medium">
                                  {announcement.title}
                                </Typography>
                              }
                              secondary={
                                <>
                                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                                    {announcement.text}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {new Date(announcement.date).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric'
                                    })}
                                  </Typography>
                                </>
                              }
                            />
                          </ListItem>
                          {index < announcements.length - 1 && (
                            <Divider component="li" sx={{ my: 0.5 }} />
                          )}
                        </React.Fragment>
                      ))}
                    </List>
                    <Button 
                      fullWidth 
                      size="small" 
                      sx={{ mt: 2, textTransform: 'none', borderRadius: 1 }}
                      onClick={() => navigate('/announcements')}
                    >
                      View All Announcements
                    </Button>
                  </>
                )}
              </Collapse>
            </Box>
          </AnimatedCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;