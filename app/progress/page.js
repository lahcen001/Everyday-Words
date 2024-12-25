'use client';

import React from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider 
} from '@mui/material';

export default function ProgressPage() {
  // This would typically come from a backend/database
  const mockProgress = {
    totalScore: 125,
    wordsLearned: 42,
    accuracy: "85%",
    streak: 7,
    recentWords: [
      "phenomenon",
      "appreciate",
      "schedule",
      "morning",
      "goodbye"
    ]
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom align="center">
            Your Progress
          </Typography>

          <List>
            <ListItem>
              <ListItemText 
                primary="Total Score" 
                secondary={mockProgress.totalScore} 
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText 
                primary="Words Learned" 
                secondary={mockProgress.wordsLearned} 
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText 
                primary="Accuracy" 
                secondary={mockProgress.accuracy} 
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText 
                primary="Current Streak" 
                secondary={`${mockProgress.streak} days`} 
              />
            </ListItem>
          </List>

          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
            Recently Practiced Words
          </Typography>
          <List>
            {mockProgress.recentWords.map((word, index) => (
              <ListItem key={index}>
                <ListItemText primary={word} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
} 