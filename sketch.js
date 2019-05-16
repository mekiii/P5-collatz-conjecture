let step;

function setup() {
  step = 1;
  createCanvas(windowWidth, windowHeight);
  frameRate(5);
}

function collatzify(maxLevel) {
  let sequence = [[1]];
  for (let i = 0; i < maxLevel; i++) {
    let level = [];
    let y = i*15;
    sequence[i].forEach((num) => {
      //If odd number follows
      if (num % 3 == 1 && num % 2 == 0) {
        ellipse((num - 1) / 3,y, 5,5);
        level.push((num - 1) / 3);
      }
      //Even number follows
      level.push(2 * num);
      ellipse(2 * num,y, 5,5);
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
background(255);
fill(0);
collatzify(step);
step += 1;
console.log("Du bist süß!");
}