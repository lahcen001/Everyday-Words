import React, { useState, useEffect } from 'react';
import './WordPractice.css';

const WordPractice = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [wordList] = useState([
    'apple', 'banana', 'computer', 'elephant', 'flower',
    'guitar', 'hospital', 'internet', 'jungle', 'kitchen'
  ]);

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
  };

  const speakWord = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.toLowerCase() === currentWord.toLowerCase()) {
      setIsCorrect(true);
      setScore(score + 1);
      setTimeout(() => {
        setUserInput('');
        setIsCorrect(null);
        setCurrentWord(getRandomWord());
      }, 1000);
    } else {
      setIsCorrect(false);
    }
  };

  useEffect(() => {
    setCurrentWord(getRandomWord());
  }, []);

  return (
    <div className="word-practice">
      <h1>English Word Practice</h1>
      <div className="score">Score: {score}</div>
      <div className="word-container">
        <button 
          className="speak-button"
          onClick={() => speakWord(currentWord)}
        >
          🔊 Listen to the Word
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type the word you hear..."
          className="word-input"
        />
        <button type="submit" className="submit-button">
          Check
        </button>
      </form>
      {isCorrect !== null && (
        <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? 'Correct!' : `Incorrect. The word was "${currentWord}"`}
        </div>
      )}
    </div>
  );
};

export default WordPractice; 