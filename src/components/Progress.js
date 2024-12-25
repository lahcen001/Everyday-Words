import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

function Progress() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Your Progress
          </Typography>
          <Typography variant="body1">
            This feature will be implemented soon to track your learning progress!
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}

export default Progress; 