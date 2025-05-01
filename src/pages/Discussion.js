import React, { useState, useContext } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Tabs,
  Tab,
  InputAdornment,
  List,
  ListItem,
  Divider,
} from '@mui/material';
import { Search, Add } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { CoursesContext } from '../contexts/CoursesContext'; // Import the shared context

// Mock data for discussion threads
const mockDiscussions = [
  {
    id: 1,
    title: 'How to implement React hooks efficiently?',
    course: 'Java Programming',
    author: {
      id: 101,
      name: 'Alex Johnson',
    },
    date: '2025-04-24T14:30:00',
    content: "I've been learning about React hooks and I'm trying to understand the best practices for useEffect. Can someone explain when to use what approach?",
    tags: ['react', 'hooks', 'javascript'],
    replies: 8,
    views: 124,
    likes: 15,
    pinned: true,
    bookmarked: true,
  },
  {
    id: 2,
    title: 'Database indexing strategies for large datasets',
    course: 'Foundations of Data Science',
    author: {
      id: 102,
      name: 'Maria Garcia',
    },
    date: '2025-04-23T09:15:00',
    content: "I'm working with a database that has grown to over 10 million records. The queries are starting to slow down. What indexing strategies would you recommend for optimizing performance?",
    tags: ['database', 'indexing', 'optimization'],
    replies: 12,
    views: 95,
    likes: 18,
    pinned: false,
    bookmarked: false,
  },
];

const Discussion = () => {
  const { user } = useAuth();
  const { courses } = useContext(CoursesContext); // Access courses from the shared context
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedThread, setSelectedThread] = useState(null);

  // Filter enrolled courses
  const enrolledCourses = courses.filter((course) => course.enrolled);

  // Filter discussions based on enrolled courses, tab, and search
  const filteredDiscussions = mockDiscussions.filter((discussion) => {
    const isEnrolledCourse = enrolledCourses.some(
      (course) => course.title === discussion.course
    );
    const matchesSearch =
      discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discussion.content.toLowerCase().includes(searchTerm.toLowerCase());

    if (!isEnrolledCourse) return false; // Exclude discussions for non-enrolled courses

    if (tabValue === 0) return matchesSearch; // All
    if (tabValue === 1) return discussion.pinned && matchesSearch; // Pinned
    if (tabValue === 2) return discussion.bookmarked && matchesSearch; // Bookmarked
    if (tabValue === 3) return discussion.author.id === user?.id && matchesSearch; // My Discussions

    return matchesSearch;
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleThreadClick = (thread) => {
    setSelectedThread(thread);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Discussions
        </Typography>
        <Button variant="contained" color="primary" startIcon={<Add />}>
          New Discussion
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Left column - Discussion threads list */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  aria-label="discussion tabs"
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab label="All" />
                  <Tab label="Pinned" />
                  <Tab label="Bookmarked" />
                  <Tab label="My Discussions" />
                </Tabs>
              </Box>

              <TextField
                placeholder="Search discussions..."
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
                sx={{ width: '100%', mt: 2 }}
              />
            </CardContent>

            <List>
              {filteredDiscussions.length > 0 ? (
                filteredDiscussions.map((discussion) => (
                  <React.Fragment key={discussion.id}>
                    <ListItem
                      button
                      selected={selectedThread?.id === discussion.id}
                      onClick={() => handleThreadClick(discussion)}
                    >
                      <Box sx={{ width: '100%' }}>
                        <Typography variant="subtitle1">{discussion.title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {discussion.content}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {discussion.course} · {discussion.replies} replies · {discussion.likes} likes
                        </Typography>
                      </Box>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))
              ) : (
                <ListItem>
                  <Typography>No discussions found for your enrolled courses.</Typography>
                </ListItem>
              )}
            </List>
          </Card>
        </Grid>

        {/* Right column - Selected discussion thread */}
        <Grid item xs={12} md={8}>
          {selectedThread && (
            <Card>
              <CardContent>
                <Typography variant="h5">{selectedThread.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedThread.course} · {selectedThread.replies} replies · {selectedThread.likes} likes
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography>{selectedThread.content}</Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Discussion;