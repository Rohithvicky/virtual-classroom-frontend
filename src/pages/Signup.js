import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const Signup = () => {
  const handleSignup = (event) => {
    event.preventDefault();
    // Add signup logic here
    console.log('Signup form submitted');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        p: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Signup
      </Typography>
      <Box
        component="form"
        onSubmit={handleSignup}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '100%',
          maxWidth: 400,
        }}
      >
        <TextField label="Name" variant="outlined" fullWidth required />
        <TextField label="Email" type="email" variant="outlined" fullWidth required />
        <TextField label="Password" type="password" variant="outlined" fullWidth required />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Signup
        </Button>
      </Box>
    </Box>
  );
};

export default Signup;