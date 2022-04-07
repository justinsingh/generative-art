// COLORS
const cream = [255, 252, 240];

const colorSchemes = {
  grass: {
    standardGrass: [
      [111, 186, 107, 255], // Bud Green
      [77, 155, 73, 255], // May Green
    ],
  },
  sky: {
    standardSky: [
      [93, 169, 216], // Carolina Blue
      [68, 119, 150], // CG Blue
    ],
  },
};

// DATA
const circlePositions = [];

function setup() {
  createCanvas(1000, 1000);
  background("white");
  randomSeed(random(0, 10000));
}

function draw() {
  // Draw Sky
  for (let i = 0; i < 3000; i++) {
    let grassColors = colorSchemes.grass.standardGrass;
    let colorArr = grassColors[i % 2 ? 0 : 1];
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

  // Draw Sky
  for (let i = 0; i < 4000; i++) {
    let skyColors = colorSchemes.sky.standardSky;
    let colorArr = skyColors[i % 2 ? 0 : 1];
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
  save("output_canvas.png");
}