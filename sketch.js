let yDist = 7;
let xDist = 40;
let startingPoint;
let isFirstCollatz;
let withText;
let pos = [];
let counter;
let variance;
let angleOdd;
let angleEven;
let tSize;


function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(20);
  background(255);
  colorMode(RGB, 255, 255, 255, 1);
  startingPoint = createVector(1, windowHeight/2);
  isFirstCollatz = true;
  withText = true;
  counter = 0;
  variance = 0;
  angleOdd = 0;
  angleEven = 0;
  tSize = 3;
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
  let evenPos = createVector(numPos.x + xDist, numPos.y + yDist);
  let translatedPosX = evenPos.x - numPos.x;
  let translatedPosY = evenPos.y - numPos.y;
  let _x = translatedPosX * cos(angleEven) - translatedPosY * sin(angleEven);
  let _y = translatedPosX * sin(angleEven) + translatedPosY * cos(angleEven);
  evenPos.x = _x + numPos.x + yDist*2;
  evenPos.y = _y + numPos.y;
  //let evenPos = createVector(numPos.x + xDist + variance, numPos.y + yDist + variance);
  stroke(0, 0, 0, 0.5);
  strokeWeight(2);
  line(numPos.x, numPos.y, evenPos.x, evenPos.y);
  if (withText) {
    noStroke();
    fill(0, 0, 0, 0.4);
    textSize(tSize);
    text(evenFollower, evenPos.x, evenPos.y);
  }
  if (follower[1]) {
    //second number is odd
    noStroke();
    noFill();
    let oddFollower = follower[1];
    let oddPos = createVector(numPos.x + xDist, numPos.y + yDist);
    let translatedoddPosX = oddPos.x - numPos.x;
    let translatedoddPosY = oddPos.y - numPos.y;
    let _x = translatedoddPosX * cos(angleOdd) - translatedoddPosY * sin(angleOdd);
    let _y = translatedoddPosX * sin(angleOdd) + translatedoddPosY * cos(angleOdd);
    oddPos.x = sin(numPos.x)*_x + numPos.x ;
    oddPos.y = sin(numPos.y)*_y + numPos.y ;
    //let oddPos = createVector(numPos.x - xDist, noise(random(numPos.y - variance, numPos.y + variance)) * 1.5 * (numPos.y + yDist));
    stroke(0, 0,0, 0.4);
    strokeWeight(5);
    line(numPos.x, numPos.y, oddPos.x, oddPos.y);
    if (withText) {
      noStroke();
      fill(noise(numPos.x) * 255, noise(numPos.y) * 255, 255, 0.7);
      textSize(tSize + 4);
      text(oddFollower, oddPos.x, oddPos.y);
    }
    return [evenFollower, evenPos, oddFollower, oddPos];
  }
  return [evenFollower, evenPos];
}




function draw() {
  background(255, 0.08);
  if (isFirstCollatz) {
    pos.push(drawFollower(1, startingPoint));
    isFirstCollatz = false;
  } else {
    if (counter < 40) {

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
      angleOdd += 0.3;
      angleEven -= 0.8;
      xDist += 8;
      yDist += 3;
      tSize += 0.1;
    } else {
      background(255, 0.9);
      isFirstCollatz = true;
      counter = -1;
      pos = [];
      //variance = 0;
      yDist = 7;
      xDist = 40;
      angleEven = 0;
      angleOdd = 0;
      startingPoint = createVector(1, randomGaussian(windowHeight/2, 50));
      tSize = 3;
    }

  }
  counter++;
}