import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  useMediaQuery,
  Fade,
  Badge,
  Container,
  Slide,
  Avatar,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  AccountCircle,
  Menu as MenuIcon,
  Dashboard,
  School,
  Assignment,
  Forum,
  Quiz as QuizIcon,
  Close as CloseIcon,
  VideoCall as VideoCallIcon,
  Book as BookIcon,
  People as PeopleIcon,
  ExitToApp as ExitToAppIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(90deg, #3a86ff 0%, #4361ee 100%)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
}));

const Layout = ({ children }) => {
  const { logout, currentUser, role } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:960px)');
  const isSmall = useMediaQuery('(max-width:600px)');

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setAnchorEl(null);
  const handleLogout = () => { handleProfileMenuClose(); logout(); };
  const toggleMobileDrawer = () => setMobileDrawerOpen(!mobileDrawerOpen);

  const menuItems = [
    { text: 'Dashboard', path: '/', icon: <Dashboard /> },
    { text: 'Courses', path: '/courses', icon: <School /> },
    { text: 'Assignments', path: '/assignments', icon: <Assignment /> },
    { text: 'Discussion', path: '/discussion', icon: <Forum /> },
    { text: 'Live Quizzes', path: '/live-quizzes', icon: <QuizIcon /> },
    { text: 'Live Classes', path: '/live-classes', icon: <VideoCallIcon /> },
  ];

  const isActive = (path) => location.pathname === path;

  const drawerContent = (
    <Slide direction="right" in={mobileDrawerOpen} mountOnEnter unmountOnExit>
      <Box sx={{ width: 280, height: '100%', backgroundColor: '#f8f9fa' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2, background: 'linear-gradient(90deg, #3a86ff 0%, #4361ee 100%)', color: 'white' }}>
          <Typography variant="h6">Virtual Classroom</Typography>
          <IconButton color="inherit" onClick={toggleMobileDrawer}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              component={Link}
              to={item.path}
              key={item.text}
              onClick={toggleMobileDrawer}
              sx={{
                backgroundColor: isActive(item.path) ? 'rgba(67, 97, 238, 0.1)' : 'transparent',
                borderLeft: isActive(item.path) ? '4px solid #4361ee' : '4px solid transparent',
                transition: 'all 0.2s ease',
                '&:hover': { backgroundColor: 'rgba(67, 97, 238, 0.05)' },
              }}
            >
              <ListItemIcon sx={{ color: isActive(item.path) ? '#4361ee' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: isActive(item.path) ? '600' : '400',
                  color: isActive(item.path) ? '#4361ee' : 'inherit',
                }}
              />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Slide>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <StyledAppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: isSmall ? '8px 0' : '8px 16px', minHeight: { xs: '64px', sm: '70px' } }}>
            {isMobile && (
              <IconButton edge="start" onClick={toggleMobileDrawer} sx={{ marginRight: 1 }}>
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'white',
                fontWeight: '700',
                letterSpacing: '0.5px',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                marginRight: 3,
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
              }}
            >
              Virtual Classroom
            </Typography>
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: { sm: 1, md: 2 }, flexGrow: 1 }}>
                {menuItems.map((item) => (
                  <Typography
                    key={item.text}
                    component={Link}
                    to={item.path}
                    sx={{
                      color: isActive(item.path) ? '#4361ee' : 'white',
                      textDecoration: 'none',
                      fontWeight: isActive(item.path) ? '600' : '400',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.15)' },
                    }}
                  >
                    {item.text}
                  </Typography>
                ))}
              </Box>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
              <IconButton size={isSmall ? 'small' : 'medium'}>
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton size={isSmall ? 'small' : 'medium'} edge="end" onClick={handleProfileMenuOpen}>
                <Avatar sx={{ width: 32, height: 32 }}>
                  {currentUser?.photoURL ? (
                    <img src={currentUser.photoURL} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                  ) : (
                    <AccountCircle />
                  )}
                </Avatar>
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </StyledAppBar>

      <Drawer
        anchor="left"
        open={mobileDrawerOpen}
        onClose={toggleMobileDrawer}
        sx={{ '& .MuiDrawer-paper': { boxSizing: 'border-box', width: { xs: '85%', sm: 280 } } }}
      >
        {drawerContent}
      </Drawer>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        TransitionComponent={Fade}
        sx={{ '& .MuiPaper-root': { borderRadius: '8px', boxShadow: '0 8px 16px rgba(0,0,0,0.1)', marginTop: '8px' } }}
      >
        <Box sx={{ padding: '8px 16px', textAlign: 'center' }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {currentUser?.displayName || 'User'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {currentUser?.email || 'user@example.com'}
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={() => { handleProfileMenuClose(); navigate('/profile'); }} sx={{ padding: '10px 16px' }}>
          <ListItemIcon><AccountCircle fontSize="small" /></ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ padding: '10px 16px' }}>
          <ListItemIcon sx={{ color: '#f44336' }}><ExitToAppIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>

      <Fade in={true} timeout={500}>
        <Box sx={{ flexGrow: 1, padding: { xs: 2, sm: 3 }, backgroundColor: '#E3F2FD', minHeight: '100vh' }}>
          <main>{children}</main>
        </Box>
      </Fade>
    </Box>
  );
};

export default Layout;