// src/pages/CourseDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  Tabs,
  Tab,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  Avatar,
  Rating,
  CircularProgress
} from '@mui/material';
import {
  PlayCircleOutline as VideoIcon,
  Description as DocumentIcon,
  Assignment as AssignmentIcon,
  Forum as ForumIcon,
  People as PeopleIcon,
  ArrowBack as ArrowBackIcon,
  Bookmark as BookmarkIcon,
  Share as ShareIcon
} from '@mui/icons-material';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    // Simulate API call to fetch course data
    setTimeout(() => {
      // Mock course data - in a real app, fetch this based on the id
      const mockCourse = {
        id: parseInt(id),
        title: 'Introduction to Computer Science',
        instructor: 'Dr. Smith',
        instructorTitle: 'Professor of Computer Science',
        instructorBio: 'Ph.D. in Computer Science with over 15 years of teaching experience. Specializes in algorithms and data structures.',
        description: 'This comprehensive course covers the fundamentals of computer science, including programming concepts, algorithms, data structures, and computational thinking. Perfect for beginners looking to enter the field of computer science.',
        category: 'Computer Science',
        level: 'Beginner',
        duration: '12 weeks',
        enrolled: 342,
        rating: 4.7,
        reviewCount: 128,
        image: '/api/placeholder/800/400',
        instructorImage: '/api/placeholder/100/100',
        lastUpdated: '2025-03-15',
        modules: [
          {
            id: 1,
            title: 'Introduction to Programming Concepts',
            lessons: [
              { id: 1, title: 'What is Programming?', type: 'video', duration: '10:30' },
              { id: 2, title: 'Variables and Data Types', type: 'video', duration: '15:45' },
              { id: 3, title: 'Basic Operators', type: 'document', duration: '5:00' },
              { id: 4, title: 'Programming Assignment 1', type: 'assignment', duration: '45:00' }
            ]
          },
          {
            id: 2,
            title: 'Control Flow and Functions',
            lessons: [
              { id: 5, title: 'Conditional Statements', type: 'video', duration: '12:20' },
              { id: 6, title: 'Loops and Iterations', type: 'video', duration: '18:30' },
              { id: 7, title: 'Functions and Parameters', type: 'document', duration: '8:15' },
              { id: 8, title: 'Programming Assignment 2', type: 'assignment', duration: '60:00' }
            ]
          },
          {
            id: 3,
            title: 'Data Structures',
            lessons: [
              { id: 9, title: 'Arrays and Lists', type: 'video', duration: '14:50' },
              { id: 10, title: 'Stacks and Queues', type: 'video', duration: '16:40' },
              { id: 11, title: 'Review Quiz', type: 'assignment', duration: '30:00' }
            ]
          }
        ],
        announcements: [
          { id: 1, title: 'Welcome to the Course!', date: '2025-04-01' },
          { id: 2, title: 'Week 3 Assignment Extended', date: '2025-04-15' }
        ],
        prerequisites: ['Basic computer skills', 'No prior programming experience required'],
        objectives: [
          'Understand fundamental programming concepts',
          'Develop problem-solving skills through algorithmic thinking',
          'Gain hands-on experience with a programming language',
          'Build simple applications using data structures'
        ]
      };
      
      setCourse(mockCourse);
      setLoading(false);
    }, 800); // Simulating network delay
  }, [id]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleBack = () => {
    navigate('/courses');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!course) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h5" color="error">
          Course not found
        </Typography>
        <Button 
          variant="contained" 
          onClick={handleBack}
          startIcon={<ArrowBackIcon />} 
          sx={{ mt: 2 }}
        >
          Back to Courses
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Button 
          variant="outlined" 
          onClick={handleBack}
          startIcon={<ArrowBackIcon />} 
          sx={{ mb: 2 }}
        >
          Back to Courses
        </Button>
      </Box>

      {/* Course Header */}
      <Paper 
        sx={{ 
          p: 3, 
          mb: 3, 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${course.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white'
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Typography variant="overline">
              {course.category} | {course.level}
            </Typography>
            <Typography variant="h4" component="h1" gutterBottom>
              {course.title}
            </Typography>
            <Typography variant="body1" paragraph>
              {course.description}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={course.rating} precision={0.5} readOnly />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {course.rating} ({course.reviewCount} reviews)
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src={course.instructorImage} sx={{ mr: 2 }} />
              <Box>
                <Typography variant="subtitle1">
                  {course.instructor}
                </Typography>
                <Typography variant="body2">
                  {course.instructorTitle}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.9)', color: 'black' }}>
              <CardContent>
                <Typography variant="h5" component="div" color="primary" gutterBottom>
                  Course Details
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Duration:</span> <strong>{course.duration}</strong>
                  </Typography>
                  <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Enrolled:</span> <strong>{course.enrolled} students</strong>
                  </Typography>
                  <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Last Updated:</span> <strong>{new Date(course.lastUpdated).toLocaleDateString()}</strong>
                  </Typography>
                </Box>
                <Button variant="contained" fullWidth>
                  Enroll Now
                </Button>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
                  <Button startIcon={<BookmarkIcon />} size="small">
                    Save
                  </Button>
                  <Button startIcon={<ShareIcon />} size="small">
                    Share
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* Course Tabs */}
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="course tabs" variant="scrollable" scrollButtons="auto">
            <Tab label="Content" />
            <Tab label="Overview" />
            <Tab label="Instructor" />
            <Tab label="Discussions" />
            <Tab label="Students" />
          </Tabs>
        </Box>

        {/* Content Tab */}
        {value === 0 && (
          <Box sx={{ py: 3 }}>
            <Typography variant="h6" gutterBottom>
              Course Content
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {course.modules.length} modules • {course.modules.reduce((total, module) => total + module.lessons.length, 0)} lessons
            </Typography>
            
            {course.modules.map((module) => (
              <Paper key={module.id} sx={{ mb: 2, overflow: 'hidden' }}>
                <Box sx={{ p: 2, bgcolor: 'secondary.light' }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Module {module.id}: {module.title}
                  </Typography>
                </Box>
                <List disablePadding>
                  {module.lessons.map((lesson) => (
                    <React.Fragment key={lesson.id}>
                      <ListItem button>
                        <ListItemIcon>
                          {lesson.type === 'video' && <VideoIcon color="primary" />}
                          {lesson.type === 'document' && <DocumentIcon color="primary" />}
                          {lesson.type === 'assignment' && <AssignmentIcon color="secondary" />}
                        </ListItemIcon>
                        <ListItemText 
                          primary={lesson.title} 
                          secondary={
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <Chip 
                                label={lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)} 
                                size="small" 
                                variant="outlined" 
                              />
                              <Typography variant="caption">{lesson.duration}</Typography>
                            </Box>
                          } 
                        />
                      </ListItem>
                      <Divider component="li" />
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            ))}
          </Box>
        )}

        {/* Overview Tab */}
        {value === 1 && (
          <Box sx={{ py: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Typography variant="h6" gutterBottom>
                  About This Course
                </Typography>
                <Typography variant="body1" paragraph>
                  {course.description}
                </Typography>
                
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  What You'll Learn
                </Typography>
                <Grid container spacing={2}>
                  {course.objectives.map((objective, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: 'primary.main',
                            color: 'white',
                            flexShrink: 0,
                          }}
                        >
                          {index + 1}
                        </Box>
                        <Typography variant="body1">{objective}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
                
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  Prerequisites
                </Typography>
                <List>
                  {course.prerequisites.map((prerequisite, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={prerequisite} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Announcements
                  </Typography>
                  {course.announcements.map((announcement) => (
                    <Box key={announcement.id} sx={{ mb: 2 }}>
                      <Typography variant="subtitle1">{announcement.title}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Posted on {new Date(announcement.date).toLocaleDateString()}
                      </Typography>
                    </Box>
                  ))}
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Instructor Tab */}
        {value === 2 && (
          <Box sx={{ py: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3} md={2}>
                <Avatar 
                  src={course.instructorImage} 
                  sx={{ width: 120, height: 120, mx: 'auto' }}
                />
              </Grid>
              <Grid item xs={12} sm={9} md={10}>
                <Typography variant="h5" gutterBottom>
                  {course.instructor}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  {course.instructorTitle}
                </Typography>
                <Typography variant="body1" paragraph>
                  {course.instructorBio}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button variant="outlined" size="small">
                    View Profile
                  </Button>
                  <Button variant="outlined" size="small">
                    Contact
                  </Button>
                </Box>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Instructor's Courses
                </Typography>
                <Grid container spacing={2}>
                  {[1, 2, 3].map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="subtitle1" noWrap>
                            {item === 1 
                              ? 'Advanced Computer Science' 
                              : item === 2 
                                ? 'Data Structures and Algorithms' 
                                : 'Object-Oriented Programming'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item === 1 
                              ? 'Advanced level • 14 weeks' 
                              : item === 2 
                                ? 'Intermediate level • 10 weeks' 
                                : 'Intermediate level • 8 weeks'}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Discussions Tab */}
        {value === 3 && (
          <Box sx={{ py: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">
                Course Discussions
              </Typography>
              <Button variant="contained" startIcon={<ForumIcon />}>
                New Topic
              </Button>
            </Box>
            
            <Paper sx={{ p: 0 }}>
              <List disablePadding>
                {[1, 2, 3, 4].map((item) => (
                  <React.Fragment key={item}>
                    <ListItem button alignItems="flex-start" sx={{ py: 2 }}>
                      <ListItemIcon sx={{ mt: 0 }}>
                        <Avatar>{item === 1 ? 'JD' : item === 2 ? 'AR' : item === 3 ? 'MK' : 'TS'}</Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1">
                            {item === 1 
                              ? 'Help with Assignment #2' 
                              : item === 2 
                                ? 'Question about data types' 
                                : item === 3 
                                  ? 'Error in module 3 example' 
                                  : 'Study group for final project'}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography
                              variant="body2"
                              color="text.primary"
                            >
                              {item === 1 
                                ? 'John Doe' 
                                : item === 2 
                                  ? 'Alice Roberts' 
                                  : item === 3 
                                    ? 'Mike Kim' 
                                    : 'Taylor Smith'}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}
                            >
                              <span>
                                {item === 1 
                                  ? 'I\'m stuck on problem 3 of Assignment #2. Can anyone help?' 
                                  : item === 2 
                                    ? 'Can someone explain the difference between primitives and objects?' 
                                    : item === 3 
                                      ? 'I think there\'s an error in the code example in module 3.' 
                                      : 'Looking for study partners for the final project. Anyone interested?'}
                              </span>
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                              <Chip 
                                label={item === 1 
                                  ? 'Assignment Help' 
                                  : item === 2 
                                    ? 'Question' 
                                    : item === 3 
                                      ? 'Bug Report' 
                                      : 'Study Group'} 
                                size="small" 
                                color={item === 3 ? 'error' : 'default'} 
                              />
                              <Typography variant="caption">
                                {item === 1 
                                  ? '2 hours ago' 
                                  : item === 2 
                                    ? '1 day ago' 
                                    : item === 3 
                                      ? '3 days ago' 
                                      : '1 week ago'}
                              </Typography>
                              <Typography variant="caption">
                                {item === 1 
                                  ? '8 replies' 
                                  : item === 2 
                                    ? '12 replies' 
                                    : item === 3 
                                      ? '5 replies' 
                                      : '20 replies'}
                              </Typography>
                            </Box>
                          </>
                        }
                      />
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))}
              </List>
            </Paper>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button variant="outlined">
                View All Discussions
              </Button>
            </Box>
          </Box>
        )}

        {/* Students Tab */}
        {value === 4 && (
          <Box sx={{ py: 3 }}>
            <Typography variant="h6" gutterBottom>
              Enrolled Students ({course.enrolled})
            </Typography>
            
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Student Demographics
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h4" color="primary">65%</Typography>
                    <Typography variant="body2">Completion Rate</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h4" color="primary">42</Typography>
                    <Typography variant="body2">Countries Represented</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h4" color="primary">4.7</Typography>
                    <Typography variant="body2">Average Rating</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
            
            <Typography variant="subtitle1" gutterBottom>
              Top Students
            </Typography>
            <Grid container spacing={2}>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Grid item xs={6} sm={4} md={2} key={item}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 1 }}>
                      {item === 1 ? 'JD' : item === 2 ? 'AR' : item === 3 ? 'MK' : item === 4 ? 'TS' : item === 5 ? 'LP' : 'RW'}
                    </Avatar>
                    <Typography variant="subtitle2" noWrap>
                      {item === 1 
                        ? 'John Doe' 
                        : item === 2 
                          ? 'Alice Roberts' 
                          : item === 3 
                            ? 'Mike Kim' 
                            : item === 4 
                              ? 'Taylor Smith' 
                              : item === 5 
                                ? 'Lisa Park' 
                                : 'Robert Wilson'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item === 1 
                        ? 'Module 3/3' 
                        : item === 2 
                          ? 'Module 3/3' 
                          : item === 3 
                            ? 'Module 2/3' 
                            : item === 4 
                              ? 'Module 3/3' 
                              : item === 5 
                                ? 'Module 2/3' 
                                : 'Module 1/3'}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button variant="outlined" startIcon={<PeopleIcon />}>
                View All Students
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default CourseDetail;