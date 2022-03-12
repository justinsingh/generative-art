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

TO-DO:
- separate into functions
- add randomization
- perlin noise after effect
- add randomization to x-axis
- do we want overlapping?
  - if not, split y-axis range

THINGS TO TRY:
- color variations
- modify width of rectangle strips
- warp/transform rectangle strips
- random vs noise (perlin)
- rectangle over lines, or lines over rectangles?
- modify number of lines
- change orientation of rectangle
- change rectangle alpha channel
- more shapes
*/
let randRectYStart;
let randRect2YStart;

let randLineYStart;
let randLine2YStart;
let randLineXEnd;
let randLineYEnd;

let randLineControlPoints;
let randLine2ControlPoints;

function setup() {
  createCanvas(1210, 1580);
  
  // Assign rectangle random values
  randRectYStart = random(50, 1200);
  randRect2YStart = random(50, 1200);
  
  // Assign line random values
  randLineYStart = random(150, 1500);
  randLine2YStart = random(150, 1500);

  randLineXEnd = random(200, 1010);
  randLineYEnd = random(20, 1550);

  randLineControlPoints = [
    random(-500, 500), // X1
    random(-500, 500), // Y1
    random(-500, 500), // X2
    random(-500, 500)  // Y2
  ];

  randLine2ControlPoints = [
    random(-500, 500), // X1
    random(-500, 500), // Y1
    random(-500, 500), // X2
    random(-500, 500)  // Y2
  ];
}

function draw() {
  // Set Constants
  // Colors
  const teal = color(180, 238, 243);
  const white = color(255);
  const black = color(20);
  const cream = color(255, 252, 240);
  const orange = color(127, 64, 0);
  const red = color(255, 0, 0, 150);
  const blue = color(0, 0, 255, 150);

  // Positions
  // Bottom rect
  const rectXStart = 600;
  const rectYStart = randRectYStart;
  const rectXEnd = 1145;

  // Top Rect
  const rect2XStart = 50;
  const rect2YStart = randRect2YStart;
  const rect2XEnd = 610;

  // Lines
  const linePoints = [
    1280,
    randLineYStart,
    randLineControlPoints[0],
    randLineControlPoints[1],
    randLineControlPoints[2],
    randLineControlPoints[3],
    randLineXEnd,
    randLineYEnd
  ];

  const line2Points = [
    -40,
    randLine2YStart,
    randLine2ControlPoints[0],
    randLine2ControlPoints[0],
    randLine2ControlPoints[0],
    randLine2ControlPoints[0],
    randLineXEnd,
    randLineYEnd
  ];

  const lineXEnd = randLineXEnd;
  const lineYEnd = randLineYEnd;

  const lineXStart = 1280;
  const lineYStart = randLineYStart;
 
  const line2XStart = -40;
  const line2YStart = randLine2YStart;

  // Shape attributes
  const rectWidth = 3.25;
  const rectHeight = 200;
  const rectColor = red;
  const rect2Color = blue;

  const lineStrokeWidth = 8.2;
  const line1Color = black;
  const line2Color = black;

  // Set random seed
  randomSeed(25);

  // Generate Art
  // Set Background
  background(black);

  // Place Bottom Right Lines
  // rand range
  randRange = [-100, 100];
  for (let i = 0; i < 125; i++) {
    // Set stroke properties
    stroke(white);
    strokeWeight(lineStrokeWidth);
    noFill();

    // Use bezier() function to create curve
    bezier(
      lineXStart + random(-2500, 2500),
      lineYStart + random(-2500, 2500),
      500 + random(-7000, 7000),
      500 + random(-6000, 6000), 
      500 + random(-6000, 6000),
      500 + random(-7000, 7000),
      line2XStart + random(-2500, 2500),
      line2YStart + random(-2500, 2500)
    );
    /*
    bezier(
      lineXStart + random(25),
      lineYStart + random(25, 200),
      random(500, 800) + random(-250, -200),
      random(500, 800) + random(350),
      random(500, 800) + random(300, 500),
      random(500, 800) + random(-600),
      lineXEnd + random(-25, 100),
      lineYEnd + random(-25, 100)
    );
    */
   /*
   bezier(
     linePoints[0] + noise(25),
     linePoints[1] + random(25),
     linePoints[2] + random(...randRange),
     linePoints[3] + random(...randRange),
     linePoints[4] + random(...randRange),
     linePoints[5] + random(...randRange),
     linePoints[6] + random(25),
     linePoints[7] + random(25)
   );
   */
  }
  
  for (let i = 0; i < 125; i++) {
    // Set stroke properties
    stroke(white);
    strokeWeight(lineStrokeWidth);
    noFill();

    // Use bezier() function to create curve
    bezier(
      lineXStart + random(-250, 250),
      lineYStart + random(-250, 250),
      1000 + random(-700, 700),
      1000 + random(-600, 600),
      1000 + random(-600, 600),
      1000 + random(-700, 700),
      line2XStart + random(-250, 250),
      line2YStart + random(-250, 250)
    );
  }

  for (let i = 0; i < 125; i++) {
    // Set stroke properties
    stroke(white);
    strokeWeight(lineStrokeWidth);
    noFill();

    // Use bezier() function to create curve
    bezier(
      lineXStart + random(-25, 25),
      lineYStart + random(-25, 25),
      1000 + random(-70, 70),
      1000 + random(-60, 60), 
      1000 + random(-60, 60),
      1000 + random(-70, 70),
      line2XStart + random(-25, 25),
      line2YStart + random(-25, 25)
    );
  }

  // Place Top Left Lines
  for (let i = 0; i < 20; i++) {
    // Set stroke properties
    stroke(line2Color);
    strokeWeight(lineStrokeWidth);
    noFill();

    // Use bezier() function to create curve
    /*
    bezier(
      line2XStart + random(25),
      line2YStart + random(25),
      random(-500, 500),
      random(-500, 500),
      random(-500, 500),
      random(-500, 500),
      lineXEnd + random(-25, 100),
      lineYEnd + random(-25, 100)
    );
    */
   /*
   bezier(
     line2Points[0] + random(25),
     line2Points[1] + random(25), 
      random(...randRange),
      random(...randRange),
      random(...randRange),
      random(...randRange),
     linePoints[0] + random(...randRange),
     linePoints[1] + random(...randRange)
     //line2Points[6] + random(25),
     //line2Points[7] + random(25)
   );
   */
  }

  /*
  // Place bottom left rectangles
  let xStart = rectXStart;
  while (xStart <= rectXEnd) {
    // Render rectangle
    fill(rectColor);
    noStroke();
    rect(xStart, rectYStart, rectWidth, rectHeight, 20);

    // Increment xStart by desired white space amount
    xStart += rectWidth * 2;
  }

  // Place top left rectangles
  xStart = rect2XStart;
  while (xStart <= rect2XEnd) {
    // Render rectangle
    fill(rect2Color);
    noStroke();
    rect(xStart, rect2YStart, rectWidth, rectHeight, 20);

    // Increment xStart by desired white space amount
    xStart += rectWidth * 2;

  }
  */
}