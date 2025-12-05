import { useState, useEffect } from 'react';
import Game from './core/Game';
import SplashScreen from './core/SplashScreen';
import Leaderboard from './core/Leaderboard';

import './App.css';

function App() {
  const [startGame, setStartGame] = useState(false);
  // const [startGame, setStartGame] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [resetGame, setResetGame] = useState(false);

  const [score, setScore] = useState(0);
  const [highScores, setHighScores] = useState([]);

  const [playerName, setPlayerName] = useState('');
  const [showNamePrompt, setShowNamePrompt] = useState(false);

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

  function handleSubmitName(e) {
    e.preventDefault();

    const newEntry = { score, name: playerName };

    setHighScores((prev) => {
      const updated = [...prev, newEntry]
        .sort((a, b) => b.score - a.score)
        .slice(0, 3); // keep top 3

      return updated;
    });

    // hide prompt
    setShowNamePrompt(false);
  }

  useEffect(() => {
    if (isGameOver) {
      // Add the score to the leaderboard if it is greater than any of the existing scores
      const doesQualify = qualifiesForHighScore(score, highScores);
      setShowNamePrompt(doesQualify);
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

          {showNamePrompt && (
            <div className="name-entry">
              <form onSubmit={handleSubmitName}>
                <label htmlFor="scorename">
                  You made the leaderboard! Enter your name
                </label>
                <input
                  id="scorename"
                  name="scorename"
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Enter your name"
                />
                <button type="submit">Save Score</button>
              </form>
            </div>
          )}

          {isGameOver && (
            <div className="game-over">
              <div>GAME OVER</div>
              <button onClick={restartGame}>Restart</button>
              <Leaderboard highScores={highScores} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
