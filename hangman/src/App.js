import React, { useState, useEffect} from 'react';

function App() {
  const [word, setWord] = useState('');
  const [loading, setLoading] = useState(true);

  /* function to fetch a random word from an API */
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
  /* function to reset the board */
  const resetBoard = () => {
    const letterBoxes = document.querySelectorAll('.letter-box');
    letterBoxes.forEach((box) => {
      box.textContent = '_';
    });
    const buttons = document.querySelectorAll('.keyboard button');
    buttons.forEach((button) => {
      button.disabled = false;
    });
  }

  /* function to handle letter press */
  const letterPress = (letter) => {
    if (!letter) return;

    const letterBoxes = document.querySelectorAll('.letter-box');
    if (word.includes(letter)) {
      word.split('').forEach((char, index) => {
        if (char === letter) {
          letterBoxes[index].textContent = letter;
        }
      });
    } else {
      console.log(`Wrong guess: ${letter}`);
    }

  const buttons = document.querySelectorAll('.keyboard button');
  buttons.forEach((button) => {
    if (button.textContent === letter) {
      button.disabled = true;
    }
  });
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
          <button onClick={resetBoard}>Reset Board</button>
          <div className ="hangman-post">
            <div className ="post-base"></div>
            <div className ="post-vertical"></div>
            <div className ="post-horizontal"></div>
            <div className ="post-rope"></div>
          </div>
          <div className = "hangman-figure">
            <div className ="figure-head"></div>
            <div className ="figure-body"></div>
            <div className ="figure-arm-left"></div>
            <div className ="figure-arm-right"></div>
            <div className ="figure-leg-left"></div>
            <div className ="figure-leg-right"></div>
          </div>
          <div className="word-display">
            {word.split('').map((letter, index) => (
              <span key={index} className="letter-box">
                _
              </span>
            ))}
          </div>
          <div className="keyboard">
            <button onClick={() => letterPress('A')}>A</button>
            <button onClick={() => letterPress('B')}>B</button>
            <button onClick={() => letterPress('C')}>C</button>
            <button onClick={() => letterPress('D')}>D</button>
            <button onClick={() => letterPress('E')}>E</button>
            <button onClick={() => letterPress('F')}>F</button>
            <button onClick={() => letterPress('G')}>G</button>
            <button onClick={() => letterPress('H')}>H</button>
            <button onClick={() => letterPress('I')}>I</button>
            <button onClick={() => letterPress('J')}>J</button>
            <button onClick={() => letterPress('K')}>K</button>
            <button onClick={() => letterPress('L')}>L</button>
            <button onClick={() => letterPress('M')}>M</button>
            <button onClick={() => letterPress('N')}>N</button>
            <button onClick={() => letterPress('O')}>O</button>
            <button onClick={() => letterPress('P')}>P</button>
            <button onClick={() => letterPress('Q')}>Q</button>
            <button onClick={() => letterPress('R')}>R</button>
            <button onClick={() => letterPress('S')}>S</button>
            <button onClick={() => letterPress('T')}>T</button>
            <button onClick={() => letterPress('U')}>U</button>
            <button onClick={() => letterPress('V')}>V</button>
            <button onClick={() => letterPress('W')}>W</button>
            <button onClick={() => letterPress('X')}>X</button>
            <button onClick={() => letterPress('Y')}>Y</button>
            <button onClick={() => letterPress('Z')}>Z</button>
          </div>
        </div>
      )}
    </div>
  );
  }

export default App;
