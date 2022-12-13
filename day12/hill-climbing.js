// You try contacting the Elves using your handheld device, but the river you're following must be too low to get a decent signal.

// You ask the device for a heightmap of the surrounding area (your puzzle input). The heightmap shows the local area from above broken into a grid; the elevation of each square of the grid is given by a single lowercase letter, where a is the lowest elevation, b is the next-lowest, and so on up to the highest elevation, z.

// Also included on the heightmap are marks for your current position (S) and the location that should get the best signal (E). Your current position (S) has elevation a, and the location that should get the best signal (E) has elevation z.

// You'd like to reach E, but to save energy, you should do it in as few steps as possible. During each step, you can move exactly one square up, down, left, or right. To avoid needing to get out your climbing gear, the elevation of the destination square can be at most one higher than the elevation of your current square; that is, if your current elevation is m, you could step to elevation n, but not to elevation o. (This also means that the elevation of the destination square can be much lower than the elevation of your current square.)

// For example:

// Sabqponm
// abcryxxl
// accszExk
// acctuvwj
// abdefghi
// Here, you start in the top-left corner; your goal is near the middle. You could start by moving down or right, but eventually you'll need to head toward the e at the bottom. From there, you can spiral around to the goal:

// v..v<<<<
// >v.vv<<^
// .>vv>E^^
// ..v>>>^^
// ..>>>>>^
// In the above diagram, the symbols indicate whether the path exits each square moving up (^), down (v), left (<), or right (>). The location that should get the best signal is still E, and . marks unvisited squares.

// This path reaches the goal in 31 steps, the fewest possible.

// What is the fewest steps required to move from your current position to the location that should get the best signal?

import { input } from "./data.js";

class Node {
  visited = false;
  steps = 0;

  constructor(value) {
    this.value = value;
  }
}

const inp = input.split("\n").map((e) => e.split("").map((f) => new Node(f)));

let iIdx = inp.findIndex((e) => e.find((f) => f.value === "S"));

let jIdx = inp
  .find((e) => e.find((f) => f.value === "S"))
  .findIndex((e) => e.value === "S");

let start = inp[iIdx][jIdx];
let end = inp
  .find((e) => e.find((f) => f.value === "E"))
  .find((e) => e.value === "E");

const arr = new Array(inp.length)
  .fill(0)
  .map((e) => ".".repeat(inp[0].length).split(""));

function hillClimb(node, i, j, direction = "L", steps = 0) {
  // if (end.visited === true) {
  //   return;
  // }
  // console.log(arr.map((e) => e.join().replaceAll(",", "")));
  // if (node.value === "E") {
  //   console.log("E steps:", steps);
  //   return;
  // }

  if (node.value === "E") {
    console.log(node.steps);
  }

  if (node.visited) {
    if (node.steps <= steps) {
      return;
    }

    if (node.steps > steps) {
      node.steps = steps;
    }
  }

  node.visited = true;

  if (node.value === "E") {
    // console.log("E steps:", steps);
    node.steps = steps;
    return;
  }

  node.steps = steps;

  // steps++;
  // console.log(steps);
  // console.log(node.value);

  ["R", "L", "U", "D"].forEach((dir) => {
    if (dir === direction) {
      return;
    }

    let nextNode;
    let nextDir;

    let x = i,
      y = j;

    switch (dir) {
      case "L":
        y--;
        nextDir = "R";
        break;
      case "R":
        y++;
        nextDir = "L";
        break;
      case "U":
        x--;
        nextDir = "D";
        break;
      case "D":
        x++;
        nextDir = "U";
        break;
    }

    if (x >= inp.length || y >= inp[0].length || x < 0 || y < 0) {
      return;
    }

    nextNode = inp[x][y];

    if (
      nextNode.value < node.value &&
      node.value !== "S" &&
      nextNode.value !== "E" &&
      nextNode.value === "a"
    ) {
      // console.log(nextNode.value);
      return;
    }

    if (
      nextNode.value.charCodeAt(0) - 1 > node.value.charCodeAt(0) &&
      node.value !== "S" &&
      nextNode.value !== "E"
    ) {
      // console.log(nextNode.value);
      return;
    }

    arr[i][j] = nextDir;
    hillClimb(nextNode, x, y, nextDir, steps + 1);
  });
}

// hillClimb(start, iIdx, jIdx);

// console.log(arr.map((e) => e.join().replaceAll(",", "")));
// console.log(end);

let arrE = [];

for (let i = 0; i < inp.length; i += 1) {
  let scoop = input.split("\n").map((e) => e.split("").map((f) => new Node(f)));

  hillClimb(scoop[i][0], i, 0);

  arrE.push(
    scoop
      .find((e) => e.find((f) => f.value === "E"))
      .find((e) => e.value === "E")
  );

  console.log(`i value`, i);
}

console.log(arrE);
