const noiseMax = 1.5;

function setup() {
  createCanvas(1210, 1580);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  stroke(255);
  noFill();

  for (let i = 0; i < 25; i++) {
    drawNoisyCircle();
  }
}

function drawNoisyCircle() {
  noiseSeed(random(0, 100));
  beginShape();
  for (let a = 0; a < TWO_PI; a += 0.1) {
    let xOff = map(cos(a), -1, 1, 0, noiseMax);
    let yOff = map(sin(a), -1, 1, 0, noiseMax);

    let r = map(noise(xOff, yOff), 0, 1, 100, 500);
    let x = r * cos(a);
    let y = r * sin(a);

    vertex(x, y);
  }

  endShape(CLOSE);
  noLoop();
}