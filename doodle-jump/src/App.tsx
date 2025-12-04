import { useState, useEffect } from 'react';
import Game from './core/Game';

import './App.css';

function App() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [resetGame, setResetGame] = useState(false);

  const [score, setScore] = useState(0);
  // const [maxHeight, setMaxHeight] = useState(0);

  function restartGame() {
    setIsGameOver(false);
    setResetGame(true);
  }

  return (
    <>
      <div className="App">
        <div className="grid">
          <div className="score">Score: {score}</div>

          <Game
            setIsGameOver={setIsGameOver}
            resetGame={resetGame}
            setResetGame={setResetGame}
            setScore={setScore}
            // setMaxHeight={setMaxHeight}
            // maxHeight={maxHeight}
          />

          {isGameOver && (
            <div className="game-over">
              <div>GAME OVER</div>
              <button onClick={restartGame}>Restart</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
