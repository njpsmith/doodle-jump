import { useState, useEffect } from 'react';
import Game from './core/Game';
import SplashScreen from './core/SplashScreen';
import Leaderboard from './core/Leaderboard';
import NameEntry from './core/NameEntry';
import fallSound from './assets/sounds/fall.mp3';

import './App.css';

function App() {
  const [startGame, setStartGame] = useState(false);
  // const [startGame, setStartGame] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [resetGame, setResetGame] = useState(false);

  const [score, setScore] = useState(0);
  const [highScores, setHighScores] = useState([]);

  const [playerName, setPlayerName] = useState('');
  const [showNameEntryPrompt, setShowNameEntryPrompt] = useState(false);

  function restartGame() {
    setIsGameOver(false);
    setResetGame(true);
  }

  function qualifiesForHighScore(score, highScores) {
    // Only scores that are > 0 qualify, or scores that are greater than any of the top 3 currently recorded
    return (
      (highScores.length < 2 && score > 0) ||
      highScores.some((s) => score > s.score)
    );
  }

  const playFallSound = () => {
    // Play music. Sound from https://sound-effects.bbcrewind.co.uk/
    const audio = document.getElementById('fallSound');
    audio.currentTime = 0;
    audio.play().catch((err) => {
      console.warn('Audio play failed:', err);
    });
  };

  useEffect(() => {
    if (isGameOver) {
      playFallSound();

      // Add the score to the leaderboard if it is greater than any of the existing scores
      const doesQualify = qualifiesForHighScore(score, highScores);
      setShowNameEntryPrompt(doesQualify);
    }
  }, [isGameOver]);

  return (
    <>
      <div className="App">
        <div className="grid">
          <div className="score">Score: {score}</div>
          <SplashScreen
            startGame={startGame}
            setStartGame={setStartGame}
            highScores={highScores}
          />
          <Game
            startGame={startGame}
            setIsGameOver={setIsGameOver}
            isGameOver={isGameOver}
            resetGame={resetGame}
            setResetGame={setResetGame}
            setScore={setScore}
            score={score}
          />

          {showNameEntryPrompt && (
            <NameEntry
              score={score}
              playerName={playerName}
              setPlayerName={setPlayerName}
              setHighScores={setHighScores}
              setShowNameEntryPrompt={setShowNameEntryPrompt}
            />
          )}

          {isGameOver && (
            <div className="game-over">
              <div>GAME OVER</div>
              <button onClick={restartGame}>Restart</button>
              <Leaderboard highScores={highScores} />
            </div>
          )}
        </div>

        <audio id="fallSound">
          <source src={fallSound} type="audio/mpeg" />
        </audio>
      </div>
    </>
  );
}

export default App;
