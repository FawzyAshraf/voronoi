const canvas = document.querySelector("canvas")!;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const ctx = canvas.getContext("2d")!;

const colors = [
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "magenta",
  "cyan",
  "wheat",
];

type Point = {
  x: number;
  y: number;
};

function drawPoint(x: number, y: number) {
  const circle = new Path2D();
  circle.arc(x, y, 3, 0, 2 * Math.PI);
  ctx.fill(circle);
}

function drawLinePoint(x: number, y: number, color: string) {
  const circle = new Path2D();
  circle.arc(x, y, 3, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill(circle);
}

function randomizePoints(count: number) {
  return Array.from({ length: count }).map((_) => ({
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
  }));
}

function EucledianDistance(p1: Point, p2: Point) {
  return (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y);
}

const points = randomizePoints(8);

points.forEach((point) => {
  drawPoint(point.x, point.y);
});

for (let i = 0; i <= canvasWidth; ++i) {
  for (let j = 0; j <= canvasHeight; ++j) {
    const p = { x: i, y: j };
    if (points.some((op) => EucledianDistance(p, op) <= 25)) {
      continue;
    }
    let m = Infinity,
      mi = 0;
    points.forEach((op, idx) => {
      const d = EucledianDistance(p, op);
      if (d < m) {
        m = d;
        mi = idx;
      }
    });
    drawLinePoint(i, j, colors[mi]);
  }
}
