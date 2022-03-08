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
*/
function setup() {
  createCanvas(1280, 1080);
}

function draw() {
  // Set Constants
  // Colors
  const teal = color(180, 238, 243);
  const white = color(255);
  const black = color(20);
  
  // Positions
  const rectXStart = 150;
  const rectYStart = 790;
  const rectXEnd = 975;
  
  // Shape attributes
  const rectWidth = 3.25;
  const rectHeight = 250;
        
  // Generate Art
  // Set Background
  background(black);

  // Place Strip of rectangles
  let xStart = rectXStart;
  while (xStart <= rectXEnd) {
    // Render rectangle
    fill(teal);
    noStroke();
    rect(xStart, rectYStart, rectWidth, rectHeight, 20);
    
    // Increment xStart by desired white space amount
    xStart += rectWidth * 2;
  }
}