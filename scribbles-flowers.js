// COLORS
const cream = [255, 252, 240];
const colorSchemes = {
  twoGradient: [
    ["#e9d022", "#e60b09"], // sunset, yellow -> red
    ["#f9c58d", "#f492f0"], // light orange -> pink
    ["#432371", "#faae7b"], // purple -> orange
    ["red", "blue"],
  ],
  threeGradient: [
    ["#c5f9d7", "#f7d486", "#f27a7d"], // mint -> light gold -> pinkish red
    ["#fcef64", "#fcc44b", "#f44c7d"], // sunset, yellow -> orange -> pinkish red
  ]
};

// RANDOMIZED VARIABLES
// Color Scheme
var isTwoGradient;
var isThreeGradient;
var gradientColorSchemes;
var gradientColors;
var startColor;
var midColor;
var endColor;

function setup() {
  createCanvas(1210, 1580);
  background(cream);
  randomSeed(random(0, 9999999));

  // ASSIGN RANDOMIZED VARIABLES
  // Color Scheme
  if (floor(random(0, 2)) == 0) {
    isTwoGradient = true;
    isThreeGradient = false;
  }
  else {
    isTwoGradient = false;
    isThreeGradient = true;
  }

  gradientColorSchemes = isTwoGradient ? colorSchemes.twoGradient : colorSchemes.threeGradient;
  let randIndex = floor(random(0, gradientColorSchemes.length));
  gradientColors = gradientColorSchemes[randIndex];

  if (isTwoGradient) {
    startColor = color(gradientColors[0]);
    endColor = color(gradientColors[1]);
  }
  else {
    startColor = color(gradientColors[0]);
    midColor = color(gradientColors[1]);
    endColor = color(gradientColors[2]);
  }
}

function draw() {
  drawFlower(width / 2, height / 2, 2, endColor); 
}

function drawFlower(x, y, weight, color) {
  // Get vertices of flower shape
  flowerVertices = populateNoiseLoopVertices(x, y, 200, 300, 1.5);

  // Color in flower shape with scribble effect
  lineRandNoiseLoopsFillShape(flowerVertices, x, y, weight, color);
}

function lineRandNoiseLoopsFillShape(shapeVertices, centerX, centerY, weight, color) {
  for (let vec of shapeVertices) {
    let x = vec.x;
    let y = vec.y;

    // Draw line from center to x,y
    lineRandNoiseLoops(
      centerX,
      centerY,
      x,
      y,
      weight,
      color,
      50,
      random(55, 65),
      random(1, 1),
      0.02
    );
  }
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

function lineRandNoiseLoops(x1, y1, x2, y2, weight, color, minSize, maxSize, noiseMax, frequencyMultiplier) {
  noFill();
  strokeWeight(weight);
  stroke(color);

  for (let i = 0; i < maxSize * frequencyMultiplier; i++) {
    // Add randomized displacement
    let randTheta = random(TWO_PI);
    //x1 = x1 + random(maxSize / 12) * cos(randTheta);
    //y1 = y1 + random(maxSize / 12) * sin(randTheta);
    //x2 = x2 + random(maxSize / 12) * cos(randTheta);
    //y2 = y2 + random(maxSize / 12) * sin(randTheta);

    // Randomize Spacing
    let randLerpVal = random(1);
    let lerpX = lerp(x1, x2, randLerpVal);
    let lerpY = lerp(y1, y2, randLerpVal);

    // Randomize Size
    let randSize = random(minSize, maxSize);

    // Draw Noise Loop
    drawNoiseLoop(lerpX, lerpY, 0.75, randSize, weight, noiseMax);
  }
}

function drawNoiseLoop(xCenter, yCenter, minSize, maxSize, weight, noiseMax) {
  noiseSeed(random(0, 100));

  beginShape();
  let increment = 0;
  for (let a = 0; a < TWO_PI; a += 0.01) {
    if (increment % 15 == 0) {
      let xOff = map(cos(a), -1, 1, 0, noiseMax);
      let yOff = map(sin(a), -1, 1, 0, noiseMax);

      let r = map(noise(xOff, yOff), 0, 1, minSize, maxSize);
      let x = r * cos(a) + xCenter;
      let y = r * sin(a) + yCenter;
      point(x, y);
    }
    increment++;
  }

  endShape(CLOSE);
  noLoop();
}
function drawGrass() {
  // Draw Grass
  for (let i = 0; i < 5250; i++) {
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

    // Draw circles in line 3 style
    line3DrawShape(circlePositions, 1, [
      colorArr[0],
      colorArr[1],
      colorArr[2],
      opacity,
    ]);

    /*
    // Draw circles in standard style
    let increment = 0;
    for (let vec of circlePositions) {
      if (increment % 15 == 0) {
        strokeWeight(strokeSize);
        stroke(colorArr[0], colorArr[1], colorArr[2], opacity);
        point(vec.x, vec.y);
      }

      increment++;
    }
    */

    // Clear circlePositions
    circlePositions.length = 0;
  }

  function line3DrawShape(shapeVertices, weight, color) {
    let increment = 0;
    for (let vec of shapeVertices) {
      if (increment % 7 == 0) {
        let x = vec.x;
        let y = vec.y;

        // Displace y value
        let randTheta = random(TWO_PI);
        //x += random(weight*5) * cos(randTheta);
        //y += random(weight*5) * sin(randTheta);

        // Draw circle
        strokeWeight(random(0, weight));
        let randOpacity = random(150, 200);
        // Play around with randomizing opacity, and which to apply to (stroke || fill)
        stroke(color[0], color[1], color[2], randOpacity);
        fill(color[0], color[1], color[2], randOpacity);

        // Play around with randomizing size
        let randSize = random(0, random(0, weight * 2.5));
        circle(x, y, randSize);
        //ellipse(x, y, randSize, randSize);
      }

      increment++;
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
}

function doubleClicked() {
  save("scribbles-flowers.png");
}
