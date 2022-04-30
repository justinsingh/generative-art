/*
EXPERIMENT WITH:
- background color
- texture
  - poisson disk sample
    - green, tan, 
- tree colors
  - different browns
- distribution of the stumps
  - they may overlap because the poisson algo may only check for neighbors 
    within the current grid
  - prevent from going out of the canvas bounds
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
  schemes: [
    // Standard Brown Tree Stumps
    {
      stump: [
        [142, 62, 24, 255], // russet
        [192, 114, 78, 255], // liver chestnut
      ],
      texture: [
        [67, 84, 20, 150], // mossy green
        [84, 68, 20, 100], // ugly browny yellow
        [84, 46, 20, 100], // browny red
      ],
    },
    {
      stump: [
        [213, 66, 181, 255], // Fuchsia Crayola
        [67, 182, 214, 255], // 43B6D6 (complementary blue)
      ],
      texture: [
        //[67, 214, 99, 125], // 43D663
        [214, 172, 67, 125], // D6AC43
        [67, 108, 214, 125], // 436CD6     
        //[145, 66, 214, 125], // 9142D6
        //[69, 66, 214, 125], // 4542D6
      ]
    }
  ],
};
var lineColor;

// RANDOMIZATION VARIABLES
var stumpColorScheme;
var textureColorScheme;

// TREE STUMP PROPERTIES
var minStumpSize = 50;
var maxStumpSize = 200;
var minStumpNoise = 1.35;
var maxStumpNoise = 4.00;

// TREE STUMP POISSON DISK SAMPLING VARIABLES
// minimum distance between points
const r = maxStumpSize * 2.0;
// num of times before we 'quit' trying
const k = 999;

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

  // INITIALIZE RANDOMIZED VARIABLES
  // Pick a random color scheme (Object with two properties)
  let randColorScheme = colors.schemes[1]//colors.schemes[floor(random(0, colors.schemes.length))];
  stumpColorScheme = randColorScheme.stump;
  textureColorScheme = randColorScheme.texture;

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
      let randIndex = floor(random(0, textureColorScheme.length));
      stroke(textureColorScheme[randIndex]);
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
    random(minStumpNoise, maxStumpNoise),
  );

  // Assign random stump color
  let randIndex = floor(random(0, stumpColorScheme.length));
  let stumpColor = stumpColorScheme[randIndex];
    
  // Fill stump shape with cream color
  fillShape(noiseLoopVertices, colors.cream);

  // Draw line from center of noise loop to each vector of noise loop's edge
  let lerpInterval = random(0.019, 0.031);
  for (let vec of noiseLoopVertices) {
    line3V2(x, y, vec.x, vec.y, 1, stumpColor, lerpInterval);
  }

  // Draw noise loop with line3 styling
  //line3DrawShape(noiseLoopVertices, 2, stumpColor);
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

function line3V2(x1, y1, x2, y2, weight, color, lerpInterval) {
  strokeWeight(weight);
  stroke(color);

  for (let lerpVal = 0.0; lerpVal <= 1; lerpVal += lerpInterval / (weight / 2)) {
    // Displace coords
    let randTheta = random(TWO_PI);
    x1 += random(weight / 9) * cos(randTheta);
    x2 += random(weight / 9) * cos(randTheta);
    y1 += random(weight / 9) * sin(randTheta);
    y2 += random(weight / 9) * sin(randTheta);

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
    let randOpacity = random(155, 255);
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
