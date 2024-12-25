import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          sx={{ 
            flexGrow: 1, 
            textDecoration: 'none', 
            color: 'inherit' 
          }}
        >
          English Learning App
        </Typography>
        <Button color="inherit" component={Link} to="/practice">
          Practice
        </Button>
        <Button color="inherit" component={Link} to="/progress">
          Progress
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 