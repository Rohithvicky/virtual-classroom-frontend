import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Avatar,
  Alert,
  Skeleton,
  Collapse,
  IconButton,
  Container,
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  Announcement as AnnouncementIcon,
  School as SchoolIcon,
  CheckCircle as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
  Person as PersonIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CoursesContext } from '../contexts/CoursesContext';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { courses } = useContext(CoursesContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileView, setMobileView] = useState(window.innerWidth < 900);
  const [expandedSection, setExpandedSection] = useState({ announcements: false });
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [upcomingAssignments, setUpcomingAssignments] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [stats, setStats] = useState({ enrolledCourses: 0, pendingAssignments: 0, averageProgress: 0 });
  const [profileCompletion, setProfileCompletion] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Filter enrolled courses
        const userCourses = courses.filter(course => course.enrolled).map(course => ({
          ...course,
          progress: Math.floor(Math.random() * 100),
        }));

        setEnrolledCourses(userCourses);
        setUpcomingAssignments([
          { id: 1, title: 'Programming Assignment #3', course: 'Java Programming', dueDate: '2025-05-02', priority: 'high' },
          { id: 2, title: 'Data Science Project Proposal', course: 'Foundations of Data Science', dueDate: '2025-05-05', priority: 'medium' },
        ]);
        setAnnouncements([
          { id: 1, title: 'Welcome to Java Programming!', text: 'Course starts on May 1st', date: '2025-04-25' },
          { id: 2, title: 'Foundations of Data Science Update', text: 'New resources added for Week 2', date: '2025-04-24' },
        ]);
        setStats({
          enrolledCourses: userCourses.length,
          pendingAssignments: 2,
          averageProgress: userCourses.length > 0
            ? Math.round(userCourses.reduce((sum, course) => sum + course.progress, 0) / userCourses.length)
            : 0,
        });
        setProfileCompletion(80);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('Failed to load dashboard data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();

    const handleResize = () => setMobileView(window.innerWidth < 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [courses]);

  const toggleSection = (section) => {
    setExpandedSection(prev => ({ ...prev, [section]: !prev[section] }));
  };

  if (error) {
    return (
      <Container sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
        <Button variant="contained" onClick={() => window.location.reload()}>Retry</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Welcome Banner */}
      <Paper sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, #4a148c, #7b1fa2)', color: '#fff', borderRadius: 3 }}>
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom fontWeight="bold">
              Welcome back, {currentUser?.name || 'Student'}!
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
              Here's what's happening with your courses today
            </Typography>
            <Button variant="contained" color="secondary" sx={{ borderRadius: 2, px: 4 }} onClick={() => navigate('/courses')}>
              Explore Courses
            </Button>
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: { xs: 'none', md: 'block' } }}>
            <SchoolIcon sx={{ fontSize: 120, opacity: 0.2, float: 'right' }} />
          </Grid>
        </Grid>
      </Paper>

      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: '#e3f2fd', color: '#0288d1', mr: 2 }}>
                <PersonIcon />
              </Avatar>
              <Typography variant="h6">Profile Completion</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
              <CircularProgress variant="determinate" value={profileCompletion} size={120} thickness={4} sx={{ color: '#2e7d32' }} />
              <Box sx={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 120 }}>
                <Typography variant="h5" fontWeight="bold">{profileCompletion}%</Typography>
              </Box>
            </Box>
            {profileCompletion < 100 && (
              <Button size="small" color="primary" sx={{ mt: 2, alignSelf: 'flex-end' }} startIcon={<CheckCircleIcon />} onClick={() => navigate('/profile')}>
                Complete Profile
              </Button>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {[
              { title: 'Enrolled Courses', value: stats.enrolledCourses, icon: <SchoolIcon />, color: '#4a148c', bgcolor: '#f3e5f5' },
              { title: 'Pending Assignments', value: stats.pendingAssignments, icon: <AssignmentIcon />, color: '#ed6c02', bgcolor: '#fff3e0' },
              { title: 'Average Progress', value: `${stats.averageProgress}%`, icon: <TrendingUpIcon />, color: '#2e7d32', bgcolor: '#e8f5e9' },
            ].map((stat, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: stat.bgcolor, color: stat.color, mr: 2 }}>{stat.icon}</Avatar>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">{stat.title}</Typography>
                      <Typography variant="h4" fontWeight="bold" color={stat.color}>{stat.value}</Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* My Courses Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <SchoolIcon sx={{ mr: 1, color: '#4a148c' }} /> My Enrolled Courses
        </Typography>

        {loading ? (
          <Grid container spacing={3}>
            {[1, 2].map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item}>
                <Skeleton variant="rectangular" height={220} sx={{ borderRadius: 3 }} />
              </Grid>
            ))}
          </Grid>
        ) : enrolledCourses.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4, border: '1px dashed rgba(0, 0, 0, 0.12)', borderRadius: 3 }}>
            <SchoolIcon sx={{ fontSize: 60, opacity: 0.3, mb: 2 }} />
            <Typography variant="h6" gutterBottom>No courses enrolled yet</Typography>
            <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate('/courses')}>
              Browse Courses
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {enrolledCourses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <Card sx={{ borderRadius: 3, height: '100%', cursor: 'pointer' }} onClick={() => navigate(`/course/${course.id}`)}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <CircularProgress variant="determinate" value={course.progress} size={40} thickness={4} sx={{ color: '#2e7d32', mr: 2 }} />
                      <Typography variant="h6" fontWeight="medium">{course.title}</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Instructor: {course.instructor}</Typography>
                    <Typography variant="body2" sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {course.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button size="small" color="primary" sx={{ borderRadius: 1 }} onClick={(e) => { e.stopPropagation(); navigate(`/course/${course.id}/continue`); }}>
                      Continue Learning
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Announcements Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ borderRadius: 3 }}>
            <Box sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: expandedSection.announcements ? 2 : 0 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>
                  <AnnouncementIcon sx={{ mr: 1, color: '#ff6f00' }} /> Announcements
                </Typography>
                {mobileView && (
                  <IconButton size="small" onClick={() => toggleSection('announcements')}>
                    {expandedSection.announcements ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                )}
              </Box>

              <Collapse in={!mobileView || expandedSection.announcements}>
                {loading ? (
                  <Box>
                    {[1, 2].map((item) => (
                      <Skeleton key={item} variant="rectangular" height={72} sx={{ mb: 1, borderRadius: 1 }} />
                    ))}
                  </Box>
                ) : announcements.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 3, border: '1px dashed rgba(0, 0, 0, 0.12)', borderRadius: 2 }}>
                    <AnnouncementIcon sx={{ fontSize: 40, opacity: 0.3, mb: 1 }} />
                    <Typography variant="body1" color="text.secondary">No announcements</Typography>
                  </Box>
                ) : (
                  <>
                    <List dense disablePadding>
                      {announcements.map((announcement, index) => (
                        <React.Fragment key={announcement.id}>
                          <ListItem sx={{ py: 1.5, px: 2, borderRadius: 1, '&:hover': { bgcolor: 'action.hover' } }}>
                            <ListItemIcon sx={{ minWidth: 36 }}><AnnouncementIcon color="secondary" /></ListItemIcon>
                            <ListItemText
                              primary={<Typography variant="subtitle2" fontWeight="medium">{announcement.title}</Typography>}
                              secondary={
                                <>
                                  <Typography variant="body2" sx={{ mb: 0.5 }}>{announcement.text}</Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {new Date(announcement.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                  </Typography>
                                </>
                              }
                            />
                          </ListItem>
                          {index < announcements.length - 1 && <Divider component="li" sx={{ my: 0.5 }} />}
                        </React.Fragment>
                      ))}
                    </List>
                    <Button fullWidth size="small" sx={{ mt: 2, borderRadius: 1 }} onClick={() => navigate('/announcements')}>
                      View All Announcements
                    </Button>
                  </>
                )}
              </Collapse>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;