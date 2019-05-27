let yDist;
let xDist
let startingPoint;
let isFirstCollatz;
let withText;
let counter;
let tSize;
let followers = [];

class collatzFollower {
  constructor(predecessor, prePos) {
    this.sprePos = prePos;
    this.even = 2 * predecessor;
    this.position = {};
    this.position.even = this.calcPosition(false, prePos);
    this.hasOddFollower;
    //Check if there's an odd number following
    if (predecessor % 3 == 1 && predecessor % 2 == 0) {
      this.odd = (predecessor - 1) / 3;
      this.position.odd = this.calcPosition(true, prePos);
      this.hasOddFollower = true;
    } else {
      this.hasOddFollower = false;
    }
    this.tempPosEven = createVector(this.sprePos.x, this.sprePos.y);
    this.tempPosOdd = createVector(this.sprePos.x, this.sprePos.y);
    this.lerpCounter = 0;
    this.lerpStep = 0.3;
  }

  calcPosition(isOdd, sprePos) {
    if (isOdd) {
      return createVector(sprePos.x - xDist, sprePos.y + yDist);
    } else {
      return createVector(sprePos.x + xDist, sprePos.y + yDist);
    }
  }

  draw() {
    let scolor = color(19, 37, 106, 0.4)
    stroke(scolor);
    strokeWeight(1);
    if (abs(this.tempPosEven.x - this.position.even.x) > 0.05) {
      this.tempPosEven.x = lerp(this.sprePos.x, this.position.even.x, this.lerpCounter);
      this.tempPosEven.y = lerp(this.sprePos.y, this.position.even.y, this.lerpCounter);
      line(this.sprePos.x, this.sprePos.y, this.tempPosEven.x, this.tempPosEven.y);
    }
    if (withText) {
      noStroke();
      fill(19, 37, 106, 0.7);
      textSize(tSize + 5);
      text(this.even, this.position.even.x, this.position.even.y);
    }
    if (this.hasOddFollower) {
      let scolor = color(243, 179, 83, 0.4);
      stroke(scolor);
      strokeWeight(1);
      if (abs(this.tempPosOdd.x - this.position.odd.x) > 0.05) {
        this.tempPosOdd.x = lerp(this.sprePos.x, this.position.odd.x, this.lerpCounter);
        this.tempPosOdd.y = lerp(this.sprePos.y, this.position.odd.y, this.lerpCounter);
        line(this.sprePos.x, this.sprePos.y, this.tempPosOdd.x, this.tempPosOdd.y);
      }
      if (withText) {
        noStroke();
        fill(19, 37, 106, 0.7);
        textSize(tSize + 5);
        text(this.odd, this.position.odd.x, this.position.odd.y);
      }
    }
    this.lerpCounter += this.lerpStep;
  }

}


function reset() {
  background(221, 226, 218, 0.4);
  isFirstCollatz = true;
  counter = 0;
  pos = [];
  yDist = 15;
  xDist = 20;
  angleEven = 0;
  angleOdd = 0;
  startingPoint = createVector(1, 1);
  tSize = 8;
  withText = false;
}

function setup() {
  createCanvas(windowWidth * 2, windowHeight);
  frameRate(15);
  colorMode(RGB, 255, 255, 255, 1);
  reset();
  for (let i = 0; i < 100; i++) {
    if (i == 0) {
      followers.push(new collatzFollower(1, startingPoint));
    } else {
      let predecessor = followers[i - 1];
      if (predecessor.odd == 1){
        xDist += 15;
        yDist += 10;
      }
      followers.push(new collatzFollower(predecessor.even, predecessor.position.even));
      if (predecessor.hasOddFollower) {
        followers.push(new collatzFollower(predecessor.odd, predecessor.position.odd));
      }
    }
  }
  console.log(followers.length);
}
let element = 0;

function draw() {

  //background(221, 226, 218, 0.05);
  noStroke();
  noFill();
  if(element < followers.length){
    followers[element].draw();
    if(followers[element].lerpCounter >= 1){
    element++;
  }
  }

  //Start with the start number at the starting point
  // if (isFirstCollatz) {
  //   pos.push(drawFollower(1, startingPoint));
  //   isFirstCollatz = false;
  // } else {
  //   if (counter < 35) {
  //     let temp = [];
  //     pos.forEach((num) => {
  //       temp.push(drawFollower(num[0], num[1]));
  //       if (num[2]) {
  //         temp.push(drawFollower(num[2], num[3]));
  //       }
  //     })
  //     pos = temp;
  //   } else {
  //     reset();
  //   }
  // }
  // counter++;
}


// //Calculate the follower of the sequence term (num)
// function calcCollatzFollower(num) {
//   let follower = [];
//   //Even number follows
//   follower.push(2 * num);
//   //Check if there's an odd number following
//   if (num % 3 == 1 && num % 2 == 0) {
//     follower.push((num - 1) / 3);
//   }
//   return follower;
// }


// //draw follower of number num from the position it's been drawn;
// function drawFollower(num, numPos) {

//   let follower = calcCollatzFollower(num);
//   //first number is always even
//   let evenFollower = follower[0];
//   //Define new position
//   let evenPos = calcNewPos(numPos, false)
//   let evenColor = color(19, 37, 106, 0.4);
//   drawConnection(evenColor, evenFollower, numPos, evenPos);
//   if (follower[1]) {
//     //second number is odd
//     let oddFollower = follower[1];
//     //Define new position
//     let oddPos = calcNewPos(numPos, true);
//     let selectedColor = color(243, 179, 83, 1);
//     drawConnection(selectedColor, oddFollower, numPos, oddPos);
//     return [evenFollower, evenPos, oddFollower, oddPos];
//   }
//   return [evenFollower, evenPos];
// }


// function drawConnection(scolor, ntext, startPos, endPos) {
//   let tempPos = startPos;
//   if (tempPos.y != endPos.y) {
//     stroke(scolor);
//     strokeWeight(1);
//     tempPos.x = lerp(startPos.x, endPos.x, 0.05);
//     tempPos.y = lerp(startPos.y, endPos.y, 0.05);
//     line(startPos.x, startPos.y, tempPos.x, tempPos.y);
//     if (withText) {
//       noStroke();
//       fill(19, 37, 106, 0.7);
//       textSize(tSize + 5);
//       text(ntext, endPos.x, endPos.y);
//     }
//     isDrawing = false;
//   } else {
//     isDrawing = true;
//   }

// }

// function calcNewPos(term, isOdd) {
//   if (isOdd) {
//     let oddPos = createVector(term.x - xDist, term.y + yDist);
//     return oddPos;
//   } else {
//     let evenPos = createVector(term.x + xDist, term.y + yDist);
//     return evenPos;
//   }

// }