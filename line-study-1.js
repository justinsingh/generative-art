// COLORS
const teal = [180, 238, 243];
const black = [0, 0, 0];
const white = [255, 255, 255];
const cream = [255, 252, 240];
const orange = [127, 64, 0];
const red = [255, 0, 0];
const blue = [0, 0, 255, 150];
const linen = "#FFF2E6";
const blackShadows = "#C5B9B9";
const timberwolf = "#E6DCDC";

var lineColor;

function setup() {
  createCanvas(1000, 1000);
  background(black);
  lineColor = white;
}

function draw() {
  noLoop();

  // Standard Line
  stroke(lineColor);
  strokeWeight(10);
  line(200, 100, 800, 100);

  // Line of filled circles
  lineFilledCircle(200, 300, 800, 300, 8, lineColor, 20);

  // Line of open circles
  lineOpenCircles(200, 500, 800, 500, 4, lineColor, 30);

  // Line of open circles with random size and placement
  lineRandOpenCircles(200, 700, 800, 700, 2, lineColor, 75);

  // Line of open ellipses with random size and placement;
  lineRandNoiseLoops(200, 900, 800, 900, 2, lineColor, 75);
}

function lineFilledCircle(x1, y1, x2, y2, weight, color, size) {
  strokeWeight(weight);
  stroke(color);

  for (let lerpVal = 0.0; lerpVal <= 1; lerpVal += 0.1) {
    // Assign spacing of circles
    lerpX = lerp(x1, x2, lerpVal);
    lerpY = lerp(y1, y2, lerpVal);

    // Draw circle
    fill(color);
    circle(lerpX, lerpY, size);
  }
}

function lineOpenCircles(x1, y1, x2, y2, weight, color, size) {
  noFill();
  strokeWeight(weight);
  stroke(color);

  for (let lerpVal = 0.0; lerpVal <= 1; lerpVal += 0.1) {
    // Assign spacing of circles
    lerpX = lerp(x1, x2, lerpVal);
    lerpY = lerp(y1, y2, lerpVal);

    // Draw circle
    noFill();
    circle(lerpX, lerpY, size);
  }
}

function lineRandOpenCircles(x1, y1, x2, y2, weight, color, maxSize) {
  noFill();
  strokeWeight(weight);
  stroke(color);

  for (let i = 0; i < maxSize / 2; i++) {
    // Add randomized displacement
    let randTheta = random(TWO_PI);
    //x1 = x1 + random(maxSize / 12) * cos(randTheta);
    y1 = y1 + random(maxSize / 12) * sin(randTheta);
    //x2 = x2 + random(maxSize / 12) * cos(randTheta);
    y2 = y2 + random(maxSize / 12) * sin(randTheta);

    // Randomize Spacing
    let randLerpVal = random(1);
    let lerpX = lerp(x1, x2, randLerpVal);
    let lerpY = lerp(y1, y2, randLerpVal);

    // Randomize Size
    let randSize = random(0.75, maxSize);

    // Create Circle
    noFill();
    circle(lerpX, lerpY, randSize);
  }
}

function lineRandNoiseLoops(x1, y1, x2, y2, weight, color, maxSize) {
  noFill();
  strokeWeight(weight);
  stroke(color);

  for (let i = 0; i < maxSize / 3; i++) {
    // Add randomized displacement
    let randTheta = random(TWO_PI);
    //x1 = x1 + random(maxSize / 12) * cos(randTheta);
    y1 = y1 + random(maxSize / 12) * sin(randTheta);
    //x2 = x2 + random(maxSize / 12) * cos(randTheta);
    y2 = y2 + random(maxSize / 12) * sin(randTheta);

    // Randomize Spacing
    let randLerpVal = random(1);
    let lerpX = lerp(x1, x2, randLerpVal);
    let lerpY = lerp(y1, y2, randLerpVal);

    // Randomize Size
    let randSize = random(0.75, maxSize);

    // Create Noise Loop
    drawNoiseLoop(lerpX, lerpY, 0.75, randSize, weight, 1.7);
  }
}

function drawNoiseLoop(xCenter, yCenter, minSize, maxSize, weight, noiseMax) {
  noiseSeed(random(0, 100));

  strokeWeight(weight);
  beginShape();
  for (let a = 0; a < TWO_PI; a += 0.01) {
    let xOff = map(cos(a), -1, 1, 0, noiseMax);
    let yOff = map(sin(a), -1, 1, 0, noiseMax);

    let r = map(noise(xOff, yOff), 0, 1, minSize, maxSize);
    let x = r * cos(a) + xCenter;
    let y = r * sin(a) + yCenter;
    vertex(x, y);
  }

  endShape(CLOSE);
  noLoop();
}

function doubleClicked() {
  save("LineStudy1.png");
}