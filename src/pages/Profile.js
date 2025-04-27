import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Avatar,
  Divider,
  LinearProgress,
  CircularProgress,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton
} from '@mui/material';
import {
  Person as PersonIcon,
  Save as SaveIcon,
  Visibility,
  VisibilityOff,
  CheckCircle,
  Error
} from '@mui/icons-material';
import { debounce } from 'lodash';

const Profile = () => {
  // User information state
  const [userInfo, setUserInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    password: '',
    confirmPassword: '',
    dateOfBirth: '2000-01-01',
    mobile: '',
    parentName: '',
    parentContact: '',
    address: '',
    avatar: null
  });

  // UI and validation states
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    parentContact: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({ 
    open: false, 
    message: '', 
    severity: 'success' 
  });

  // Field validation logic
  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        return value.trim() === '' ? 'This field is required' : '';
      case 'email':
        return /^\S+@\S+\.\S+$/.test(value) ? '' : 'Invalid email format';
      case 'password':
        if (value.length === 0) return '';
        return value.length >= 8 ? '' : 'Minimum 8 characters';
      case 'confirmPassword':
        return value === userInfo.password ? '' : 'Passwords do not match';
      case 'mobile':
      case 'parentContact':
        return value && !/^\d{10}$/.test(value) ? 'Must be 10 digits' : '';
      default:
        return '';
    }
  };

  // Debounced validation effect
  useEffect(() => {
    const debouncedValidate = debounce(() => {
      const newErrors = {};
      Object.keys(userInfo).forEach(key => {
        if (key in errors) {
          newErrors[key] = validateField(key, userInfo[key]);
        }
      });
      setErrors(newErrors);
    }, 300);

    debouncedValidate();
    return () => debouncedValidate.cancel();
  }, [userInfo]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  // Handle file upload for avatar
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setSnackbar({
          open: true,
          message: 'Image size should be less than 2MB',
          severity: 'error'
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserInfo(prev => ({ ...prev, avatar: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Save profile data
  const handleSave = async () => {
    const newErrors = {};
    Object.keys(errors).forEach(key => {
      newErrors[key] = validateField(key, userInfo[key]);
    });
    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error)) {
      setSnackbar({
        open: true,
        message: 'Please fix the errors before saving',
        severity: 'error'
      });
      return;
    }

    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSnackbar({
        open: true,
        message: 'Profile updated successfully!',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to save profile. Please try again.',
        severity: 'error'
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Check if form has errors
  const hasErrors = useMemo(() => 
    Object.values(errors).some(Boolean), 
    [errors]
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f5f7fa, #e4e8f0)',
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 4,
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: 800,
          backgroundColor: '#fff',
        }}
      >
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Avatar
            component="label"
            sx={{ 
              width: 100, 
              height: 100, 
              mb: 2, 
              mx: 'auto',
              cursor: 'pointer',
              bgcolor: 'primary.main',
              '&:hover': {
                opacity: 0.8,
              }
            }}
          >
            {userInfo.avatar ? (
              <img 
                src={userInfo.avatar} 
                alt="Profile" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  borderRadius: '50%'
                }} 
              />
            ) : (
              <PersonIcon sx={{ fontSize: 50 }} />
            )}
            <input 
              type="file" 
              hidden 
              accept="image/*" 
              onChange={handleFileUpload} 
            />
          </Avatar>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Edit Your Profile
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Update your personal information
          </Typography>
        </Box>

        {/* Personal Information Section */}
        <Box sx={{ mt: 4, mb: 2 }}>
          <Typography variant="h6" color="primary">Personal Information</Typography>
          <Divider sx={{ my: 1 }} />
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={userInfo.firstName}
              onChange={handleChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={userInfo.lastName}
              onChange={handleChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={userInfo.dateOfBirth}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Mobile Number"
              name="mobile"
              value={userInfo.mobile}
              onChange={handleChange}
              error={!!errors.mobile}
              helperText={errors.mobile}
              variant="outlined"
            />
          </Grid>
        </Grid>

        {/* Password Section */}
        <Box sx={{ mt: 4, mb: 2 }}>
          <Typography variant="h6" color="primary">Password</Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Leave blank to keep current password
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="New Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={userInfo.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {userInfo.password && (
              <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                <LinearProgress 
                  variant="determinate" 
                  value={Math.min(100, userInfo.password.length * 12.5)} 
                  color={
                    userInfo.password.length >= 12 ? 'success' : 
                    userInfo.password.length >= 8 ? 'warning' : 'error'
                  }
                  sx={{ flexGrow: 1, mr: 1 }}
                />
                <Typography variant="caption" color="text.secondary">
                  {userInfo.password.length >= 12 ? 'Strong' : 
                   userInfo.password.length >= 8 ? 'Medium' : 'Weak'}
                </Typography>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={userInfo.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {userInfo.confirmPassword && userInfo.password === userInfo.confirmPassword && (
              <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                <CheckCircle color="success" sx={{ fontSize: 16, mr: 0.5 }} />
                <Typography variant="caption" color="success.main">
                  Passwords match
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>

        {/* Additional Information Section */}
        <Box sx={{ mt: 4, mb: 2 }}>
          <Typography variant="h6" color="primary">Additional Information</Typography>
          <Divider sx={{ my: 1 }} />
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Parent/Guardian Name"
              name="parentName"
              value={userInfo.parentName}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Parent/Guardian Contact"
              name="parentContact"
              value={userInfo.parentContact}
              onChange={handleChange}
              error={!!errors.parentContact}
              helperText={errors.parentContact}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={userInfo.address}
              onChange={handleChange}
              multiline
              rows={3}
              variant="outlined"
            />
          </Grid>
        </Grid>

        {/* Save Button */}
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            fullWidth
            disabled={isSaving || hasErrors}
            startIcon={isSaving ? <CircularProgress size={20} /> : <SaveIcon />}
            sx={{
              py: 1.5,
              borderRadius: 2,
              fontSize: '1rem',
              fontWeight: 'bold',
              boxShadow: 'none',
              '&:hover': {
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </Box>
      </Paper>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
          icon={
            snackbar.severity === 'success' ? 
              <CheckCircle fontSize="inherit" /> : 
              <Error fontSize="inherit" />
          }
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;