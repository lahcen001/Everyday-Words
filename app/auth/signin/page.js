'use client';

import { signIn } from "next-auth/react";
import { 
  Container, 
  Box, 
  Button, 
  Typography, 
  Paper,
  Divider,
  Stack
} from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import LanguageIcon from '@mui/icons-material/Language';

export default function SignIn() {
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
            p: 4, 
            width: '100%',
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          <LanguageIcon 
            sx={{ 
              fontSize: 48, 
              color: 'primary.main',
              mb: 2 
            }} 
          />
          
          <Typography component="h1" variant="h4" gutterBottom>
            Welcome Back
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
            Continue your English learning journey
          </Typography>

          <Stack spacing={2} sx={{ width: '100%', maxWidth: 300 }}>
            <Button
              variant="contained"
              onClick={() => signIn('google', { callbackUrl: '/' })}
              startIcon={<GoogleIcon />}
              sx={{ 
                py: 1.5,
                backgroundColor: '#4285F4',
                '&:hover': {
                  backgroundColor: '#3367D6'
                }
              }}
            >
              Sign in with Google
            </Button>

            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                or
              </Typography>
            </Divider>

            <Button
              variant="outlined"
              href="/"
              sx={{ py: 1.5 }}
            >
              Continue as Guest
            </Button>
          </Stack>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 4, textAlign: 'center' }}>
            By signing in, you agree to our{' '}
            <Typography
              component="a"
              href="/terms"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Terms of Service
            </Typography>
            {' '}and{' '}
            <Typography
              component="a"
              href="/privacy"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Privacy Policy
            </Typography>
          </Typography>
        </Paper>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Need help?{' '}
            <Typography
              component="a"
              href="/contact"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Contact Support
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
} 