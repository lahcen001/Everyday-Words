import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/Navbar';
import ListenType from './components/ListenType';
import Progress from './components/Progress';
import HomePage from './components/page';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/practice" element={<ListenType />} />
          <Route path="/progress" element={<Progress />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 