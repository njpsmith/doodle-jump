// (gravity + movement + simple collision)

export default class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.width = 40;
    this.height = 40;

    this.vx = 0;
    this.vy = 0;

    this.gravity = 800;
    this.jumpForce = -450;
    this.moveSpeed = 250;
  }

  update(dt, input, platforms) {
    // horizontal movement
    if (input.keys.left) this.vx = -this.moveSpeed;
    else if (input.keys.right) this.vx = this.moveSpeed;
    else this.vx = 0;

    this.x += this.vx * dt;

    // gravity & vertical movement
    this.vy += this.gravity * dt;
    this.y += this.vy * dt;

    // collision with platforms
    for (const p of platforms) {
      const isFalling = this.vy > 0;
      const hit =
        this.x < p.x + p.width &&
        this.x + this.width > p.x &&
        this.y + this.height < p.y + 20 &&
        this.y + this.height > p.y &&
        isFalling;

      if (hit) {
        this.vy = this.jumpForce; // bounce upwards
      }
    }
  }
}
