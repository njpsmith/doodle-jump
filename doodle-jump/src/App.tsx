import { useState, useEffect } from 'react';
import Game from './core/Game';
import SplashScreen from './core/SplashScreen';

import './App.css';

function App() {
  const [startGame, setStartGame] = useState(false);
  // const [startGame, setStartGame] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [resetGame, setResetGame] = useState(false);

  const [score, setScore] = useState(0);
  const [highScores, setHighScores] = useState([
    { score: 0, name: 'plumpas' },
    { score: 99, name: 'jack' },
  ]);

  function restartGame() {
    setIsGameOver(false);
    setResetGame(true);
  }

  useEffect(() => {
    // Add the score to the leaderboard if it is greater than any of the existing scores
    const addToLeaderboard = highScores.some((savedScore) => {
      return score > savedScore.score;
    });

    if (addToLeaderboard) {
      const updatedScores = [...highScores, { score: score, name: 'newboy' }];
      const sortedScores = updatedScores.sort((a, b) => b.score - a.score);

      let filteredScores = sortedScores;

      if (highScores.length > 3) {
        // Only keep top 5 high scores
        filteredScores.pop();
      }

      setHighScores(filteredScores);
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

          {isGameOver && (
            <div className="game-over">
              <div>GAME OVER</div>
              <button onClick={restartGame}>Restart</button>
              {/*<div className="high-score">High score: {highScores}</div>*/}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
