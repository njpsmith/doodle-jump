import { render } from '@testing-library/react';
import React from 'react';
import './App.css';

// import Doodler from './components/Doodler';

import { startPoint } from './constants';

//pixels and milliseconds
const accelerationDueToGravity = 0.0004; //a
const initialVelocityOfJump = 0.5; //um

let upTimerId;
let downTimerId;

class App extends React.Component {
  state = {
    isJumping: false,
    doodlerBottomSpace: 0,
    isGameOver: false,
    jumpTimer: 0,
  };

  componentDidMount() {
    this.jump();
  }

  calculateJumpHeight = (jumpTimer) => {
    return (
      initialVelocityOfJump * jumpTimer -
      0.5 * accelerationDueToGravity * jumpTimer * jumpTimer
    );
  };

  calculateFallHeight = (jumpTimer, heightAtApex) => {
    return (
      heightAtApex + -0.5 * accelerationDueToGravity * jumpTimer * jumpTimer
    );
  };

  jump = () => {
    clearInterval(downTimerId);

    this.setState({ isJumping: true, jumpTimer: 0 });

    upTimerId = setInterval(() => {
      const { jumpTimer } = this.state;
      const height = this.calculateJumpHeight(jumpTimer);

      this.setState((state) => {
        return {
          doodlerBottomSpace: (state.doodlerBottomSpace = height),
          // doodlerBottomSpace: (state.doodlerBottomSpace += 2),
          jumpTimer: (state.jumpTimer += 10),
        };
      });
      if (this.state.doodlerBottomSpace > startPoint + 150) {
        this.fall(height);
        this.setState({ isJumping: false });
      }
    }, 10);
  };

  fall = (heightAtApex) => {
    // console.log('fall', this.state.jumpTimer);
    this.setState({ isJumping: false, jumpTimer: 0 }, () => {
      clearInterval(upTimerId);
      downTimerId = setInterval(() => {
        const { jumpTimer } = this.state;
        // console.log('heightAtApex', heightAtApex);
        this.setState((state) => {
          const height = this.calculateFallHeight(jumpTimer, heightAtApex);

          return {
            doodlerBottomSpace: (state.doodlerBottomSpace = height),
            jumpTimer: (state.jumpTimer += 10),
          };
        });

        if (this.state.doodlerBottomSpace <= 0) {
          this.jump();
          // this.gameOver();
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
    });
  };

  gameOver = () => {
    this.setState({ isGameOver: true });
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

  render() {
    return (
      <div className="App">
        <div className="grid">
          <div className="platforms-group">
            <div className="platform"></div>
          </div>

          <div
            className="doodler"
            style={{ bottom: `${this.state.doodlerBottomSpace}px` }}
          ></div>
          {this.state.isGameOver && <div className="game-over">GAME OVER</div>}
        </div>
      </div>
    );
  }
}

export default App;
