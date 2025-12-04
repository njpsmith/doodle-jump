import { useState, useEffect } from 'react';
import Game from './core/Game';

import './App.css';

function App() {
  // const [isJumping, setIsJumping] = useState(false);
  // const [doodlerBottomSpace, setDoodlerBottomSpace] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  // const [jumpTimer, setJumpTimer] = useState(0);

  return (
    <>
      <div className="App">
        <div className="grid">
          <Game />
          <div className="platforms-group">
            <div className="platform"></div>
          </div>

          {isGameOver && <div className="game-over">GAME OVER</div>}
        </div>
      </div>
    </>
  );
}

export default App;
