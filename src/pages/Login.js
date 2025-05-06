import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Checkbox,
  FormControlLabel,
  Alert,
  CircularProgress
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, isAuthenticated, role } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect location from state or use default
  const from = location.state?.from?.pathname || 
    (role === 'teacher' ? '/teacher-dashboard' : '/dashboard');

  // Log authentication state for debugging
  console.log('Login Component:', { isAuthenticated, role, from });
  
  // If already logged in, redirect to appropriate dashboard
  useEffect(() => {
    if (isAuthenticated) {
      console.log('Already authenticated, redirecting to:', from);
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, role, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate input
    if (!email) {
      setError('Please enter an email address');
      return;
    }
    
    if (!password) {
      setError('Please enter a password');
      return;
    }

    try {
      setError('');
      setLoading(true);

      // Determine role based on email (for demo purposes)
      const role = email.includes('teacher') ? 'teacher' : 'student';
      const name = email.split('@')[0];

      console.log('Attempting login with:', { email, role, name });
      
      // Call login function
      await login({ name, email, role }, 'mock-token');
      
      // Navigation will be handled by the useEffect
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDummyLogin = async (role) => {
    try {
      setError('');
      setLoading(true);

      // Set dummy credentials based on the role
      const dummyCredentials = {
        name: `Demo ${role}`,
        email: role === 'Student' ? 'student@example.com' : 'teacher@example.com',
        role: role.toLowerCase()
      };

      console.log('Using dummy credentials:', dummyCredentials);

      // Call login function
      await login(dummyCredentials, 'mock-token');
      
      // Navigation will be handled by the useEffect
    } catch (err) {
      console.error('Dummy login error:', err);
      setError('Failed to login with test account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in to Virtual Classroom
          </Typography>
          {error && (
            <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
              {error}
            </Alert>
          )}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="primary">
                    Forgot password?
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="primary">
                    {"Don't have an account? Sign Up"}
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mt: 3, width: '100%' }}>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
              Or use test accounts:
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  onClick={() => handleDummyLogin('Student')}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Login as Student'}
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDummyLogin('Teacher')}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Login as Teacher'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;