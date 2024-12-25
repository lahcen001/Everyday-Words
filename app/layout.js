'use client';

import { AppBar, Toolbar, Typography, Button, Box, Container, Grid, Link } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeRegistry from './registry';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1B1B1B',
      light: '#2C2C2C',
      dark: '#000000',
    },
    secondary: {
      main: '#C49B66',
      light: '#D4B483',
      dark: '#A67C4A',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F5F5F5',
    },
    text: {
      primary: '#1B1B1B',
      secondary: '#4A4A4A',
    },
  },
  typography: {
    fontFamily: '"Playfair Display", "Times New Roman", serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    body1: {
      fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
      fontSize: '1.1rem',
      lineHeight: 1.7,
    },
    body2: {
      fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
      fontSize: '0.95rem',
      lineHeight: 1.6,
    },
    button: {
      fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1B1B1B',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          padding: '10px 24px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
  },
});

function NavButtons() {
  return (
    <>
      <Button color="inherit" href="/practice">
        Practice
      </Button>
      <Button color="inherit" href="/progress">
        Progress
      </Button>
      <Button color="inherit" href="/login">
        Login
      </Button>
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap"
        />
      </head>
      <body style={{ margin: 0, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <ThemeRegistry options={{ key: 'mui' }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="static">
              <Toolbar>
                <Typography 
                  variant="h6" 
                  component="a" 
                  href="/"
                  sx={{ 
                    flexGrow: 1, 
                    textDecoration: 'none', 
                    color: 'inherit',
                    cursor: 'pointer'
                  }}
                >
                  Everyday Words
                </Typography>
                <NavButtons />
              </Toolbar>
            </AppBar>
            
            <Box sx={{ flexGrow: 1, minHeight: 'calc(100vh - 300px)' }}>
              {children}
            </Box>

            <Box 
              component="footer" 
              sx={{ 
                bgcolor: 'primary.main', 
                color: 'white', 
                py: 4,
                mt: 4 
              }}
            >
              <Container maxWidth="lg">
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="h6" gutterBottom>
                      Everyday Words
                    </Typography>
                    <Typography variant="body2">
                      Improve your English skills through interactive listening exercises
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={4}>
                    <Typography variant="h6" gutterBottom>
                      Quick Links
                    </Typography>
                    <Box>
                      <Link href="/" color="inherit" underline="hover" sx={{ display: 'block', mb: 1 }}>
                        Home
                      </Link>
                      <Link href="/practice" color="inherit" underline="hover" sx={{ display: 'block', mb: 1 }}>
                        Practice
                      </Link>
                      <Link href="/progress" color="inherit" underline="hover" sx={{ display: 'block', mb: 1 }}>
                        Progress
                      </Link>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} sm={4}>
                    <Typography variant="h6" gutterBottom>
                      Connect With Us
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Link href="https://github.com" target="_blank" color="inherit">
                        <GitHubIcon />
                      </Link>
                      <Link href="https://twitter.com" target="_blank" color="inherit">
                        <TwitterIcon />
                      </Link>
                      <Link href="https://linkedin.com" target="_blank" color="inherit">
                        <LinkedInIcon />
                      </Link>
                    </Box>
                  </Grid>
                </Grid>

                <Box sx={{ 
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)', 
                  mt: 3, 
                  pt: 3,
                  textAlign: 'center'
                }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {new Date().getFullYear()} Everyday Words. All Rights Reserved.
                  </Typography>
                  <Typography variant="body2">
                    Developed by{' '}
                    <Link 
                      href="https://lahcen.click" 
                      target="_blank" 
                      color="inherit"
                      sx={{ 
                        textDecoration: 'underline',
                        '&:hover': {
                          color: 'secondary.light'
                        }
                      }}
                    >
                      Lahcen El Hanchir
                    </Link>
                  </Typography>
                </Box>
              </Container>
            </Box>
          </ThemeProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
