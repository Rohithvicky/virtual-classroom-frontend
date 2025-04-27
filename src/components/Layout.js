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
  Grow,
  Slide,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  AccountCircle,
  Search as SearchIcon,
  Menu as MenuIcon,
  Dashboard,
  School,
  Assignment,
  Forum,
  Quiz,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

// Styled components for enhanced visuals
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(90deg, #3a86ff 0%, #4361ee 100%)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
}));

const NavLink = styled(Typography)(({ theme, active }) => ({
  position: 'relative',
  color: '#fff',
  padding: '8px 16px',
  borderRadius: '20px',
  textDecoration: 'none',
  fontWeight: active ? '600' : '500',
  fontSize: '15px',
  transition: 'all 0.3s ease',
  background: active ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.15)',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
}));

const SearchBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  borderRadius: '20px',
  padding: '6px 16px',
  transition: 'all 0.3s ease',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  '&:focus-within': {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
}));

const SearchInput = styled('input')(({ theme }) => ({
  border: 'none',
  outline: 'none',
  background: 'transparent',
  width: '100%',
  color: '#fff',
  fontSize: '14px',
  '&::placeholder': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: '#fff',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  margin: '0 4px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: 'scale(1.05)',
  },
}));

const Layout = ({ children }) => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:960px)');
  const isSmall = useMediaQuery('(max-width:600px)');

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleProfileMenuClose();
    logout();
  };

  const toggleMobileDrawer = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const menuItems = [
    { text: 'Dashboard', path: '/', icon: <Dashboard /> },
    { text: 'Courses', path: '/courses', icon: <School /> },
    { text: 'Assignments', path: '/assignments', icon: <Assignment /> },
    { text: 'Discussion', path: '/discussion', icon: <Forum /> },
    { text: 'Live Quizzes', path: '/live-quizzes', icon: <Quiz /> },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const drawerContent = (
    <Slide direction="right" in={mobileDrawerOpen} mountOnEnter unmountOnExit>
      <Box sx={{ width: 280, height: '100%', backgroundColor: '#f8f9fa' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 2,
            background: 'linear-gradient(90deg, #3a86ff 0%, #4361ee 100%)',
            color: 'white',
          }}
        >
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
                backgroundColor: isActive(item.path)
                  ? 'rgba(67, 97, 238, 0.1)'
                  : 'transparent',
                borderLeft: isActive(item.path)
                  ? '4px solid #4361ee'
                  : '4px solid transparent',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(67, 97, 238, 0.05)',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive(item.path) ? '#4361ee' : 'inherit',
                }}
              >
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
        <Box sx={{ padding: 2 }}>
          <SearchBox
            sx={{
              backgroundColor: '#edf2f7',
              border: '1px solid #e2e8f0',
              width: '100%',
            }}
          >
            <SearchIcon sx={{ color: 'gray', mr: 1 }} />
            <SearchInput
              type="text"
              placeholder="Search..."
              style={{ color: '#4a5568' }}
            />
          </SearchBox>
        </Box>
      </Box>
    </Slide>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <StyledAppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: isSmall ? '8px 0' : '8px 16px',
              minHeight: { xs: '64px', sm: '70px' },
            }}
          >
            {isMobile && (
              <StyledIconButton
                edge="start"
                onClick={toggleMobileDrawer}
                sx={{ marginRight: 1 }}
              >
                <MenuIcon />
              </StyledIconButton>
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
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: { sm: 1, md: 2 },
                  flexGrow: 1,
                }}
              >
                {menuItems.map((item) => (
                  <NavLink
                    key={item.text}
                    component={Link}
                    to={item.path}
                    active={isActive(item.path) ? 1 : 0}
                  >
                    {item.text}
                  </NavLink>
                ))}
              </Box>
            )}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 1, sm: 2 },
              }}
            >
              {!isSmall && (
                <SearchBox sx={{ width: { sm: '180px', md: '250px' } }}>
                  <SearchIcon
                    sx={{ color: 'rgba(255, 255, 255, 0.8)', mr: 1 }}
                  />
                  <SearchInput type="text" placeholder="Search..." />
                </SearchBox>
              )}
              <StyledIconButton size={isSmall ? 'small' : 'medium'}>
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </StyledIconButton>
              <StyledIconButton
                size={isSmall ? 'small' : 'medium'}
                edge="end"
                onClick={handleProfileMenuOpen}
              >
                <AccountCircle />
              </StyledIconButton>
            </Box>
          </Toolbar>
        </Container>
      </StyledAppBar>
      <Drawer
        anchor="left"
        open={mobileDrawerOpen}
        onClose={toggleMobileDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: { xs: '85%', sm: 280 },
          },
        }}
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
        sx={{
          '& .MuiPaper-root': {
            borderRadius: '8px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
            marginTop: '8px',
          },
        }}
      >
        <Box sx={{ padding: '8px 16px', textAlign: 'center' }}>
          <Typography variant="subtitle1" fontWeight="bold">
            User Name
          </Typography>
          <Typography variant="body2" color="text.secondary">
            user@example.com
          </Typography>
        </Box>
        <Divider />
        <MenuItem
          onClick={() => {
            handleProfileMenuClose();
            navigate('/profile'); // Navigate to the profile page
          }}
          sx={{ padding: '10px 16px' }}
        >
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ padding: '10px 16px' }}>
          <ListItemIcon sx={{ color: '#f44336' }}>
            <Dashboard fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
      <Fade in={true} timeout={500}>
        <Box
          sx={{
            flexGrow: 1,
            padding: { xs: 2, sm: 3 },
            backgroundColor: '#E3F2FD',
            minHeight: '100vh',
          }}
        >
          {children}
        </Box>
      </Fade>
    </Box>
  );
};

export default Layout;