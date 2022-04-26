/*
MAP FEATURES:
Ocean
River
  - Runs through lengthy portion of land
Lake
  - Body of water on land
Land Mass
  - Larger than island, not surrounded by ocean
  - Can contain single peak, double peak, perhaps N-peak mountain 
  - Rivers can cut through land mass
  - Oceans can neighbor land mass, but not on all sides
Island
  - Smaller than land mass, surrounded by ocean
  - Can contain single peak, double peak, perhaps N-peak mountain 

*/

// COLORS
const colors = {
  black: [0, 0, 0, 255],
  white: [255, 255, 255, 255],
  red: [255, 0, 0, 255],
  green: [0, 255, 0, 255],
  blue: [0, 0, 255, 255],
  cream: [255, 252, 240, 255],
  linen: "#FFF2E6",
};

// CANVAS
const width = 1000;
const height = 1000;

// ISLAND DATA
const islandSizes = [
  //[],                      // Tiny?
  //[width / 20, width / 10], // Small
  //[width / 10, width / 5], // Medium
  [width / 5, width / 3], // Large
];

// RANDOMIZED
var islandNoise;
var islandSize;
var islandMinDist; // Minimum distance that island will reach out from center
var islandMaxDist; // Maximum distance that island will reach out from center

function setup() {
  // Assign Canvas Vars
  createCanvas(width, height);
  background(colors.cream);

  // Assign Randomized Vars
  // Island
  islandNoise = random(2, 7);
  islandSize = islandSizes[floor(random(0, islandSizes.length))];
  islandMinDist = islandSize[0];
  islandMaxDist = islandSize[1];
}

function draw() {
  noLoop();

  // Draw Island
  drawIsland(width / 2, width / 2);
}

function drawIsland(x, y) {
  // Assign vertex positions of island
  let islandVertices = populateNoiseLoopVertices(
    x,
    y,
    islandMinDist,
    islandMaxDist,
    islandNoise
  );

  // Draw outer line of island with standard style
  standardLineDrawShape(islandVertices, 2, colors.green); 
  
  // Assign vertex positions of mountain
  let mountainVertices = populateNoiseLoopVertices(
    x,
    y,
    islandMinDist / 2,
    islandMaxDist / 2,
    islandNoise
  );

  // Draw outer line of mountain with standard style
  standardLineDrawShape(mountainVertices, 0.5, colors.green);

  // Draw line from center of island to each vector of island's edge
  for (let vec of mountainVertices) {
    line3Test(x, y, vec.x, vec.y, 0.5, colors.green);
  }
}

function standardLineDrawShape(shapeVertices, weight, lineColor, fillColor=null) {
  strokeWeight(weight);
  stroke(lineColor);
  beginShape();
  for (let vec of shapeVertices) {
    vertex(vec.x, vec.y);
  }

  fillColor ? fill(fillColor) : noFill();
  endShape(CLOSE);
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

// TEST CONTROLLING THE FREQUENCY OF INNER LINES
  // and possibly slight mutations in line shape
function line3Test(x1, y1, x2, y2, weight, color) {
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
  save("topographic-maps.png");
}
