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
  const rectXStart = 175;
  const rectYStart = 750;
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