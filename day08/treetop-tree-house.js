// The expedition comes across a peculiar patch of tall trees all planted carefully in a grid. The Elves explain that a previous expedition planted these trees as a reforestation effort. Now, they're curious if this would be a good location for a tree house.

// First, determine whether there is enough tree cover here to keep a tree house hidden. To do this, you need to count the number of trees that are visible from outside the grid when looking directly along a row or column.

// The Elves have already launched a quadcopter to generate a map with the height of each tree (your puzzle input). For example:

// 30373
// 25512
// 65332
// 33549
// 35390
// Each tree is represented as a single digit whose value is its height, where 0 is the shortest and 9 is the tallest.

// A tree is visible if all of the other trees between it and an edge of the grid are shorter than it. Only consider trees in the same row or column; that is, only look up, down, left, or right from any given tree.

// All of the trees around the edge of the grid are visible - since they are already on the edge, there are no trees to block the view. In this example, that only leaves the interior nine trees to consider:

// The top-left 5 is visible from the left and top. (It isn't visible from the right or bottom since other trees of height 5 are in the way.)
// The top-middle 5 is visible from the top and right.
// The top-right 1 is not visible from any direction; for it to be visible, there would need to only be trees of height 0 between it and an edge.
// The left-middle 5 is visible, but only from the right.
// The center 3 is not visible from any direction; for it to be visible, there would need to be only trees of at most height 2 between it and an edge.
// The right-middle 3 is visible from the right.
// In the bottom row, the middle 5 is visible, but the 3 and 4 are not.
// With 16 trees visible on the edge and another 5 visible in the interior, a total of 21 trees are visible in this arrangement.

// Consider your map; how many trees are visible from outside the grid?

import { input } from "./data.js";

function transpose(a) {
  return Object.keys(a[0]).map(function (c) {
    return a.map(function (r) {
      return r[c];
    });
  });
}

const inp1 = input.split("\n");
const inp2 = transpose(input.split("\n").map((e) => e.split("")))
  .map((e) => [e.join().replaceAll(",", "")])
  .flat();

const grid1 = [...new Array(inp1.length)].map((e) =>
  new Array(inp1[1].length).fill(false)
);

const grid2 = [...new Array(inp2.length)].map((e) =>
  new Array(inp2[1].length).fill(false)
);

function check(inp, grid) {
  let height = 9;

  while (height > 0) {
    for (let i = 1; i < inp[0].length - 1; i += 1) {
      if (!inp[i].includes(`${height}`)) {
        continue;
      }

      let left = parseInt(inp[i][0]);
      let right = parseInt(inp[i][inp[i].length - 1]);

      if (height <= left && height <= right) {
        continue;
      }

      if (
        inp[i].indexOf(`${height}`) &&
        height > left &&
        (!inp[i].includes("-") ||
          inp[i].indexOf(`${height}`) < inp[i].indexOf("-"))
      ) {
        grid[i][inp[i].indexOf(`${height}`)] = true;
      }

      if (
        inp[i].lastIndexOf(`${height}`) &&
        height > right &&
        (height === 9 || inp[i].lastIndexOf(`${height}`) > inp[i].indexOf("-"))
      ) {
        grid[i][inp[i].lastIndexOf(`${height}`)] = true;
      }

      const isTrue = (e) => e;
      let start = grid[i].findIndex(isTrue);
      let end =
        grid[i].length - 1 - grid[i].slice().reverse().findIndex(isTrue);

      if (start && end && start != end) {
        inp[i] = inp[i].replace(
          inp[i].slice(start, end + 1),
          "-".repeat(inp[i].slice(start, end + 1).length)
        );
      }
    }
    height -= 1;
  }
}

check(inp1, grid1);
check(inp2, grid2);
const trues2 = transpose(grid2);

function combineGrids(g1, g2) {
  for (let i = 0; i < g1.length; i += 1) {
    for (let j = 0; j < g1[i].length; j += 1) {
      if (i === 0 || i === g1.length - 1) {
        g1[i][j] = true;
      }

      if (j === 0 || j === g1[i].length - 1) {
        g1[i][j] = true;
      }

      if (g2[i][j]) {
        g1[i][j] = true;
      }
    }
  }

  return g1;
}

const trues = combineGrids(grid1, trues2);
let total = 0;

trues.forEach((e) => {
  e.forEach((f) => {
    if (f) {
      total += 1;
    }
  });
});

console.log(total);

const s = input.split("\n");

let largest = 0;
for (let i = 1; i < s.length - 1; i += 1) {
  for (let j = 1; j < s[i].length - 1; j += 1) {
    const c = parseInt(s[i][j]);

    let left = 1,
      right = 1,
      up = 1,
      down = 1;

    let a = i - 1;
    let b = j;

    // up
    console.log(i, j);
    console.log(a, b);
    while (s[a][b] && c > parseInt(s[a][b])) {
      console.log("CHEECH");
      up += 1;
      a--;
      if (a === -1) {
        up--;
        break;
      }
    }
    a = i + 1;
    // down
    while (s[a][b] && c > parseInt(s[a][b])) {
      down += 1;
      a++;
      if (a === s[i].length) {
        down--;
        break;
      }
    }
    a = i;
    b = j - 1;
    // left
    while (s[a][b] && c > parseInt(s[a][b])) {
      left += 1;
      b--;
      if (b === -1) {
        left--;
        break;
      }
    }
    // right
    b = j + 1;
    while (s[a][b] && c > parseInt(s[a][b])) {
      right += 1;
      b++;
      if (b === s[i].length) {
        right--;
        break;
      }
    }

    const total = left * right * up * down;
    if (total > 9000) {
      console.log(total);
    }
    if (total > largest) {
      largest = total;
    }
  }
}

console.log(largest);
