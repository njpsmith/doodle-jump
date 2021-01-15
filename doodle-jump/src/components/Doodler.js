import React from 'react';
import { startPoint } from '../constants';

let upTimerId;
let downTimerId;

class Doodler extends React.Component {
  state = {
    isJumping: false,
    doodlerBottomSpace: 0,
    isGameOver: false,
  };

  componentDidMount() {
    this.jump();
  }

  jump = () => {
    clearInterval(downTimerId);
    this.setState({ isJumping: true });

    upTimerId = setInterval(() => {
      this.setState((state) => {
        return { doodlerBottomSpace: (state.doodlerBottomSpace += 2) };
      });
      // console.log('doodlerBottomSpace', this.state.doodlerBottomSpace);
      if (this.state.doodlerBottomSpace > startPoint + 200) {
        this.fall();
        this.setState({ isJumping: false });
      }
    }, 10);
  };

  fall = () => {
    this.setState({ isJumping: false });
    clearInterval(upTimerId);
    downTimerId = setInterval(() => {
      this.setState((state) => {
        return { doodlerBottomSpace: (state.doodlerBottomSpace -= 2) };
      });

      if (this.state.doodlerBottomSpace <= 0) {
        this.gameOver();
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
      <div>
        <div
          className="doodler"
          style={{ bottom: `${this.state.doodlerBottomSpace}px` }}
        ></div>
        {this.state.isGameOver}
        {this.state.isGameOver && <div className="game-over">GAME OVER</div>}
      </div>
    );
  }
}

export default Doodler;
