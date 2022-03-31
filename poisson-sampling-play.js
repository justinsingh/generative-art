// POISSON DISK SAMPLING PORTION CREATED USING DANIEL SHIFFMAN VIDEO: https://youtu.be/flQgnCUxHlw

/*
TO-DO / EXPERIMENT WITH:
- reduce overlapping
- randomize colors per circle
- create small offsets to each dot position so it's not a neat circle
- split canvas into 2+ grids. 
- find out how to work within bounds of an abstract shape
  - we can make a green hill section and blue sky section
- Make circles draw more concentrated in the center and fade out
- Randomize opacity of each circle
- Stop first layer circles from drawing in the center
*/

// COLORS
const teal = [180, 238, 243];
const white = [0, 0, 0];
const black = [255, 255, 255];
const cream = [255, 252, 240];
const orange = [127, 64, 0];
const red = [255, 0, 0];
const blue = [0, 0, 255, 150];

const splitComplementaryColors = [
  [[21, 107, 107], [106, 21, 50], [106, 50, 21]]
];
const triadicColors = [
  [[176, 217, 140], [140, 176, 217], [217, 141, 176]]
];


// minimum distance between points
const r = 10;
// num of times before we 'quit' trying
const k = 30;

// grid for storing samples (points). entry of -1 indicates no sample.
var w = r / Math.sqrt(2); // size of cell
var grid = [];
var active = [];
var cols, rows;
const circlePositions = [];

function setup() {
  createCanvas(1210, 1580);

  // STEP 0
  cols = floor(width / w);
  rows = floor(height / w);

  for (let i = 0; i < cols * rows; i++) {
    grid[i] = undefined;
  }

  // STEP 1
  var x = random(width); // random x point in canvas
  var y = random(height); // random y point in canvas
  var i = floor(x / w); // col position in grid
  var j = floor(y / w); // row position in grid
  var pos = createVector(x, y);
  grid[i + j * cols] = pos; // placing random point in grid
  active.push(pos);
}

function draw() {
  // CANVAS MODIFICATIONS
  background(cream);
  //background(70);
  noLoop();

  // SELECT COLOR SCHEME
  colorScheme = triadicColors[random(0, splitComplementaryColors.length - 1)];

  backgroundDiscColor = colorScheme[0];
  backgroundDiscOpacity = 255;

  circleColors = [colorScheme[1], colorScheme[2]];

  // POISSON DISK SAMPLING
  while (active.length > 0) {
    let randIndex = floor(random(active.length)); // get random index
    let pos = active[randIndex];
    let found = false;

    // Generate up to k points
    for (let n = 0; n < k; n++) {
      // Get random sample point within bounds of r and 2r
      var sample = p5.Vector.random2D();
      var m = random(2, 2 * r);
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
              var d = dist(sample, neighbor);

              // If distance is too small
              if (d < r) {
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

  // Draw Poisson Disk Samples
  for (let i = 0; i < grid.length; i++) {
    if (grid[i]) {
      stroke(...backgroundDiscColor, backgroundDiscOpacity);
      strokeWeight(3);
      point(grid[i].x, grid[i].y);
    }
  }

  // Draw First Layer Circles
  for (let i = 0; i < 1500; i++) {
    let colorArr = circleColors[i % 2 ? 0 : 1];
    let opacity = 255;
    let strokeSize = 3;
    let noiseMax = 5.55;
    let radiusLowerBound = random(25, 50);
    let radiusUpperBound = random(51, 100);
    let xTranslation = random(radiusUpperBound, width - radiusUpperBound);
    let yTranslation = random(radiusUpperBound, height - radiusUpperBound);

    drawNoisyCircle(
      colorArr,
      opacity,
      strokeSize,
      noiseMax,
      radiusLowerBound,
      radiusUpperBound,
      xTranslation,
      yTranslation
    );

    // Repaint certain circlePositions coordinates with points
    let increment = 0;
    for (let vec of circlePositions) {
      if (increment % 15 == 0) {
        strokeWeight(strokeSize);
        stroke(colorArr[0], colorArr[1], colorArr[2], opacity);
        point(vec.x, vec.y);
      }

      increment++;
    }

    // Clear circlePositions
    circlePositions.length = 0;
  }

  // Draw Rays Circles
  for (let i = 0; i < 250; i++) {
    let colorArr = colorScheme[0]; //circleColors[i % 2 ? 0 : 1];
    let opacity = 200;
    let strokeSize = 8;
    let noiseMax = 5.55;
    let radiusLowerBound = random(25, 150);
    let radiusUpperBound = random(601, 900);
    let xTranslation = width / 2; //random(radiusUpperBound, width - radiusUpperBound);
    let yTranslation = height / 2;// random(radiusUpperBound, height - radiusUpperBound);

    drawNoisyCircle(
      colorArr,
      opacity,
      strokeSize,
      noiseMax,
      radiusLowerBound,
      radiusUpperBound,
      xTranslation,
      yTranslation
    );

    // Repaint certain circlePositions coordinates with points
    let increment = 0;
    for (let vec of circlePositions) {
      if (increment % 15 == 0) {
        strokeWeight(strokeSize);
        stroke(colorArr[0], colorArr[1], colorArr[2], opacity);
        point(vec.x, vec.y);
      }

      increment++;
    }

    // Clear circlePositions
    circlePositions.length = 0;
  }

  // Draw Center Circles
  for (let i = 0; i < 150; i++) {
    let colorArr = circleColors[i % 2 ? 0 : 1];
    let opacity = random(55, 255);
    let strokeSize = 5;
    let noiseMax = 5.55;
    let radiusLowerBound = random(25, 100);
    let radiusUpperBound = random(101, 200);
    let xTranslation = random(width / 2 - 400, width / 2 + 400); //random(radiusUpperBound, width - radiusUpperBound);
    let yTranslation = random(height / 2 - 400, height / 2 + 400); //random(radiusUpperBound, height - radiusUpperBound);

    drawNoisyCircle(
      colorArr,
      opacity,
      strokeSize,
      noiseMax,
      radiusLowerBound,
      radiusUpperBound,
      xTranslation,
      yTranslation
    );

    // Repaint certain circlePositions coordinates with points
    let increment = 0;
    for (let vec of circlePositions) {
      if (increment % 5 == 0) {
        strokeWeight(strokeSize);
        stroke(colorArr[0], colorArr[1], colorArr[2], opacity);
        point(vec.x, vec.y);
      }

      increment++;
    }

    // Clear circlePositions
    circlePositions.length = 0;
  }

  //save("output_canvas.png");
}

function drawNoisyCircle(
  colorArr,
  opacity,
  strokeSize,
  noiseMax,
  radiusLowerBound,
  radiusUpperBound,
  xTranslation,
  yTranslation
) {
  noiseSeed(random(0, 100));
  noFill();
  strokeWeight(strokeSize);
  stroke(colorArr[0], colorArr[1], colorArr[2], opacity);

  beginShape();
  for (let a = 0; a < TWO_PI; a += 0.01) {
    let xOff = map(cos(a), -1, 1, 1, noiseMax);
    let yOff = map(sin(a), -1, 1, 1, noiseMax);

    let r = map(noise(xOff, yOff), 0, 1, radiusLowerBound, radiusUpperBound);
    let x = r * cos(a) + xTranslation;
    let y = r * sin(a) + yTranslation;

    //vertex(x, y);
    circlePositions.push(createVector(x, y));
  }

  endShape(CLOSE);
  noLoop();
}