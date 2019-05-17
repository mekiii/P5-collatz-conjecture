let step;
let sequence = [
  [1]
];
let isLerping = false;
let level, y, lerpingy, lerpingx1, lerpingx2;
let row = 0;

function setup() {
  step = 1;
  createCanvas(windowWidth, windowHeight);
  frameRate(5);
  background(255);
  lerpingy = 0;
}

function collatzify(maxLevel) {
  let sequence = [
    [1]
  ];
  for (let i = 0; i < maxLevel; i++) {
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

/*
function collatz(maxLevels){
  let levels = [[1]]
  while (levels.length < maxLevels) {
      let level = [];
      levels[levels.length-1].forEach(function(num){
          const mod6 = ((num-4)%6);
          const odd = (num-1)/3;
          if (!mod6 && odd != 1) {
              level.push(odd)
          }
          level.push(num*2);
      })
      levels.push(level);
  }
  return levels;
}
*/

console.log(collatzify(15));

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


}