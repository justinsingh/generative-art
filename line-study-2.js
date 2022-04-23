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
  background(linen);
  lineColor = black;
}

function draw() {
  noLoop();

  // Standard Line
  stroke(lineColor);
  strokeWeight(10);
  line(200, 100, 800, 100);

  // Bendy Line
  lineBendy(200, 300, 800, 300, 8, lineColor);

  // Line 3
  line3(200, 500, 800, 500, 4, lineColor);
  noiseLoopVertices = populateNoiseLoopVertices(400, 750, 100, 200, 3.55);
  line3DrawShape(noiseLoopVertices, 4, lineColor);


  // Line 4
  //line4(200, 700, 800, 700, 4, lineColor);

  // Line 5
  line5(200, 900, 800, 900, 8, lineColor);
}

function lineBendy(x1, y1, x2, y2, weight, color) {
  strokeWeight(weight);
  stroke(color);

  // Begin drawing shape
  beginShape();
  for (let lerpVal = 0.0; lerpVal <= 1; lerpVal += 0.1 / (weight)) {
    // Displace y values
    let randTheta = random(TWO_PI);
    y1 += random(weight / 2) * sin(randTheta);
    y2 += random(weight / 2) * sin(randTheta);

    // Assign lerped x and y positions using the progressively increasing lerpVal
    lerpX = lerp(x1, x2, lerpVal);
    lerpY = lerp(y1, y2, lerpVal);

    // Mark vertex in shape
    vertex(lerpX, lerpY);
  }

  noFill();
  endShape();
  noLoop();
}

function line3(x1, y1, x2, y2, weight, color) {
  strokeWeight(weight);
  stroke(color);

  for (let lerpVal = 0.0; lerpVal <= 1; lerpVal += (0.019 / (weight / 2))) {
    // Displace y values
    let randTheta = random(TWO_PI);
    y1 += random(weight / 2) * sin(randTheta);
    y2 += random(weight / 2) * sin(randTheta);

    // Assign lerped x and y positions using the progressively increasing lerpVal
    lerpX = lerp(x1, x2, lerpVal);
    lerpY = lerp(y1, y2, lerpVal);

    // Draw circle
    fill(color);
    circle(lerpX, lerpY, random(0, weight*2.25));
  }
}

function line3DrawShape(shapeVertices, weight, color) {
  for (let vec of shapeVertices) {
    let x = vec.x;
    let y = vec.y;

    // Displace y value
    let randTheta = random(TWO_PI);
    //x += random(weight / 2) * cos(randTheta);
    //y += random(weight / 2) * sin(randTheta);

    // Draw circle
    strokeWeight(random(0, weight));
    stroke(color[0], color[1], color[2], random(0, 50));
    fill(color);
    circle(x, y, random(0, random(0, weight * 2.5)));
  }

  /*
  for (let lerpVal = 0.0; lerpVal <= 1; lerpVal += (0.019 / (weight / 2))) {
    // Displace y values
    let randTheta = random(TWO_PI);
    y1 += random(weight / 2) * sin(randTheta);
    y2 += random(weight / 2) * sin(randTheta);

    // Assign lerped x and y positions using the progressively increasing lerpVal
    lerpX = lerp(x1, x2, lerpVal);
    lerpY = lerp(y1, y2, lerpVal);

    // Draw circle
    fill(color);
    circle(lerpX, lerpY, random(0, weight*2.25));
  }
  */
}

function line4(x1, y1, x2, y2, weight, color) {
  strokeWeight(weight);
  stroke(color);

  for (let lerpVal = 0.0; lerpVal <= 1; lerpVal += 0.01 / (weight / 2)) {
    // Displace y values
    let randTheta = random(TWO_PI);
    y1 += random(weight / 3) * sin(randTheta);
    y2 += random(weight / 3) * sin(randTheta);

    // Assign lerped x and y positions using the progressively increasing lerpVal
    lerpX = lerp(x1, x2, lerpVal);
    lerpY = lerp(y1, y2, lerpVal);

    // Draw circle
    fill(color);
    //noFill();
    let size = random(0, weight);
    ellipse(lerpX, lerpY, size, size);
  }
}

function line5(x1, y1, x2, y2, weight, color) {}

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

function populateNoiseLoopVertices(xCenter, yCenter, minSize, maxSize, noiseMax) {
  let noiseLoopPositions = [];

  for (let a = 0; a < TWO_PI; a += 0.01) {
    let xOff = map(cos(a), -1, 1, 0, noiseMax);
    let yOff = map(sin(a), -1, 1, 0, noiseMax);

    let r = map(noise(xOff, yOff), 0, 1, minSize, maxSize);
    let x = r * cos(a) + xCenter;
    let y = r * sin(a) + yCenter;

    // Add vertex position to array
    noiseLoopPositions.push(createVector(x, y));
  }

  return noiseLoopPositions;
}

function doubleClicked() {
  save("LineStudy1.png");
}