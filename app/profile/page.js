'use client';

import { useSession, signOut } from "next-auth/react";
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  Avatar, 
  Paper 
} from "@mui/material";
import { redirect } from 'next/navigation';

export default function ProfilePage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth/signin');
    }
  });

  if (status === 'loading') {
    return <Typography>Loading...</Typography>;
  }

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
            alt={session.user.name} 
            src={session.user.image} 
            sx={{ width: 100, height: 100, mb: 2 }} 
          />
          <Typography component="h1" variant="h5">
            {session.user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {session.user.email}
          </Typography>
          
          <Button
            variant="contained"
            color="secondary"
            onClick={() => signOut()}
            sx={{ mt: 3 }}
          >
            Sign Out
          </Button>
        </Paper>
      </Box>
    </Container>
  );
} 