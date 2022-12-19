// You feel the ground rumble again as the distress signal leads you to a large network of subterranean tunnels. You don't have time to search them all, but you don't need to: your pack contains a set of deployable sensors that you imagine were originally built to locate lost Elves.

// The sensors aren't very powerful, but that's okay; your handheld device indicates that you're close enough to the source of the distress signal to use them. You pull the emergency sensor system out of your pack, hit the big button on top, and the sensors zoom off down the tunnels.

// Once a sensor finds a spot it thinks will give it a good reading, it attaches itself to a hard surface and begins monitoring for the nearest signal source beacon. Sensors and beacons always exist at integer coordinates. Each sensor knows its own position and can determine the position of a beacon precisely; however, sensors can only lock on to the one beacon closest to the sensor as measured by the Manhattan distance. (There is never a tie where two beacons are the same distance to a sensor.)

// It doesn't take long for the sensors to report back their positions and closest beacons (your puzzle input). For example:

// Sensor at x=2, y=18: closest beacon is at x=-2, y=15
// Sensor at x=9, y=16: closest beacon is at x=10, y=16
// Sensor at x=13, y=2: closest beacon is at x=15, y=3
// Sensor at x=12, y=14: closest beacon is at x=10, y=16
// Sensor at x=10, y=20: closest beacon is at x=10, y=16
// Sensor at x=14, y=17: closest beacon is at x=10, y=16
// Sensor at x=8, y=7: closest beacon is at x=2, y=10
// Sensor at x=2, y=0: closest beacon is at x=2, y=10
// Sensor at x=0, y=11: closest beacon is at x=2, y=10
// Sensor at x=20, y=14: closest beacon is at x=25, y=17
// Sensor at x=17, y=20: closest beacon is at x=21, y=22
// Sensor at x=16, y=7: closest beacon is at x=15, y=3
// Sensor at x=14, y=3: closest beacon is at x=15, y=3
// Sensor at x=20, y=1: closest beacon is at x=15, y=3
// So, consider the sensor at 2,18; the closest beacon to it is at -2,15. For the sensor at 9,16, the closest beacon to it is at 10,16.

// Drawing sensors as S and beacons as B, the above arrangement of sensors and beacons looks like this:

//                1    1    2    2
//      0    5    0    5    0    5
//  0 ....S.......................
//  1 ......................S.....
//  2 ...............S............
//  3 ................SB..........
//  4 ............................
//  5 ............................
//  6 ............................
//  7 ..........S.......S.........
//  8 ............................
//  9 ............................
// 10 ....B.......................
// 11 ..S.........................
// 12 ............................
// 13 ............................
// 14 ..............S.......S.....
// 15 B...........................
// 16 ...........SB...............
// 17 ................S..........B
// 18 ....S.......................
// 19 ............................
// 20 ............S......S........
// 21 ............................
// 22 .......................B....
// This isn't necessarily a comprehensive map of all beacons in the area, though. Because each sensor only identifies its closest beacon, if a sensor detects a beacon, you know there are no other beacons that close or closer to that sensor. There could still be beacons that just happen to not be the closest beacon to any sensor. Consider the sensor at 8,7:

//                1    1    2    2
//      0    5    0    5    0    5
// -2 ..........#.................
// -1 .........###................
//  0 ....S...#####...............
//  1 .......#######........S.....
//  2 ......#########S............
//  3 .....###########SB..........
//  4 ....#############...........
//  5 ...###############..........
//  6 ..#################.........
//  7 .#########S#######S#........
//  8 ..#################.........
//  9 ...###############..........
// 10 ....B############...........
// 11 ..S..###########............
// 12 ......#########.............
// 13 .......#######..............
// 14 ........#####.S.......S.....
// 15 B........###................
// 16 ..........#SB...............
// 17 ................S..........B
// 18 ....S.......................
// 19 ............................
// 20 ............S......S........
// 21 ............................
// 22 .......................B....
// This sensor's closest beacon is at 2,10, and so you know there are no beacons that close or closer (in any positions marked #).

// None of the detected beacons seem to be producing the distress signal, so you'll need to work out where the distress beacon is by working out where it isn't. For now, keep things simple by counting the positions where a beacon cannot possibly be along just a single row.

// So, suppose you have an arrangement of beacons and sensors like in the example above and, just in the row where y=10, you'd like to count the number of positions a beacon cannot possibly exist. The coverage from all sensors near that row looks like this:

//                  1    1    2    2
//        0    5    0    5    0    5
//  9 ...#########################...
// 10 ..####B######################..
// 11 .###S#############.###########.
// In this example, in the row where y=10, there are 26 positions where a beacon cannot be present.

// Consult the report from the sensors you just deployed. In the row where y=2000000, how many positions cannot contain a beacon?

import * as fs from "fs";

const input = fs.readFileSync("day15/data.txt", "utf-8");

const inpArr = input
  .split("\n")
  .map((e) => e.match(/(-?\d)+/g).map((f) => parseInt(f)));

// console.log(inpArr);

const yArr = [];
const beacon = [];

inpArr.forEach((e) => {
  if (e[3] === 2000000) {
    beacon.push(e[2]);
  }

  let diffX = Math.abs(e[0] - e[2]);
  let diffY = Math.abs(e[1] - e[3]);
  let totalDiff = diffX + diffY;

  let movesToRow = Math.abs(e[1] - 2000000);

  if (totalDiff < movesToRow) {
    return;
  }

  let movesLeft = totalDiff - movesToRow;

  let left = e[0] - movesLeft;
  let right = e[0] + movesLeft;

  yArr.push([left, right]);
});

let lowest = yArr[0][0],
  highest = yArr[0][1];

yArr.forEach((e) => {
  if (e[0] < lowest) {
    lowest = e[0];
  }

  if (e[1] > highest) {
    highest = e[1];
  }
});

// Part 1
console.log(`Part 1 Solution: `, highest - lowest);

// Part 2
const squaresArr = [];

// Calculate the four points of each sensor
inpArr.forEach((e) => {
  let diffX = Math.abs(e[0] - e[2]);
  let diffY = Math.abs(e[1] - e[3]);
  let totalDiff = diffX + diffY;

  const squareArr = [];
  squareArr.push([e[0] - totalDiff, e[1]]);
  squareArr.push([e[0] + totalDiff, e[1]]);
  squareArr.push([e[0], e[1] + totalDiff]);
  squareArr.push([e[0], e[1] - totalDiff]);

  squaresArr.push(squareArr);
});

// Calculate the y-intercept for each of the four lines for the sensors
const topLeft = squaresArr.map((e) => e[2][1] - e[2][0]);
const botLeft = squaresArr.map((e) => e[1][1] - e[1][0]);
const topRight = squaresArr.map((e) => e[2][1] + e[2][0]);
const botRight = squaresArr.map((e) => e[0][1] + e[0][0]);

let left = 0,
  right = 0;

// The y-intercept between parallel lines should be 2 because that will mean there's an empty space
// Take the average of the two y-intercepts for both a positive slope and negative slope
for (let i = 0; i < topRight.length; i += 1) {
  for (let j = 0; j < botRight.length; j += 1) {
    if (Math.abs(topLeft[i] - botLeft[j]) === 2) {
      left = (topLeft[i] + botLeft[j]) / 2;
    }
  }
}

for (let i = 0; i < topRight.length; i += 1) {
  for (let j = 0; j < botRight.length; j += 1) {
    if (Math.abs(topRight[i] - botRight[j]) === 2) {
      right = (topRight[i] + botRight[j]) / 2;
    }
  }
}

// Now that we have the y-intercepts of both lines that will pass through beacon (pos and neg slope)
// We can calculate the (x,y) coords with the following 2 equations:
// y = x + b --> b in this case being left (pos slope)
// y = -x + b --> b in this case being right (neg slope)
// We'll set them equal to each other, solve for x, and then solve for y.

let beaconX = (right - left) / 2;
let beaconY = beaconX + left;

console.log(`Part 2 solution: `, beaconX * 4000000 + beaconY);
