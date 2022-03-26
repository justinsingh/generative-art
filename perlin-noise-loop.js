const noiseMax = 1.5;

function setup() {
  createCanvas(1210, 1580);
}

function draw() {
  const teal = color(180, 238, 243);
  const white = color(255);
  const black = color(20);
  const cream = color(255, 252, 240);
  const orange = color(127, 64, 0);
  const red = color(255, 0, 0, 150);
  const blue = color(0, 0, 255, 150);

  background(cream);
  translate(width / 2, height / 2);
  strokeWeight(15);
  stroke(red);
  noFill();

  for (let i = 0; i < 1; i++) {
    //drawNoisyCircle();
    drawNoisyLine(PI / 4, 15, orange);
  }
}

function drawNoisyCircle() {
  noiseSeed(random(0, 100));
  beginShape();
  for (let a = 0; a < TWO_PI; a += 0.01) {
    let xOff = map(cos(a), -1, 1, 0, noiseMax);
    let yOff = map(sin(a), -1, 1, 0, noiseMax);

    let r = map(noise(xOff, yOff), 0, 1, 100, 400);
    let x = r * cos(a);
    let y = r * sin(a);

    vertex(x, y);
  }

  endShape(CLOSE);
  noLoop();
}

function drawNoisyLine(shapeLength, strokeSize, strokeColor) {
  strokeWeight(strokeSize);
  stroke(strokeColor);

  noiseSeed(random(0, 100));
  beginShape();
  for (let i = 0; i < shapeLength; i += 0.01) {
    let xOff = map(cos(i), -1, 1, 0, noiseMax);
    let yOff = map(sin(i), -1, 1, 0, noiseMax);

    let r = map(noise(xOff, yOff), 0, 1, 100, 400);
    let x = r * cos(i);
    let y = r * sin(i);

    vertex(x, y);
  }

  endShape();
  noLoop();
}