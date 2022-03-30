// CREATED USING DANIEL SHIFFMAN VIDEO: https://youtu.be/flQgnCUxHlw

// minimum distance between points
const r = 17;
// num of times before we 'quit' trying
const k = 30;

// grid for storing samples (points). entry of -1 indicates no sample.
var w = r / Math.sqrt(2); // size of cell
var grid = [];
var active = [];
var cols, rows;

function setup() {
  createCanvas(400, 400);
  background(0);
  strokeWeight(4);

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
            var index = (col + i) + (row + j) * cols;
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

  for (let i = 0; i < grid.length; i++) {
    if (grid[i]) {
      stroke(255);
      strokeWeight(4);
      point(grid[i].x, grid[i].y);
    }
  }

  // debug
  for (let i = 0; i < active.length; i++) {
    if (active[i]) {
    stroke(255, 0, 255);
    strokeWeight(4);
    point(active[i].x, active[i].y);
    }
  }
}
