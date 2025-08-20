import { Particle } from './particle.js';

function randomColor(): string {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

export class Firework {
  private rocket: Particle;
  private particles: Particle[] = [];
  private exploded = false;

  constructor(private canvasWidth: number, private canvasHeight: number) {
    const x = Math.random() * canvasWidth;
    const speed = -150 - Math.random() * 50;
    this.rocket = new Particle(x, canvasHeight, 0, speed, 2, randomColor());
  }

  update(dt: number) {
    if (!this.exploded) {
      this.rocket.update(dt);
      if (this.rocket.vy >= 0) {
        this.explode();
      }
    }

    this.particles.forEach(p => p.update(dt));
    this.particles = this.particles.filter(p => p.life > 0);
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.exploded) {
      this.rocket.draw(ctx);
    }
    this.particles.forEach(p => p.draw(ctx));
  }

  private explode() {
    this.exploded = true;
    const count = 60 + Math.floor(Math.random() * 40);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 50 + Math.random() * 100;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      this.particles.push(new Particle(this.rocket.x, this.rocket.y, vx, vy, 2, this.rocket.color));
    }
  }
}
