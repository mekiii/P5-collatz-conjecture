let yDist = 25;
let xDist = 60;
let startingPoint;
let isFirstCollatz;
let withText;
let pos = [];
let counter;
let variance;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(5);
  background(255);
  colorMode(RGB, 255, 255, 255, 1);
  startingPoint = createVector(1, 1);
  isFirstCollatz = true;
  withText = false;
  counter = 0;
  variance = 0;
}

function collatzify(maxLevel) {
  let sequence = [
    [1]
  ];
  for (let i = 0; i < maxLevel; i++) {
    //Create empty level array for following sequence numbers
    let level = [];
    sequence[i].forEach((num) => {
      //If odd number follows
      if (num % 3 == 1 && num % 2 == 0) {
        level.push((num - 1) / 3);
      }
      //Even number follows
      level.push(2 * num);
    })
    sequence.push(level);
  }
  return sequence;
}
console.log(collatzify(10))


function calcCollatzFollower(num) {
  let follower = [];
  //Even number follows
  follower.push(2 * num);
  //Check if there's an odd number following
  if (num % 3 == 1 && num % 2 == 0) {
    follower.push((num - 1) / 3);
  }
  return follower;
}


//draw follower of number num from the position it's been drawn;
function drawFollower(num, numPos) {
  noStroke();
  noFill();
  let follower = calcCollatzFollower(num);
  //first number is always even
  let evenFollower = follower[0];
  let evenPos = createVector(numPos.x + xDist + variance, numPos.y + yDist + variance);
  if (withText) {
    fill(0, 0, 0, 1);
    textSize(12);
    text(evenFollower, evenPos.x, evenPos.y);
  }
  stroke(0, 0, 0, 0.1);
  strokeWeight(3);
  line(numPos.x, numPos.y, evenPos.x, evenPos.y);
  if (follower[1]) {
    //second number is odd
    noStroke();
    noFill();
    let oddFollower = follower[1];
    let oddPos = createVector(numPos.x - xDist, noise(random(numPos.y - variance, numPos.y + variance)) * 2 * (numPos.y + yDist));
    if (withText) {
      fill(0, 0, 0, 1);
      textSize(12);
      text(oddFollower, oddPos.x, oddPos.y);
    }
    stroke(noise(numPos.x)*255, noise(numPos.y)*255, noise(oddPos.y)*255, 0.4);
    strokeWeight(3);
    line(numPos.x, numPos.y, oddPos.x, oddPos.y);
    return [evenFollower, evenPos, oddFollower, oddPos];
  }
  return [evenFollower, evenPos];
}




function draw() {
  if (isFirstCollatz) {
    pos.push(drawFollower(1, startingPoint));
    isFirstCollatz = false;
  } else {
    if (counter < 30) {

      if (counter === 3) {
        pos[0].pop();
        pos[0].pop();
        console.log(pos[0]);
      }
      let temp = [];
      pos.forEach((num) => {
        temp.push(drawFollower(num[0], num[1]));
        if (num[2]) {
          temp.push(drawFollower(num[2], num[3]));
        }
      })
      pos = temp;
      variance++;
      yDist+=0.5;
    } else {
      background(255,0.9);
      isFirstCollatz = true;
      counter = -1;
      pos = [];
      variance = 0;
      yDist = 25;
    }
    
  }
  counter++;
}