const DICTIONARY_API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

// Common words by difficulty for random selection
const wordsByDifficulty = {
  beginner: ['hello', 'world', 'book', 'tree', 'house', 'car', 'dog', 'cat', 'sun', 'moon', 'fish', 'bird', 'door', 'food'],
  intermediate: ['beautiful', 'computer', 'language', 'education', 'knowledge', 'experience', 'important', 'different', 'remember', 'together'],
  advanced: ['extraordinary', 'sophisticated', 'phenomenon', 'consciousness', 'philosophical', 'determination', 'comprehensive', 'revolutionary', 'perspective', 'theoretical']
};

export async function getRandomWord(difficulty) {
  try {
    // Get a random word from our difficulty-based list
    const words = wordsByDifficulty[difficulty];
    const randomWord = words[Math.floor(Math.random() * words.length)];

    // Fetch word details from Dictionary API with CORS headers
    const response = await fetch(`${DICTIONARY_API_URL}/${randomWord}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      mode: 'cors', // Enable CORS
    });
    
    if (!response.ok) {
      console.error('API Response not OK:', response.status, response.statusText);
      return getBackupWord(difficulty);
    }

    const data = await response.json();
    
    if (!data || !data[0]) {
      console.error('No data in API response');
      return getBackupWord(difficulty);
    }

    const wordData = data[0];
    const meanings = wordData.meanings || [];
    const firstMeaning = meanings[0] || {};
    const definitions = firstMeaning.definitions || [];
    const firstDefinition = definitions[0] || {};

    // Find the first audio file available
    const audioFile = wordData.phonetics?.find(p => p.audio)?.audio || '';

    return {
      word: wordData.word,
      hint: firstDefinition.definition || 'No definition available',
      phonetic: wordData.phonetic || '',
      example: firstDefinition.example || '',
      audio: audioFile,
      points: calculatePoints(wordData.word),
      partOfSpeech: firstMeaning.partOfSpeech || '',
      synonyms: firstDefinition.synonyms || [],
      antonyms: firstDefinition.antonyms || []
    };
  } catch (error) {
    console.error('Error in getRandomWord:', error);
    // Return backup word instead of throwing error
    return getBackupWord(difficulty);
  }
}

// Get either a word or phrase
export async function getRandomContent(difficulty, contentType = 'mixed') {
  try {
    // For now, we'll just use words since that's what we've implemented
    return await getRandomWord(difficulty);
  } catch (error) {
    console.error('Error in getRandomContent:', error);
    return getBackupWord(difficulty);
  }
}

function calculatePoints(word) {
  if (word.length <= 5) return 1;
  if (word.length <= 8) return 2;
  return 3;
}

// Enhanced backup words with more complete data
const backupWords = {
  beginner: [
    { 
      word: "book", 
      hint: "A written or printed work consisting of pages", 
      phonetic: "/bʊk/",
      example: "I love reading books",
      points: 1,
      partOfSpeech: "noun",
      synonyms: ["volume", "text", "publication"],
      antonyms: []
    },
    { 
      word: "tree", 
      hint: "A tall plant with a wooden trunk and branches", 
      phonetic: "/triː/",
      example: "The old oak tree provides shade",
      points: 1,
      partOfSpeech: "noun",
      synonyms: ["plant", "sapling"],
      antonyms: []
    }
  ],
  intermediate: [
    { 
      word: "language", 
      hint: "A structured system of communication", 
      phonetic: "/ˈlæŋɡwɪdʒ/",
      example: "English is a global language",
      points: 2,
      partOfSpeech: "noun",
      synonyms: ["speech", "tongue", "dialect"],
      antonyms: []
    }
  ],
  advanced: [
    { 
      word: "philosophy", 
      hint: "The study of fundamental questions about existence and knowledge", 
      phonetic: "/fɪˈlɒsəfi/",
      example: "She studied philosophy at university",
      points: 3,
      partOfSpeech: "noun",
      synonyms: ["thinking", "reasoning", "wisdom"],
      antonyms: []
    }
  ]
};

export function getBackupWord(difficulty) {
  const words = backupWords[difficulty];
  return words[Math.floor(Math.random() * words.length)];
}

// Enhanced speak function with better error handling
export function speakWord(word, audioUrl) {
  return new Promise((resolve, reject) => {
    if (audioUrl) {
      try {
        const audio = new Audio(audioUrl);
        audio.onerror = () => {
          console.warn('Audio file failed to load, falling back to TTS');
          useTTS(word, resolve, reject);
        };
        audio.onended = () => resolve();
        audio.play().catch(error => {
          console.warn('Audio playback failed, falling back to TTS');
          useTTS(word, resolve, reject);
        });
      } catch (error) {
        console.warn('Audio creation failed, falling back to TTS');
        useTTS(word, resolve, reject);
      }
    } else {
      useTTS(word, resolve, reject);
    }
  });
}

function useTTS(word, resolve, reject) {
  try {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.onend = () => resolve();
    utterance.onerror = (error) => reject(error);
    window.speechSynthesis.speak(utterance);
  } catch (error) {
    reject(error);
  }
} 