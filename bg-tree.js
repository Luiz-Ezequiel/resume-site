const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');


const r180 = Math.PI;
const r90 = Math.PI / 2;
const r15 = Math.PI / 12;
const color = '#88888825';
const MIN_BRANCH = 30;
let len = 6;

let steps = [];
let prevSteps = [];
let width, height;

function initCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;

    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
}

function polar2cart(x=0, y=0, r=0, theta=0) {
    return [x + r * Math.cos(theta), y + r * Math.sin(theta)];
}

function step(x, y, rad, counter = { value: 0 }) {
    const length = Math.random() * len;
    counter.value += 1;

    const [nx, ny] = polar2cart(x, y, length, rad);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(nx, ny);
    ctx.stroke();


    // Boundary check
    if (nx < -100 || nx > width + 100 || ny < -100 || ny > height + 100) return;

    const rate = counter.value <= MIN_BRANCH ? 0.8 : 0.5;

    // Add new branches to the "pending" list for the next frame
    if (Math.random() < rate) steps.push(() => step(nx, ny, rad + Math.random() * r15, counter));
    if (Math.random() < rate) steps.push(() => step(nx, ny, rad - Math.random() * r15, counter));
}

function frame() {
    prevSteps = steps;
    steps = [];

    prevSteps.forEach(i => {
        // 50% chance to execute now, or defer to next frame for organic growth
        if (Math.random() < 0.5) steps.push(i);
        else i();
    });

    if (steps.length > 0) {
        requestAnimationFrame(frame);
    }
}

function start() {
    initCanvas();
    ctx.clearRect(0, 0, width, height);

    const randomMiddle = () => Math.random() * 0.6 + 0.2;

    // Seed the 4 starting points (Top, Bottom, Left, Right)
    steps = [
        () => step(randomMiddle() * width, -5, r90),
        () => step(randomMiddle() * width, height + 5, -r90),
        () => step(-5, randomMiddle() * height, 0),
        () => step(width + 5, randomMiddle() * height, r180)
    ];

    frame();
}

window.addEventListener('resize', initCanvas);
start();
