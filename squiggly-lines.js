// Define endpoint variables
let length;
let segments;
let x;
let y;


function setup() {
  createCanvas(512, 512);

  // Constrain length of line to 3/4 canvas size
  length = width * 0.75;

  // Assign num of segments
  segments = 6;

  // Assign start point
  x = length / segments;
  y = height * 0.5;
}

function draw() {
  // Colors
  const teal = color(180, 238, 243);
  const white = color(255);
  const black = color(20);
  const cream = color(255, 252, 240);
  const orange = color(127, 64, 0);
  const red = color(255, 0, 0, 150);
  const blue = color(0, 0, 255, 150);

  background(cream);

  // Draw line for each segment
  for (let i = 0; i < segments; i++) {

    // next x point
    let nextX = x + length / segments;

    // Draw line from current point to next point
    stroke(orange);
    strokeWeight(15);
    line(x, y, nextX, y);

    // Draw the current point
    push();
    strokeWeight(25);
    stroke(teal);
    point(x, y);
    pop();

    // Update x position
    x = nextX;
  }

  // Draw the last point
  strokeWeight(25);
  stroke(red);
  point(x, y);

  // Draw the line once and stop
  noLoop();
}