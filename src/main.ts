const canvas = document.querySelector("canvas")!;
const pointsInput = document.querySelector("#points-range") as HTMLInputElement;
const pointsValue = document.querySelector("#points-value")!;
const regenerateButton = document.querySelector(
  "#regenerate",
) as HTMLButtonElement;

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const ctx = canvas.getContext("2d")!;
let pointsNumber = 8;

pointsInput.addEventListener("change", (e) => {
  const newValue = (e.target as HTMLInputElement).value;
  pointsValue.innerHTML = newValue;
  pointsNumber = Number(newValue);
});

regenerateButton?.addEventListener("click", () => {
  generate();
});

const colors = [
  "#1f77b4",
  "#ff7f0e",
  "#2ca02c",
  "#d62728",
  "#9467bd",
  "#8c564b",
  "#e377c2",
  "#7f7f7f",
  "#bcbd22",
  "#17becf",
  "#aec7e8",
  "#ffbb78",
  "#98df8a",
  "#ff9896",
  "#c5b0d5",
  "#c49c94",
];

type Point = {
  x: number;
  y: number;
};

function drawPoint(x: number, y: number) {
  const circle = new Path2D();
  circle.arc(x, y, 3, 0, 2 * Math.PI);
  ctx.fillStyle = "black";
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

function generate() {
  const points = randomizePoints(pointsNumber);
  for (let i = 0; i <= canvasWidth; ++i) {
    for (let j = 0; j <= canvasHeight; ++j) {
      const p = { x: i, y: j };
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

  points.forEach((point) => {
    drawPoint(point.x, point.y);
  });
}

generate();
