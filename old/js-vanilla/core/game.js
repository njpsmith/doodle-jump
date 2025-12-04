import Renderer from './Renderer.js';
import Input from './Input.js';
// import Storage from './Storage.js';
import { clamp } from './Utils.js';

import Player from '../entities/Player.js';
import PlatformSystem from '../systems/PlatformSystem.js';

const scrollThreshold = 300; // pixels from the top

export default class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.renderer = new Renderer(this.ctx);
    this.input = new Input();
    // this.storage = new Storage();

    this.lastTime = 0;

    // game state
    this.state = {
      score: 0,
      player: null,
      platforms: [],
    };
  }

  init() {
    this.state.player = new Player(200, 300); // middle of screen
    this.platformSystem = new PlatformSystem(this.state);

    // create initial platforms
    this.platformSystem.init();
  }

  start() {
    this.init();

    // console.log('this.state.platforms', this.state.platforms);

    requestAnimationFrame(this.loop.bind(this));
  }

  loop(timestamp) {
    const delta = timestamp - this.lastTime;
    this.lastTime = timestamp;

    this.update(delta);
    this.render();

    requestAnimationFrame(this.loop.bind(this));
  }

  update(delta) {
    const dt = delta / 1000;

    // update player, platforms
    this.state.player.update(dt, this.input, this.state.platforms);

    this.platformSystem.update(dt);

    // climb scoring
    this.state.score = Math.max(this.state.score, -this.state.player.y);

    // console.log('this.state.player.y', this.state.player.y);

    // Check if player has reached the threshold
    if (this.state.player.y < scrollThreshold) {
      const scrollAmount = scrollThreshold - this.state.player.y;

      // Move all platforms down
      this.state.platforms.forEach((p) => {
        p.y += scrollAmount;
      });

      // Move enemies, power-ups similarly if added
      // this.state.enemies.forEach(e => e.y += scrollAmount);
      // this.state.powerups.forEach(pu => pu.y += scrollAmount);

      // Move player to threshold position
      this.state.player.y = scrollThreshold;
    }
  }

  render() {
    this.renderer.clear();
    this.renderer.drawPlayer(this.state.player);
    this.renderer.drawPlatforms(this.state.platforms);
    this.renderer.drawScore(this.state.score);
  }
}
