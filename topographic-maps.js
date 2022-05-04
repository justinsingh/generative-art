/*
STYLE IDEAS:
  - people initially liked line3, so stick with that aesthetic 

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

ALGORITHM IDEAS:
Create a mountain (x, y, steepLevel(?))
  randCounter
  randMinSize, randMaxSize
  randNoise
  while randCounter > 0
    assign vertices of perlin noise loop at randx, randY with randMinSize, randMaxSize, randNoise
    if vertices collide with any land boundaries
      break
    draw line through vertices
    reassign randMinSize to larger randMaxSize
    reassign randMaxSize to larger randMinSize 

  return vertex array of mountain's largest edge (?) to use in further collision detection
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
  standardLineDrawShape(islandVertices, 2, colors.black); 
  
  // Draw mountain
  drawMountain(x-100, y+50);
}

function drawMountain(x, y) {
  let randCounter = 4 //floor(random(1, 5));
  let randMinSize = islandMinDist / 30;
  let randMaxSize = islandMaxDist / 25; 
  let randNoise = random(6, 7);
  let contourLineVertices = [];

  // Create random amount of increasingly larger contour lines (peak -> outwards)
  while (randCounter > 0) {
    // Assign vertices of contour line
    contourLineVertices = populateNoiseLoopVertices(
      x,
      y,
      randMinSize,
      randMaxSize,
      randNoise
    );
    
    // TODO: Check if contourLineVertices collide with any land features
    
    // Draw contour line
    standardLineDrawShape(contourLineVertices, 2, colors.black);

    // Increase contour line limits
    //randMinSize = randMaxSize + random(5, 15);
    //randMaxSize = randMinSize + random(5, 20);
    randMinSize = randMaxSize * random(1.1, 1.3);
    randMaxSize = randMinSize * random(1.1, 1.8);

    // Increase randomized noise at random interval
    randNoise = random(6, 7);
    // Decrement randCounter
    randCounter--;
  }

  // Return vertex positions of mountain's outermost contour line
  return contourLineVertices;
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
