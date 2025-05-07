import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);

      // Simulate a successful login
      await login({ name: 'Demo User', email, role: 'student' }, 'mock-token');

      navigate('/dashboard'); // Redirect to the student dashboard
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDummyLogin = async (role) => {
    try {
      setError('');
      setLoading(true);

      const dummyCredentials = {
        name: `Demo ${role}`,
        email: `${role.toLowerCase()}@example.com`,
        role: role.toLowerCase(),
      };

      console.log('Logging in as:', dummyCredentials);

      // Simulate login
      await login(dummyCredentials, 'mock-token');

      // Redirect based on role
      if (role.toLowerCase() === 'student') {
        navigate('/dashboard');
      } else if (role.toLowerCase() === 'teacher') {
        navigate('/teacher');
      }
    } catch (err) {
      setError('Failed to login with test account.');
      console.error(err);
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
              {loading ? 'Signing In...' : 'Sign In'}
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
                <Link to="/signup" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="primary">
                    {"Don't have an account? Sign Up"}
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mt: 4, width: '100%' }}>
            <Typography variant="h6" align="center" gutterBottom>
              Test Login
            </Typography>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 1 }}
              onClick={() => handleDummyLogin('Student')}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login as Student'}
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 2 }}
              onClick={() => handleDummyLogin('Teacher')}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login as Teacher'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;