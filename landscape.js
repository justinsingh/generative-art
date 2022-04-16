// COLORS
const cream = [255, 252, 240];

const colorSchemes = {
  grass: {
    standardGrass: [
      [111, 186, 107, 255], // Bud Green
      [77, 155, 73, 255], // May Green
    ],
    vividGrass: [
      [0, 211, 106, 255], // Malachite
      [100, 199, 133, 255], // Emerald
    ],
  },
  sky: {
    standardSky: [
      [93, 169, 216, 255], // Carolina Blue
      [68, 119, 150, 255], // CG Blue
    ],
    vividSky: [
      [14, 194, 221, 255], // Vivid sky blue
      [146, 232, 245, 255], // Blizzard Blue
    ],
  },
  sun: {
    standardSun: [
      [255, 246, 76, 255], // Lemon Yellow
      [255, 250, 155, 255], // Lemon Yellow Crayola
      //[255, 202, 10, 255], // Sunglow
      //[255, 183, 101, 255], // Mellow Apricot
    ],
  },
};
const grassKeys = Object.keys(colorSchemes.grass);
const skyKeys = Object.keys(colorSchemes.sky);
const sunKeys = Object.keys(colorSchemes.sun);

// DATA
// Circles
var circlePositions = [];
// Tree
var angle = 0.71;

// RANDOMIZED VARIABLES
// Color Scheme
var grassColorScheme;
var skyColorScheme;
var sunColorScheme;

function setup() {
  //blendMode(DODGE);
  createCanvas(1000, 1000);
  background(cream);
  randomSeed(random(0, 10000));

  // ASSIGN RANDOMIZED VARIABLES
  // Color Scheme
  grassColorScheme =
    colorSchemes.grass[grassKeys[floor(random(0, grassKeys.length))]];
  skyColorScheme = colorSchemes.sky[skyKeys[floor(random(0, skyKeys.length))]];
  sunColorScheme = colorSchemes.sun[sunKeys[floor(random(0, sunKeys.length))]];
}

function draw() {
  // Draw Sky
  for (let i = 0; i < 4000; i++) {
    let circleColor = skyColorScheme[floor(random(0, skyColorScheme.length))];
    let colorArr = circleColor;
    let opacity = random(55, 200);
    let strokeSize = 3;
    let noiseMax = 5.55;
    let radiusLowerBound = random(10, 25);
    let radiusUpperBound = random(26, 30);
    let xTranslation = random(0 + radiusUpperBound, width - radiusUpperBound);
    let yTranslation = random(0 + radiusUpperBound, height / 1.55);

    // Assign circlePositions coordinates
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

  // Draw Grass
  for (let i = 0; i < 3000; i++) {
    let circleColor =
      grassColorScheme[floor(random(0, grassColorScheme.length))];
    let colorArr = circleColor;
    let opacity = random(55, 200);
    let strokeSize = 3;
    let noiseMax = 5.55;
    let radiusLowerBound = random(10, 25); //random(25, 50);
    let radiusUpperBound = random(26, 30); //random(51, 100);
    let xTranslation = random(0 + radiusUpperBound, width - radiusUpperBound);
    let yTranslation = random(height / 1.55, height - radiusUpperBound);

    // Assign circlePositions coordinates
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

  // Draw Sun
  for (let i = 0; i < 150; i++) {
    let circleColor = sunColorScheme[floor(random(0, sunColorScheme.length))];
    let colorArr = circleColor;
    let opacity = random(55, 200);
    let strokeSize = 3;
    let noiseMax = 5.55;
    let radiusLowerBound = random(25, 50); //random(25, 50);
    let radiusUpperBound = random(51, 100); //random(51, 100);
    let xTranslation = random(width / 9, width / 5);
    let yTranslation = random(height / 9, height / 5);

    // Assign circlePositions coordinates
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

  /*
  // Draw Trees 
  // TODO: Maybe just make a custom line function with the noisy effect, and use that in branch()
  stroke(0);
  translate(width / 1.55, height / 1.25);
  branch(190);
  // Paint circle positions (rename this to something tree position related)
  let increment = 0;
  for (let vec of circlePositions) {
      strokeWeight(1);
      stroke(0, 0, 0, 255);
      point(vec.x, vec.y);
  }
  circlePositions.length = 0;
}
*/

  /*
function branch(len) {
  line(0, 0, 0, -len);
  translate(0, -len);
  for (let i = 0; i < 5; i++) {
    drawNoisyCircle(
      [0, 0, 0],
      255,
      1,
      3.0,
      random(1, 5),
      random(6, 10),
      random(0, 10), // affects width of circle distribution
      -len
    );
  }
  if (len > 80) {
    push();
    rotate(angle);
    branch(len * 0.67);
    pop();
    push();
    rotate(-angle);
    branch(len * 0.67);
    pop();
  }

  //line(0, 0, 0, -len * 0.67);
  */
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
  return array.sort(() => Math.random() - 0.5);
}

function doubleClicked() {
  save("landscape.png");
}
