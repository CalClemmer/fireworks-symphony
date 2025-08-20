export class Particle {
  constructor(
    public x: number,
    public y: number,
    public vx: number,
    public vy: number,
    public life: number,
    public color: string
  ) {}

  update(dt: number) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    // simple gravity
    this.vy += 50 * dt;
    this.life -= dt;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, 2, 2);
  }
}
