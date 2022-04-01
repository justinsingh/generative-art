// POISSON DISK SAMPLING PORTION CREATED USING DANIEL SHIFFMAN VIDEO: https://youtu.be/flQgnCUxHlw

/*
RANDOM VARIABLES
1) Color
  - Including background?
  - For one 
2) Size of center circles: small or large?
3) Positioning of center circles
4) Positioning of beams

TO-DO / EXPERIMENT WITH: fs
- reduce overlapping
- randomize colors per circle
- create small offsets to each dot position so it's not a neat circle
- split canvas into 2+ grids. 
- find out how to work within bounds of an abstract shape
  - we can make a green hill section and blue sky section
- Make circles draw more concentrated in the center and fade out
- Randomize opacity of each circle
- Stop first layer circles from drawing in the center
- Make beams fade or scratchy 
- Try different background colors (earth tones / night colors)
- Test changing poisson disk samples into noisy circles or lines
- use pre-defined RGB opacity within color scheme array for ray beams. use 255 in other cases
- more color schemes
  - monochrome
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
  [[176, 217, 140, 255], [140, 176, 217, 255], [217, 141, 176, 255]],
  [[119, 15, 210, 50], [0, 0, 0, 30], [210, 119, 15, 125]],
  [[0, 255, 208, 255], [255, 208, 0, 255], [208, 0, 255, 15]],
  [[167, 30, 30], [30, 169, 30], [30, 30, 169]]
];

// POISSON DISK SAMPLING VARIABLES
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

// RANDOMIZED VARIABLES
// Color Scheme
var colorScheme;
var backgroundDiscColor;
var backgroundDiscOpacity;

// Center Circle Size
var smallCenterCircleLowerRadiusBound = [25, 51];
var smallCenterCircleUpperRadiusBound = [51, 100];
var largeCenterCricleLowerRadiusBound = [25, 100];
var largeCenterCricleUpperRadiusBound = [101, 200];
var centerCircleLowerRadiusBound;
var centerCircleUpperRadiusBound;
var isCenterCircleSmall;
var rayColor;

function setup() {
  createCanvas(1210, 1580);

  // ASSIGN RANDOMIZED VARIABLES
  // Color Scheme
  background(cream);
  colorScheme = triadicColors[3]; //triadicColors[floor(random(0, triadicColors.length))]; // Pick random color scheme
  shuffleArray(colorScheme); // Shuffle elements of color scheme, so that the 3 colors are used in randomized parts of composition between editions
  backgroundDiscColor = colorScheme[0];
  backgroundDiscOpacity = 255;
  circleColors = [colorScheme[1], colorScheme[2]];
  rayColor = colorScheme[0];

  // Center Circle Size
  var randNum = floor(random(0, 2));
  isCenterCircleSmall = randNum == 0 ? false : true;
  centerCircleLowerRadiusBound = isCenterCircleSmall ? smallCenterCircleLowerRadiusBound : largeCenterCricleLowerRadiusBound;
  centerCircleUpperRadiusBound = isCenterCircleSmall ? smallCenterCircleUpperRadiusBound : largeCenterCricleUpperRadiusBound;

  // Poisson Disc Sampling Setup
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
  noLoop();

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
      stroke(backgroundDiscColor[0], backgroundDiscColor[1], backgroundDiscColor[2], backgroundDiscOpacity);
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
    let colorArr = rayColor;
    let opacity = 100;
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
        stroke(colorArr);
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
    let noiseMax = random(1.55, 10.55);
    let radiusLowerBound = random(...centerCircleLowerRadiusBound);
    let radiusUpperBound = random(...centerCircleUpperRadiusBound);
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
      if (increment % (isCenterCircleSmall ? 9 : 5) == 0) {
        strokeWeight(strokeSize);
        stroke(colorArr[0], colorArr[1], colorArr[2], opacity);
        point(vec.x, vec.y);
      }

      increment++;
    }

    // Clear circlePositions
    circlePositions.length = 0;
  }
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

function shuffleArray(array) {
  return array.sort( () => Math.random() - 0.5);
}

function doubleClicked() {
  save("output_canvas.png");
}