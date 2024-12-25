import React from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SchoolIcon from '@mui/icons-material/School';

function HomePage() {
  const navigate = useNavigate();

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 6 }}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 6, 
            textAlign: 'center',
            background: 'linear-gradient(45deg, #2196f3 30%, #21CBF3 90%)',
            color: 'white'
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            Learn English Through Listening
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Improve your English skills with our interactive listening exercises
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            sx={{ 
              bgcolor: 'white', 
              color: '#2196f3',
              '&:hover': {
                bgcolor: '#e3f2fd',
              }
            }}
            onClick={() => navigate('/practice')}
          >
            Start Learning
          </Button>
        </Paper>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <HeadphonesIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" component="h2" gutterBottom>
                  Listen & Type
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Practice your listening skills by typing what you hear
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <TrendingUpIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" component="h2" gutterBottom>
                  Track Progress
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Monitor your improvement with detailed progress tracking
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <SchoolIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" component="h2" gutterBottom>
                  Learn Daily
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Practice regularly with our growing collection of words
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default HomePage; 