import { useState, useEffect } from 'react';

import './App.css';

import { startPoint } from './constants';

// import { startPoint } from './constants';

// //pixels and milliseconds
// const accelerationDueToGravity = 0.0004; //a
// const initialVelocityOfJump = 0.5; //um

// let upTimerId;
// let downTimerId;

//pixels and milliseconds
const accelerationDueToGravity = 0.0004; //a
const initialVelocityOfJump = 0.5; //um

let upTimerId;
let downTimerId;

function App() {
  const [isJumping, setIsJumping] = useState(false);
  const [doodlerBottomSpace, setDoodlerBottomSpace] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [jumpTimer, setJumpTimer] = useState(0);

  // useEffect(() => {
  //   jump();
  // }, []);

  const calculateJumpHeight = (jumpTimer) => {
    return (
      initialVelocityOfJump * jumpTimer -
      0.5 * accelerationDueToGravity * jumpTimer * jumpTimer
    );
  };

  const calculateFallHeight = (jumpTimer, heightAtApex) => {
    return (
      heightAtApex + -0.5 * accelerationDueToGravity * jumpTimer * jumpTimer
    );
  };

  const jump = () => {
    clearInterval(downTimerId);

    setIsJumping(true);
    setJumpTimer(0);

    upTimerId = setInterval(() => {
      const height = calculateJumpHeight(jumpTimer);

      setDoodlerBottomSpace(height);
      setJumpTimer((jumpTimer += 10));

      if (doodlerBottomSpace > startPoint + 150) {
        fall(height);
        setIsJumping(false);
      }
    }, 10);
  };

  const fall = (heightAtApex) => {
    setIsJumping(false);
    setJumpTimer(0);

    clearInterval(upTimerId);
    downTimerId = setInterval(() => {
      // console.log('heightAtApex', heightAtApex);

      const height = calculateFallHeight(jumpTimer, heightAtApex);

      setDoodlerBottomSpace(height);
      setJumpTimer((jumpTimer += 10));

      if (doodlerBottomSpace <= 0) {
        jump();
        // gameOver();
      }
      // platforms.forEach((platform) => {
      //   if (
      //     doodlerBottomSpace >= platform.bottom &&
      //     doodlerBottomSpace <= platform.bottom + 15 &&
      //     doodlerLeftSpace + 60 >= platform.left &&
      //     doodlerLeftSpace <= platform.left + 85 &&
      //     !isJumping
      //   ) {
      //     console.log('tick');
      //     startPoint = doodlerBottomSpace;
      //     jump();
      //     console.log('start', startPoint);
      //     isJumping = true;
      //   }
      // });
    }, 10);
  };

  const gameOver = () => {
    setIsGameOver(true);
    clearInterval(upTimerId);
    clearInterval(downTimerId);
    // while (grid.firstChild) {
    //   console.log('remove')
    //   grid.removeChild(grid.firstChild)
    // }
    // grid.innerHTML = score
    // clearInterval(upTimerId)
    // clearInterval(downTimerId)
    // clearInterval(leftTimerId)
    // clearInterval(rightTimerId)
  };

  // useEffect(() => {
  //   jump();
  // }, []);

  // const calculateJumpHeight = (jumpTimer) => {
  //   return (
  //     initialVelocityOfJump * jumpTimer -
  //     0.5 * accelerationDueToGravity * jumpTimer * jumpTimer
  //   );
  // };

  // const calculateFallHeight = (jumpTimer, heightAtApex) => {
  //   return (
  //     heightAtApex + -0.5 * accelerationDueToGravity * jumpTimer * jumpTimer
  //   );
  // };

  // const jump = () => {
  //   clearInterval(downTimerId);

  //   setIsJumping(true);
  //   setJumpTimer(0);

  //   upTimerId = setInterval(() => {
  //     const height = calculateJumpHeight(jumpTimer);

  //     setDoodlerBottomSpace(height);
  //     setJumpTimer((jumpTimer += 10));

  //     if (doodlerBottomSpace > startPoint + 150) {
  //       fall(height);
  //       setIsJumping(false);
  //     }
  //   }, 10);
  // };

  // const fall = (heightAtApex) => {
  //   setIsJumping(false);
  //   setJumpTimer(0);

  //   clearInterval(upTimerId);
  //   downTimerId = setInterval(() => {
  //     // console.log('heightAtApex', heightAtApex);

  //     const height = calculateFallHeight(jumpTimer, heightAtApex);

  //     setDoodlerBottomSpace(height);
  //     setJumpTimer((jumpTimer += 10));

  //     if (doodlerBottomSpace <= 0) {
  //       jump();
  //       // gameOver();
  //     }
  //     // platforms.forEach((platform) => {
  //     //   if (
  //     //     doodlerBottomSpace >= platform.bottom &&
  //     //     doodlerBottomSpace <= platform.bottom + 15 &&
  //     //     doodlerLeftSpace + 60 >= platform.left &&
  //     //     doodlerLeftSpace <= platform.left + 85 &&
  //     //     !isJumping
  //     //   ) {
  //     //     console.log('tick');
  //     //     startPoint = doodlerBottomSpace;
  //     //     jump();
  //     //     console.log('start', startPoint);
  //     //     isJumping = true;
  //     //   }
  //     // });
  //   }, 10);
  // };

  // const gameOver = () => {
  //   setIsGameOver(true);
  //   clearInterval(upTimerId);
  //   clearInterval(downTimerId);
  //   // while (grid.firstChild) {
  //   //   console.log('remove')
  //   //   grid.removeChild(grid.firstChild)
  //   // }
  //   // grid.innerHTML = score
  //   // clearInterval(upTimerId)
  //   // clearInterval(downTimerId)
  //   // clearInterval(leftTimerId)
  //   // clearInterval(rightTimerId)
  // };

  return (
    <>
      <div className="App">
        <div className="grid">
          <div className="platforms-group">
            <div className="platform"></div>
          </div>

          <div
            className="doodler"
            style={{ bottom: `${doodlerBottomSpace}px` }}
          ></div>
          {isGameOver && <div className="game-over">GAME OVER</div>}
        </div>
      </div>
    </>
  );
}

export default App;
