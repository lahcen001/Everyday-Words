import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Box, 
  TextField, 
  Button, 
  Typography,
  Paper
} from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

function ListenType() {
  const [currentWord, setCurrentWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');

  const words = [
    'hello', 'world', 'learning', 'english', 'practice',
    'listen', 'speak', 'write', 'read', 'understand'
  ];

  useEffect(() => {
    getNewWord();
  }, []);

  const getNewWord = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(randomWord);
    setUserInput('');
    setMessage('');
  };

  const speakWord = () => {
    const utterance = new SpeechSynthesisUtterance(currentWord);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const handleSubmit = () => {
    if (userInput.toLowerCase() === currentWord.toLowerCase()) {
      setScore(score + 1);
      setMessage('Correct! 🎉');
      setTimeout(getNewWord, 1500);
    } else {
      setMessage('Try again! 😕');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Listen and Type
          </Typography>
          
          <Box sx={{ my: 3 }}>
            <Button 
              variant="contained" 
              startIcon={<VolumeUpIcon />}
              onClick={speakWord}
              size="large"
            >
              Listen
            </Button>
          </Box>

          <TextField
            fullWidth
            label="Type what you hear"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            margin="normal"
          />

          <Button 
            variant="contained" 
            onClick={handleSubmit}
            sx={{ mt: 2 }}
            fullWidth
          >
            Check Answer
          </Button>

          <Typography 
            variant="h6" 
            sx={{ mt: 2, textAlign: 'center' }}
            color={message.includes('Correct') ? 'success.main' : 'error.main'}
          >
            {message}
          </Typography>

          <Typography variant="h6" sx={{ mt: 2 }}>
            Score: {score}
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}

export default ListenType; 