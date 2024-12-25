'use client';

import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Box, 
  TextField, 
  Button, 
  Typography,
  Paper,
  IconButton,
  Collapse,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert
} from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import RefreshIcon from '@mui/icons-material/Refresh';
import { getRandomWord, getBackupWord, getRandomPhrase, getRandomContent, speakWord } from '@/services/wordService';

export default function PracticePage() {
  const [currentWord, setCurrentWord] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [currentLevel, setCurrentLevel] = useState('beginner');
  const [attempts, setAttempts] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [contentType, setContentType] = useState('mixed');

  useEffect(() => {
    getNewContent();
  }, [currentLevel, contentType]);

  const getNewContent = async () => {
    setLoading(true);
    setError('');
    try {
      const newContent = await getRandomContent(currentLevel, contentType);
      setCurrentWord(newContent);
      setUserInput('');
      setMessage('');
      setAttempts(0);
      setShowAnswer(false);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSpeak = () => {
    if (!currentWord) return;
    speakWord(currentWord.word, currentWord.audio);
  };

  const handleSubmit = () => {
    if (!currentWord) return;
    
    if (userInput.toLowerCase() === currentWord.word.toLowerCase()) {
      setScore(score + currentWord.points);
      setMessage('Correct! 🎉');
      setTimeout(getNewContent, 1500);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= 3) {
        setShowAnswer(true);
        setMessage('Keep trying! Here\'s the answer to help you learn 📚');
      } else {
        setMessage(`Try again! (Attempt ${newAttempts}/3) 😕`);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSkip = () => {
    if (!currentWord) return;
    setMessage(`The word was: "${currentWord.word}"`);
    setTimeout(getNewContent, 2000);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom align="center">
            Listen and Type
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Difficulty Level</InputLabel>
              <Select
                value={currentLevel}
                label="Difficulty Level"
                onChange={(e) => setCurrentLevel(e.target.value)}
              >
                <MenuItem value="beginner">Beginner</MenuItem>
                <MenuItem value="intermediate">Intermediate</MenuItem>
                <MenuItem value="advanced">Advanced</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Content Type</InputLabel>
              <Select
                value={contentType}
                label="Content Type"
                onChange={(e) => setContentType(e.target.value)}
              >
                <MenuItem value="mixed">Mixed</MenuItem>
                <MenuItem value="words">Words Only</MenuItem>
                <MenuItem value="phrases">Phrases Only</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ my: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
              <IconButton 
                onClick={handleSpeak}
                size="large"
                disabled={!currentWord}
                sx={{ 
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                  width: '64px',
                  height: '64px'
                }}
              >
                <VolumeUpIcon fontSize="large" />
              </IconButton>
              <IconButton
                onClick={getNewContent}
                size="large"
                sx={{ 
                  bgcolor: 'secondary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'secondary.dark',
                  },
                  width: '64px',
                  height: '64px'
                }}
              >
                <RefreshIcon fontSize="large" />
              </IconButton>
            </Box>
          )}

          {currentWord && (
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Hint: {currentWord.hint}
              </Typography>
              {currentWord.phonetic && (
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Phonetic: {currentWord.phonetic}
                </Typography>
              )}
              {currentWord.example && (
                <Typography variant="body2" color="text.secondary">
                  Example: {currentWord.example}
                </Typography>
              )}
            </Box>
          )}

          <TextField
            fullWidth
            label="Type what you hear"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            margin="normal"
            autoFocus
            disabled={!currentWord}
          />

          <Button 
            variant="contained" 
            onClick={handleSubmit}
            sx={{ mt: 2 }}
            fullWidth
            disabled={!currentWord}
          >
            Check Answer
          </Button>

          <Button 
            variant="outlined" 
            onClick={handleSkip}
            sx={{ mt: 1 }}
            fullWidth
            disabled={!currentWord}
          >
            Skip Word
          </Button>

          <Typography 
            variant="h6" 
            sx={{ mt: 2, textAlign: 'center' }}
            color={message.includes('Correct') ? 'success.main' : 'error.main'}
          >
            {message}
          </Typography>

          <Collapse in={showAnswer}>
            <Paper 
              elevation={0} 
              sx={{ 
                mt: 2, 
                p: 2, 
                bgcolor: 'info.light',
                color: 'info.contrastText'
              }}
            >
              <Typography align="center">
                Answer: {currentWord?.word}
              </Typography>
            </Paper>
          </Collapse>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="primary">
              Score: {score}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Level: {currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1)}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}