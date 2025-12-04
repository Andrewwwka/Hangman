import React, { useState, useEffect} from 'react';

function App() {
  const [word, setWord] = useState('');
  const [loading, setLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  /* variable to track strikes */
  let strikes = 0;
  const maxStrikes = 6;

  /* function to update hangman drawing based on strikes */
  function hangmanDrawing() {
    const figureParts = [
      'figure-head',
      'figure-body',
      'figure-arm-left',
      'figure-arm-right',
      'figure-leg-left',
      'figure-leg-right',
    ];

    figureParts.forEach((part, index) => {
      const element = document.querySelector(`.${part}`);
      if (index < strikes) {
        element.style.display = 'block';
      } else {
        element.style.display = 'none';
      }
    });
  }

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
    strikes = 0;
    hangmanDrawing();
    const letterBoxes = document.querySelectorAll('.letter-box');
    letterBoxes.forEach((box) => {
      box.textContent = '_';
    });
    const buttons = document.querySelectorAll('.keyboard button');
    buttons.forEach((button) => {
      button.disabled = false;

    });
    setShowAlert(false);
    fetchRandomWord();
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

      const currentWord = Array.from(letterBoxes).map((box) => box.textContent).join('');
      if (currentWord === word) {
        // Disable further input
        const buttons = document.querySelectorAll('.keyboard button');
        buttons.forEach((button) => {
          button.disabled = true;
        });
        setAlertMessage('Congratulations! You guessed the word!');
        setShowAlert(true);
      }
    } else {
      strikes += 1;
      hangmanDrawing();
      if (strikes >= maxStrikes) {
        // Disable further input
        const buttons = document.querySelectorAll('.keyboard button');
        buttons.forEach((button) => {
          button.disabled = true;
        });
        setAlertMessage(`Game Over! The word was: ${word}`);
        setShowAlert(true);
      }
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
          {/* 
          <p>Random Word: {word}</p>
          <button onClick={fetchRandomWord}>Fetch New Word</button>
          <button onClick={resetBoard}>Reset Board</button>
          */}
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
          {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
              <button key={letter} onClick={() => letterPress(letter)}>
                {letter}
              </button>
          ))}
          </div>
        </div>
      )}
      {showAlert && (
        <div className="alert-box">
          <p>{alertMessage}</p>
          <button onClick={resetBoard}>Reset Game</button>
        </div>
      )}
    </div>
  );
  }

export default App;
