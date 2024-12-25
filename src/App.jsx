import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WordPractice from './components/WordPractice';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<WordPractice />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 