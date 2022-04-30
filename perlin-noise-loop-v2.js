/*
EXPERIMENT WITH:
*/
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
  lineColor = "purple";
}

function draw() {
  noLoop();

  // Generate vertices of noise loop
  xCenter = 500;
  yCenter = 500;
  noiseLoopVertices = populateNoiseLoopVertices(
    xCenter,
    yCenter,
    100,
    200,
    1.55
  );

  // Draw line from center of noise loop to each vector of noise loop's edge
  for (let vec of noiseLoopVertices) {
    line3(xCenter, yCenter, vec.x, vec.y, 1, lineColor);
  }

  // Draw noise loop with line3 styling
  line3DrawShape(noiseLoopVertices, 2, lineColor);
}

function line3(x1, y1, x2, y2, weight, color) {
  strokeWeight(weight);
  stroke(color);

  for (let lerpVal = 0.0; lerpVal <= 1; lerpVal += 0.019 / (weight / 2)) {
    // Displace coords
    let randTheta = random(TWO_PI);
    //x1 += random(weight / 2) * cos(randTheta);
    //x2 += random(weight / 2) * cos(randTheta);
    //y1 += random(weight / 2) * sin(randTheta);
    //y2 += random(weight / 2) * sin(randTheta);

    // Assign lerped x and y positions using the progressively increasing lerpVal
    lerpX = lerp(x1, x2, lerpVal);
    lerpY = lerp(y1, y2, lerpVal);

    // Draw circle
    fill(color);
    circle(lerpX, lerpY, random(0, weight * 2.25));
  }
}

function line3DrawShape(shapeVertices, weight, color) {
  for (let vec of shapeVertices) {
    let x = vec.x;
    let y = vec.y;

    // Displace y value
    let randTheta = random(TWO_PI);
    x += random(weight / 2) * cos(randTheta);
    y += random(weight / 2) * sin(randTheta);

    // Draw circle
    strokeWeight(random(0, weight));
    // Play around with randomizing opacity, and which to apply to (stroke || fill)
    let randOpacity = random(0, 255);
    stroke(color[0], color[1], color[2], randOpacity);
    fill(color[0], color[1], color[2], randOpacity);

    // Play around with randomizing size
    let randSize = random(0, random(0, weight * 2.5));
    circle(x, y, randSize);
    //ellipse(x, y, randSize, randSize);
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

function populateNoiseLoopVertices(
  xCenter,
  yCenter,
  minSize,
  maxSize,
  noiseMax
) {
  noiseSeed(random(0, 99999999));
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
  save("PerlinNoiseLoopsV2.png");
}
