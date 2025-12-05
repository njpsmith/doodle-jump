import { useState, useEffect } from 'react';
import Game from './core/Game';
import SplashScreen from './core/SplashScreen';

import './App.css';

function App() {
  // const [startGame, setStartGame] = useState(false);
  const [startGame, setStartGame] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [resetGame, setResetGame] = useState(false);

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  function restartGame() {
    setIsGameOver(false);
    setResetGame(true);
  }

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
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
            highScore={highScore}
          />
          <Game
            startGame={startGame}
            setIsGameOver={setIsGameOver}
            resetGame={resetGame}
            setResetGame={setResetGame}
            setScore={setScore}
            score={score}
          />
          {isGameOver && (
            <div className="game-over">
              <div>GAME OVER</div>
              <button onClick={restartGame}>Restart</button>
              <div className="high-score">High score: {highScore}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
