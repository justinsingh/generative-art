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
  //translate(width / 2, height / 2);
  strokeWeight(15);
  stroke(black);
  noFill();

  for (let i = 0; i < 3; i++) {
    drawNoisyCircle();
    //drawNoisyLine(0, PI/ 16, 15, orange);
    //drawNoisyLine(PI / 12, PI / 8, 15, teal);
    //drawNoisyLine(PI / 4, PI / 2, 15, blue);
  }

function drawNoisyCircle() {
  noiseSeed(random(0, 100));

  strokeWeight(15);
  beginShape();
  for (let a = 0; a < TWO_PI; a += 0.01) {
    let xOff = map(cos(a), -1, 1, 0, noiseMax);
    let yOff = map(sin(a), -1, 1, 0, noiseMax);

    let r = map(noise(xOff, yOff), 0, 1, 100, 400);
    let x = r * cos(a) + width / 2;
    let y = r * sin(a) + height / 2;

    vertex(x, y);
  }

  endShape(CLOSE);
  noLoop();
}

function drawNoisyLine(shapeStart, shapeEnd, strokeSize, strokeColor) {
  strokeWeight(strokeSize);
  stroke(strokeColor);

  noiseSeed(random(0, 100));
  beginShape();
  for (let i = shapeStart; i < shapeEnd; i += 0.01) {
    let xOff = map(cos(i), -1, 1, 0, noiseMax);
    let yOff = map(sin(i), -1, 1, 0, noiseMax);

    let r = map(noise(xOff, yOff), 0, 1, 100, 400);
    let x = r * cos(i);
    let y = r * sin(i);

    vertex(x, y);
  }

  endShape();
  noLoop();
}}