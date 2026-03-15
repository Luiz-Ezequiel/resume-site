const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
const simplex = new SimplexNoise();

let width, height, particles;
let mouse = { x: -1000, y: -1000 };

const SPACING = 18;
const SCALE = 500;
const MAGNITUDE = 2; // Base movement

function init() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  particles = [];

  for (let x = -SPACING; x < width + SPACING; x += SPACING) {
    for (let y = -SPACING; y < height + SPACING; y += SPACING) {
      particles.push({
        x, y,
        seed: Math.random()
      });
    }
  }
}

function animate() {
  const isDark = document.documentElement.classList.contains('dark');
  ctx.fillStyle = isDark ? 'rgba(5, 5, 5, 0.3)' : 'rgba(255, 255, 255, 0.3)';
  ctx.fillRect(0, 0, width, height);

  const time = Date.now() * 0.0001;

  particles.forEach(p => {
    const noise = simplex.noise3D(p.x / SCALE, p.y / SCALE, time);
    const angle = noise * Math.PI * 2;

    const dx = Math.cos(angle) * MAGNITUDE;
    const dy = Math.sin(angle) * MAGNITUDE;


    ctx.beginPath();
    ctx.arc(p.x + dx, p.y + dy, 0.8, 0, Math.PI * 2);

    const brightness = isDark ? 195 : 95;
    const alpha = (Math.abs(noise) * 0.4 + 0.1) * p.seed;

    ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${brightness}, ${alpha})`;
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

window.addEventListener('resize', init);
init();
animate();
