import React, { useState, useEffect} from 'react';

function App() {
  const [word, setWord] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchRandomWord = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://random-word-api.herokuapp.com/word');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      const randomWord = data[0].toUpperCase();
      setWord(randomWord);
    } catch (error) {
      console.error('Error fetching the word:', error);
      setWord('ERROR');
    } finally {
      setLoading(false);
    }

  };
  const letterPress = (letter) => {
    console.log(`Letter pressed: ${letter}`);
  };

  useEffect(() => {
    fetchRandomWord();
  }, []);
  return (
    <div className="App">
      <h1>Hangman</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>Random Word: {word}</p>
          <button onClick={fetchRandomWord}>Fetch New Word</button>
          <div className ="hangman-post">
            <div className ="post-base"></div>
            <div className ="post-vertical"></div>
            <div className ="post-horizontal"></div>
            <div className ="post-rope"></div>
          </div>
          <div className="keyboard">
            <button onClick>A</button>
            <button onClick>B</button>
            <button onClick>C</button>
            <button onClick>D</button>
            <button onClick>E</button>
            <button onClick>F</button>
            <button onClick>G</button>
            <button onClick>H</button>
            <button onClick>I</button>
            <button onClick>J</button>
            <button onClick>K</button>
            <button onClick>L</button>
            <button onClick>M</button>
            <button onClick>N</button>
            <button onClick>O</button>
            <button onClick>P</button>
            <button onClick>Q</button>
            <button onClick>R</button>
            <button onClick>S</button>
            <button onClick>T</button>
            <button onClick>U</button>
            <button onClick>V</button>
            <button onClick>W</button>
            <button onClick>X</button>
            <button onClick>Y</button>
            <button onClick>Z</button>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default App;
