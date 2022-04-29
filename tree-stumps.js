/*
EXPERIMENT WITH:
- background color
- texture
  - poisson disk sample
    - green, tan, 
- tree colors
  - different browns
*/
// CANVAS

// COLORS
const colors = {
  black: [0, 0, 0, 255],
  white: [255, 255, 255, 255],
  red: [255, 0, 0, 255],
  green: [0, 255, 0, 255],
  blue: [0, 0, 255, 255],
  cream: [255, 252, 240, 255],
  treeStumps: [
    [142, 62, 24, 255], // russet
    [192, 114, 78, 255], // liver chestnut
    //['brown']
  ],
  textures: {
    mossy: [
      [67, 84, 20, 150], // mossy green
      [84, 68, 20, 100], // ugly browny yellow
      [84, 46, 20, 100], // browny red
    ],
  },
};
var lineColor;

// TREE STUMP PROPERTIES
var minStumpSize = 75;
var maxStumpSize = 200;

// TREE STUMP POISSON DISK SAMPLING VARIABLES
// minimum distance between points
const r = maxStumpSize * 1.9;
// num of times before we 'quit' trying
const k = 9999;

// grid for storing samples (points). entry of -1 indicates no sample.
var w = r / Math.sqrt(4); // size of cell
var grid = [];
var active = [];
var cols, rows;

// TEXTURE POISSON DISK SAMPLING VARIABLES
// minimum distance between points
const r2 = 5;
// num of times before we 'quit' trying
const k2 = 30;

// grid for storing samples (points). entry of -1 indicates no sample.
var w2 = r2 / Math.sqrt(6); // size of cell
var grid2 = [];
var active2 = [];
var cols2, rows2;

function setup() {
  createCanvas(1000, 1000);
  background(colors.cream);
  //lineColor = "brown";

  // TREE STUMP POISSON DISK SAMPLING SETUP
  cols = floor(width / w);
  rows = floor(height / w);

  for (let i = 0; i < cols * rows; i++) {
    grid[i] = undefined;
  }

  var x = random(width - maxStumpSize * 2); // random x point in canvas
  var y = random(height - maxStumpSize * 2); // random y point in canvas
  var i = floor(x / w); // col position in grid
  var j = floor(y / w); // row position in grid
  var pos = createVector(x, y);
  grid[i + j * cols] = pos; // placing random point in grid
  active.push(pos);

  // TEXTURE POISSON DISK SAMPLING SETUP
  cols2 = floor(width / w2);
  rows2 = floor(height / w2);

  for (let i = 0; i < cols2 * rows2; i++) {
    grid2[i] = undefined;
  }

  var x2 = random(width); // random x point in canvas
  var y2 = random(height); // random y point in canvas
  var i2 = floor(x2 / w2); // col position in grid
  var j2 = floor(y2 / w2); // row position in grid
  var pos2 = createVector(x2, y2);
  grid[i2 + j2 * cols2] = pos2; // placing random point in grid
  active2.push(pos2);
}

function draw() {
  noLoop();

  drawTexture();
  drawAllStumps();
  //drawStump(width / 2, height / 2);
}

function drawTexture() {
  // TEXTURE POISSON DISK SAMPLING
  while (active2.length > 0) {
    let randIndex = floor(random(active2.length)); // get random index
    let pos = active2[randIndex];
    let found = false;

    // Generate up to k points
    for (let n = 0; n < k2; n++) {
      // Get random sample point within bounds of r and 2r
      var sample = p5.Vector.random2D();
      var m = random(r2, 2 * r2);
      sample.setMag(m); // Let's look more into magnitude
      sample.add(pos);

      // Get grid positions
      var col = floor(sample.x / w2);
      var row = floor(sample.y / w2);

      // If point exists here
      if (
        col > -1 &&
        row > -1 &&
        col < cols2 &&
        row < rows2 &&
        !grid2[col + row * cols2]
      ) {
        // Check that point position is within valid distance from neighbors
        var ok = true;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            var index = col + i + (row + j) * cols2;
            var neighbor = grid2[index];
            if (neighbor) {
              var d = dist(sample.x, sample.y, neighbor.x, neighbor.y);

              // If distance is too small
              if (d < r2) {
                ok = false;
              }
            }
          }
        }

        // If point is within valid distance from neighbors
        if (ok) {
          found = true;
          grid2[col + row * cols2] = sample; // Put point in grid
          active2.push(sample); // Add to active list so we can use point to use as neighbor check later

          // Should we break?
          break;
        }
      }
    }
    // If we never found points around randIndex that are okay, take it out of list
    if (!found) {
      active2.splice(randIndex, 1);
    }
  }

  // Draw Texture Poisson Disk Samples
  for (let i = 0; i < grid2.length; i++) {
    if (grid2[i]) {
      strokeWeight(3);
      let randColorIndex = floor(random(0, colors.textures.mossy.length));
      stroke(colors.textures.mossy[randColorIndex]);
      point(grid2[i].x, grid2[i].y);
    }
  }
}

function drawAllStumps() {
  // TREE STUMP POISSON DISK SAMPLING
  while (active.length > 0) {
    let randIndex = floor(random(active.length)); // get random index
    let pos = active[randIndex];
    let found = false;

    // Generate up to k points
    for (let n = 0; n < k; n++) {
      // Get random sample point within bounds of r and 2r
      var sample = p5.Vector.random2D();
      var m = random(r, 2 * r);
      sample.setMag(m); // Let's look more into magnitude
      sample.add(pos);

      // Get grid positions
      var col = floor(sample.x / w);
      var row = floor(sample.y / w);

      // If point exists here
      if (
        col > -1 &&
        row > -1 &&
        col < cols &&
        row < rows &&
        !grid[col + row * cols]
      ) {
        // Check that point position is within valid distance from neighbors
        var ok = true;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            var index = col + i + (row + j) * cols;
            var neighbor = grid[index];
            if (neighbor) {
              var d = dist(sample.x, sample.y, neighbor.x, neighbor.y);

              // If distance is too small
              if (d < r * 100) {
                ok = false;
              }
            }
          }
        }

        // If point is within valid distance from neighbors
        if (ok) {
          found = true;
          grid[col + row * cols] = sample; // Put point in grid
          active.push(sample); // Add to active list so we can use point to use as neighbor check later

          // Should we break?
          break;
        }
      }
    }
    // If we never found points around randIndex that are okay, take it out of list
    if (!found) {
      active.splice(randIndex, 1);
    }
  }

  // Draw Tree Stump Poisson Disk Samples
  let numTrees = 0;
  for (let i = 0; i < grid.length; i++) {
    if (grid[i]) {
      numTrees++;
      drawStump(grid[i].x, grid[i].y);
    }
  }
  console.log(numTrees);
}

function drawStump(x, y) {
  // Generate vertices of noise loop
  noiseLoopVertices = populateNoiseLoopVertices(
    x,
    y,
    minStumpSize,
    maxStumpSize,
    1.55
  );

  // Assign random stump color
  let stumpColor =
    colors.treeStumps[floor(random(0, colors.treeStumps.length))];

  // Fill stump shape with cream color
  fillShape(noiseLoopVertices, colors.cream);

  // Draw line from center of noise loop to each vector of noise loop's edge
  for (let vec of noiseLoopVertices) {
    line3V2(x, y, vec.x, vec.y, 1, stumpColor);
  }

  // Draw noise loop with line3 styling
  //line3DrawShape(noiseLoopVertices, 2, lineColor);
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

function line3V2(x1, y1, x2, y2, weight, color) {
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

function fillShape(shapeVertices, color) {
  stroke(color);
  beginShape();
  for (let vec of shapeVertices) {
    vertex(vec.x, vec.y);
  }
  fill(color);
  endShape();
  noLoop();
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
  save("TreeStumps.png");
}
