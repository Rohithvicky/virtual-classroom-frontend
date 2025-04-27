// src/pages/CourseList.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
  Box,
  TextField,
  InputAdornment,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Pagination
} from '@mui/material';
import { Search as SearchIcon, FilterList as FilterIcon } from '@mui/icons-material';

const hoverEffect = {
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
  },
};

const fadeIn = {
  opacity: 0,
  animation: 'fadeIn 0.8s forwards',
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
};

const slideUp = {
  opacity: 0,
  transform: 'translateY(20px)',
  animation: 'slideUp 0.6s ease forwards',
  '@keyframes slideUp': {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
};

const pulse = {
  animation: 'pulse 2s infinite',
  '@keyframes pulse': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.05)' },
    '100%': { transform: 'scale(1)' },
  },
};

const rotateOnHover = {
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'rotate(20deg)',
  },
};

export const courses = [
  {
    id: 1,
    title: 'Introduction to Computer Science',
    category: 'Computer Science',
    level: 'Beginner',
    duration: '12 weeks',
    enrolled: false, // Not enrolled
    rating: 4.7,
    reviewCount: 128,
    image: '/api/placeholder/800/400',
    instructor: 'Dr. Smith',
  },
  {
    id: 2,
    title: 'Java Programming',
    category: 'Programming',
    level: 'Intermediate',
    duration: '10 weeks',
    enrolled: true, // Enrolled
    rating: 4.8,
    reviewCount: 200,
    image: '/api/placeholder/800/400',
    instructor: 'Prof. Johnson',
  },
  {
    id: 3,
    title: 'Computer Organization and Architecture',
    category: 'Computer Science',
    level: 'Advanced',
    duration: '8 weeks',
    enrolled: false, // Not enrolled
    rating: 4.6,
    reviewCount: 90,
    image: '/api/placeholder/800/400',
    instructor: 'Dr. Lee',
  },
  {
    id: 4,
    title: 'Startup Management',
    category: 'Business',
    level: 'Beginner',
    duration: '6 weeks',
    enrolled: false, // Not enrolled
    rating: 4.5,
    reviewCount: 50,
    image: '/api/placeholder/800/400',
    instructor: 'Ms. Taylor',
  },
  {
    id: 5,
    title: 'Foundations of Data Science',
    category: 'Data Science',
    level: 'Beginner',
    duration: '12 weeks',
    enrolled: true, // Enrolled
    rating: 4.9,
    reviewCount: 300,
    image: '/api/placeholder/800/400',
    instructor: 'Dr. Patel',
  },
];

const CourseList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);

  const categories = ['all', 'Computer Science', 'Mathematics', 'Web Development', 'Science', 'Data Science', 'Humanities'];
  const itemsPerPage = 4;

  // Filter courses based on search term and category
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || course.category === category;
    return matchesSearch && matchesCategory;
  });

  // Paginate courses
  const indexOfLastCourse = page * itemsPerPage;
  const indexOfFirstCourse = indexOfLastCourse - itemsPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const pageCount = Math.ceil(filteredCourses.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box sx={{ ...fadeIn }}>
      <Typography variant="h4" gutterBottom>
        Available Courses
      </Typography>

      <Box
        sx={{
          mb: 4,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          ...slideUp,
        }}
      >
        <TextField
          label="Search Courses"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flex: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControl variant="outlined" sx={{ minWidth: 200, flex: 1 }}>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Category"
            startAdornment={
              <InputAdornment position="start">
                <FilterIcon />
              </InputAdornment>
            }
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Course Cards */}
      <Grid container spacing={3}>
        {currentCourses.map((course) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                ...hoverEffect,
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={course.image}
                alt={course.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div" noWrap>
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Instructor: {course.instructor}
                </Typography>
                <Typography variant="body2" paragraph sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                  {course.description}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                  <Chip label={course.category} size="small" color="primary" />
                  <Chip label={course.level} size="small" />
                  <Chip label={`${course.enrolled ? 'Enrolled' : 'Not enrolled'}`} size="small" variant="outlined" />
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to={`/courses/${course.id}`}>
                  View Course
                </Button>
                {!course.enrolled && (
                  <Button size="small" color="primary" sx={{ ...pulse }}>
                    Enroll
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {filteredCourses.length > 0 ? (
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Pagination 
            count={pageCount} 
            page={page} 
            onChange={handlePageChange} 
            color="primary" 
          />
        </Box>
      ) : (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            No courses match your search criteria.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default CourseList;