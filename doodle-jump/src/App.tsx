import { useState, useEffect } from 'react';
import Game from './core/Game';

import './App.css';

function App() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [resetGame, setResetGame] = useState(false);

  function restartGame() {
    setIsGameOver(false);
    setResetGame(true);
  }

  return (
    <>
      <div className="App">
        <div className="grid">
          <Game
            setIsGameOver={setIsGameOver}
            resetGame={resetGame}
            setResetGame={setResetGame}
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
