/*
VISION:
Rectangle strip with abstract line.
Possible after effect with grainy look? 

RANDOMIZED VARIABLES:
1) Solid or Gradient Rectangle Strip 
  (2 possible)
  - But maybe they should all be gradient?

2) Color Of Rectangle Strip 
  (? possible)

3) Orientation of Rectangle Strip
  (2 possible)

4) Length of Rectangle Strip
  (? possible)

5) Solid or Gradient Line
  (2 possible)

6) Color of Line
  (? possible)

7) Orientation of Line
  (2 possible, but might just be opposite of rec. strip orientation)

8) Length of Line
  (? possible)

9) Background Color
  (? possible)

THINGS TO TRY:
- color variations
- modify width of rectangle strips
- warp/transform rectangle strips
- random vs noise (perlin)
- rectangle over lines, or lines over rectangles?
- modify number of lines
*/
function setup() {
  createCanvas(1210, 1580);
}

function draw() {
  // Set Constants
  // Colors
  const teal = color(180, 238, 243);
  const white = color(255);
  const black = color(20);
  const cream = color(255, 252, 240);
  const orange = color("orange");
  const red = color("red");
  const blue = color("blue");

  // Positions
  const rectXStart = 500;
  const rectYStart = 1180;
  const rectXEnd = 1145;

  const lineXStart = 1280;
  const lineYStart = 1580;
  const lineXEnd = 600;
  const lineYEnd = 790;

  const line2XStart = -40;
  const line2YStart = 70;

  // Shape attributes
  const rectWidth = 5.25;
  const rectHeight = 250;
  const rectColor = red;

  const lineStrokeWidth = 1.2;
  const lineColor = black;

  // Generate Art
  // Set Background
  background(cream);

  // Set random seed
  randomSeed(10);

  // Place Bottom Right Lines
  for (let i = 0; i < 50; i++) {
    // Set stroke properties
    stroke(lineColor);
    strokeWeight(lineStrokeWidth);
    noFill();

    let rand = random(-50, 50);

    // Use bezier() function to create curve
    bezier(
      lineXStart + random(25),
      lineYStart + random(25),
      780 + random(-250, -200),
      730 + random(350),
      735 + random(300, 500),
      675 + random(-600),
      lineXEnd + random(25),
      lineYEnd + random(25)
    );
  }

  // Place Top Left Lines
  for (let i = 0; i < 50; i++) {
    // Set stroke properties
    stroke(lineColor);
    strokeWeight(lineStrokeWidth);
    noFill();

    // Use bezier() function to create curve
    bezier(
      line2XStart + random(25),
      line2YStart + random(25),
      290 + random(200),
      1500 + random(-250),
      500 + random(-300),
      800 + random(200),
      lineXEnd + random(10, 20),
      lineYEnd + random(25)
    );
  } 

  // Place Strip of rectangles
  let xStart = rectXStart;
  while (xStart <= rectXEnd) {
    // Render rectangle
    fill(rectColor);
    noStroke();
    rect(xStart, rectYStart, rectWidth, rectHeight, 20);

    // Increment xStart by desired white space amount
    xStart += rectWidth * 2;
  }




}