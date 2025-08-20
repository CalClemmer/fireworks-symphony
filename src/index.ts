import { Firework } from './firework.js';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

const fireworks: Firework[] = [];
let lastTime = performance.now();

function launch() {
  fireworks.push(new Firework(canvas.width, canvas.height));
}
setInterval(launch, 1000);

function frame(time: number) {
  const dt = (time - lastTime) / 1000;
  lastTime = time;

  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach(f => f.update(dt));
  fireworks.forEach(f => f.draw(ctx));

  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
