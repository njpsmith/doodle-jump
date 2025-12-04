import Platform from '../entities/Platform.js';
import { randomRange } from '../core/Utils.js';

export default class PlatformSystem {
  constructor(state) {
    this.state = state;
    this.spacing = 80;
  }

  init() {
    for (let i = 0; i < 10; i++) {
      const x = randomRange(40, 320);
      const y = 600 - i * 80;
      this.state.platforms.push(new Platform(x, y));
    }
  }

  update(dt) {
    const playerY = this.state.player.y;

    // console.log('runnung PlatformSystem update', this.state.platforms.length);

    // remove platforms below view
    this.state.platforms = this.state.platforms.filter(
      (p) => p.y > playerY - 700,
    );

    // generate new platforms above
    while (this.state.platforms.length < 20) {
      const highest = Math.min(...this.state.platforms.map((p) => p.y));

      const newY = highest - this.spacing;
      const newX = randomRange(20, 360);

      this.state.platforms.push(new Platform(newX, newY));
    }
  }
}
