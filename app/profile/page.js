'use client';

import { useEffect } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  Avatar, 
  Paper 
} from "@mui/material";
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/login');
  };

  return (
    <Container maxWidth="sm">
      <Box 
        sx={{ 
          marginTop: 8, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center' 
        }}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            padding: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            width: '100%'
          }}
        >
          <Avatar 
            sx={{ width: 100, height: 100, mb: 2, bgcolor: 'secondary.main' }}
          >
            U
          </Avatar>
          <Typography component="h1" variant="h5">
            User Profile
          </Typography>
          <Box sx={{ mt: 3, width: '100%' }}>
            <Typography variant="body1" gutterBottom>
              Welcome to your profile page!
            </Typography>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogout}
            >
              Sign Out
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}