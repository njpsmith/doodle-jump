export default class Renderer {
  constructor(ctx) {
    this.ctx = ctx;
  }

  clear() {
    this.ctx.clearRect(0, 0, 400, 600);
  }

  drawPlayer(player) {
    this.ctx.fillStyle = 'dodgerblue';
    this.ctx.fillRect(player.x, player.y, player.width, player.height);
  }

  drawPlatforms(platforms) {
    this.ctx.fillStyle = 'green';

    for (const p of platforms) {
      this.ctx.fillRect(p.x, p.y, p.width, p.height);
    }
  }

  drawScore(score) {
    this.ctx.fillStyle = 'black';
    this.ctx.font = '20px sans-serif';
    this.ctx.fillText(Math.floor(score), 10, 25);
  }
}
