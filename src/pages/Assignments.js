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
  TextField,
  InputAdornment,
} from '@mui/material';
import { Search, CalendarToday, Assignment } from '@mui/icons-material';
import { CoursesContext } from '../contexts/CoursesContext';

const Assignments = () => {
  const { enrolledCourses, filteredAssignments = [] } = useContext(CoursesContext); // Add fallback for filteredAssignments
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter assignments based on tab and search term
  const filteredAssignmentsByTab = useMemo(() => {
    return filteredAssignments.filter((assignment) => {
      const matchesSearch =
        assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.course.toLowerCase().includes(searchTerm.toLowerCase());

      if (tabValue === 0) return matchesSearch; // All assignments
      if (tabValue === 1) return assignment.status === 'upcoming' && matchesSearch;
      if (tabValue === 2) return assignment.status === 'submitted' && matchesSearch;
      if (tabValue === 3) return assignment.status === 'graded' && matchesSearch;

      return matchesSearch;
    });
  }, [filteredAssignments, tabValue, searchTerm]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Assignments
      </Typography>

      {/* Tabs for filtering assignments */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="assignment tabs">
          <Tab label="All" />
          <Tab label="Upcoming" />
          <Tab label="Submitted" />
          <Tab label="Graded" />
        </Tabs>
      </Box>

      {/* Search bar */}
      <Box sx={{ mb: 3 }}>
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
          sx={{ width: '100%', maxWidth: 400 }}
        />
      </Box>

      {/* Assignments Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Assignment</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAssignmentsByTab.length > 0 ? (
              filteredAssignmentsByTab.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Assignment sx={{ mr: 1 }} />
                      {assignment.title}
                    </Box>
                  </TableCell>
                  <TableCell>{assignment.course}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CalendarToday sx={{ mr: 1 }} />
                      {new Date(assignment.dueDate).toLocaleDateString()}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                      color={
                        assignment.status === 'graded'
                          ? 'success'
                          : assignment.status === 'submitted'
                          ? 'info'
                          : 'primary'
                      }
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No assignments found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Assignments;