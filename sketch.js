let yDist = 25;
let xDist = 40;
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
  startingPoint = createVector(10, 10);
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
  let evenPos = createVector(numPos.x + xDist, numPos.y + yDist);
  if (withText) {
    fill(0, 0, 0, 1);
    textSize(12);
    text(evenFollower, evenPos.x, evenPos.y);
  }
  stroke(0, 0, 0, 0.3);
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
    stroke(0, 0, 0, 0.3);
    strokeWeight(2);
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
      variance+=0.5;
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


/*
    if (pos.length ){
      let evenFollower = pos[0][0];
      let evenPos = pos [0][1];
      pos.push(drawFollower(evenFollower, evenPos));
      let oddFollower = pos[1][2];
      let oddPos = pos [3];
      pos = drawFollower(oddFollower, oddPos)
    }
    else {
      let evenFollower = pos[0];
      let evenPos = pos [1];
      pos = drawFollower(evenFollower, evenPos);
    }
  }
  
}
*/

/*
function draw() {
  if (row < 40) {
    fill(0);
    translate(10,50);
    row = sequence.length - 1;
    y = row * 20;
    level = [];
    sequence[row].forEach((num) => {
      //draw current sequence point;
      //If odd number follows
      if (num % 3 == 1 && num % 2 == 0) {
        //ellipse((num - 1) / 3, y, 5, 5);
        let oddFollower = (num - 1) / 3;
        stroke(0);
        textSize(12);
        text(oddFollower, oddFollower, y);
        stroke(100);
        line(num, y - 20, oddFollower, y);
        ellipse(oddFollower, y, 1, 1);
        level.push(oddFollower);

      }
      //Even number follows
      let evenFollower = num * 2;
      stroke(0);
      textSize(12);
      text(evenFollower, evenFollower, y);
      stroke(100);
      ellipse(evenFollower, y, 1, 1);
      line(num, y - 20, evenFollower, y);
      level.push(evenFollower);
      //ellipse(2 * num, y, 5, 5);
    })
    sequence.push(level);

  }
}*/