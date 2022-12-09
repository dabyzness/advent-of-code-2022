// This rope bridge creaks as you walk along it. You aren't sure how old it is, or whether it can even support your weight.

// It seems to support the Elves just fine, though. The bridge spans a gorge which was carved out by the massive river far below you.

// You step carefully; as you do, the ropes stretch and twist. You decide to distract yourself by modeling rope physics; maybe you can even figure out where not to step.

// Consider a rope with a knot at each end; these knots mark the head and the tail of the rope. If the head moves far enough away from the tail, the tail is pulled toward the head.

// Due to nebulous reasoning involving Planck lengths, you should be able to model the positions of the knots on a two-dimensional grid. Then, by following a hypothetical series of motions (your puzzle input) for the head, you can determine how the tail will move.

// Due to the aforementioned Planck lengths, the rope must be quite short; in fact, the head (H) and tail (T) must always be touching (diagonally adjacent and even overlapping both count as touching):

// ....
// .TH.
// ....

// ....
// .H..
// ..T.
// ....

// ...
// .H. (H covers T)
// ...
// If the head is ever two steps directly up, down, left, or right from the tail, the tail must also move one step in that direction so it remains close enough:

// .....    .....    .....
// .TH.. -> .T.H. -> ..TH.
// .....    .....    .....

// ...    ...    ...
// .T.    .T.    ...
// .H. -> ... -> .T.
// ...    .H.    .H.
// ...    ...    ...
// Otherwise, if the head and tail aren't touching and aren't in the same row or column, the tail always moves one step diagonally to keep up:

// .....    .....    .....
// .....    ..H..    ..H..
// ..H.. -> ..... -> ..T..
// .T...    .T...    .....
// .....    .....    .....

// .....    .....    .....
// .....    .....    .....
// ..H.. -> ...H. -> ..TH.
// .T...    .T...    .....
// .....    .....    .....
// You just need to work out where the tail goes as the head follows a series of motions. Assume the head and the tail both start at the same position, overlapping.

// For example:

// R 4
// U 4
// L 3
// D 1
// R 4
// D 1
// L 5
// R 2
// This series of motions moves the head right four steps, then up four steps, then left three steps, then down one step, and so on. After each step, you'll need to update the position of the tail if the step means the head is no longer adjacent to the tail. Visually, these motions occur as follows (s marks the starting position as a reference point):

// == Initial State ==

// ......
// ......
// ......
// ......
// H.....  (H covers T, s)

// == R 4 ==

// ......
// ......
// ......
// ......
// TH....  (T covers s)

// ......
// ......
// ......
// ......
// sTH...

// ......
// ......
// ......
// ......
// s.TH..

// ......
// ......
// ......
// ......
// s..TH.

// == U 4 ==

// ......
// ......
// ......
// ....H.
// s..T..

// ......
// ......
// ....H.
// ....T.
// s.....

// ......
// ....H.
// ....T.
// ......
// s.....

// ....H.
// ....T.
// ......
// ......
// s.....

// == L 3 ==

// ...H..
// ....T.
// ......
// ......
// s.....

// ..HT..
// ......
// ......
// ......
// s.....

// .HT...
// ......
// ......
// ......
// s.....

// == D 1 ==

// ..T...
// .H....
// ......
// ......
// s.....

// == R 4 ==

// ..T...
// ..H...
// ......
// ......
// s.....

// ..T...
// ...H..
// ......
// ......
// s.....

// ......
// ...TH.
// ......
// ......
// s.....

// ......
// ....TH
// ......
// ......
// s.....

// == D 1 ==

// ......
// ....T.
// .....H
// ......
// s.....

// == L 5 ==

// ......
// ....T.
// ....H.
// ......
// s.....

// ......
// ....T.
// ...H..
// ......
// s.....

// ......
// ......
// ..HT..
// ......
// s.....

// ......
// ......
// .HT...
// ......
// s.....

// ......
// ......
// HT....
// ......
// s.....

// == R 2 ==

// ......
// ......
// .H....  (H covers T)
// ......
// s.....

// ......
// ......
// .TH...
// ......
// s.....
// After simulating the rope, you can count up all of the positions the tail visited at least once. In this diagram, s again marks the starting position (which the tail also visited) and # marks other positions the tail visited:

// ..##..
// ...##.
// .####.
// ....#.
// s###..
// So, there are 13 positions the tail visited at least once.

// Simulate your complete hypothetical series of motions. How many positions does the tail of the rope visit at least once?

import { input } from "./data.js";

function handleInput(inp) {
  return inp
    .split(`\n`)
    .map((e) => [e.split(" ")[0], parseInt(e.split(" ")[1])]);
}

class Node {
  constructor(x, y, prev, next) {
    this.x = x;
    this.y = y;
    this.prev = prev || null;
    this.next = next || null;
  }
}

function isAdjacent(head, tail) {
  if (Math.abs(head.x - tail.x) < 2 && Math.abs(head.y - tail.y) < 2) {
    return true;
  }

  return false;
}

function moveHead(head, /*next,*/ direction) {
  switch (direction) {
    case "U":
      head.y += 1;
      // if (!isAdjacent(head, tail)) {
      //   tail.x = head.x;
      //   tail.y = head.y - 1;
      // }
      break;
    case "D":
      head.y -= 1;
      // if (!isAdjacent(head, tail)) {
      //   tail.x = head.x;
      //   tail.y = head.y + 1;
      // }
      break;
    case "L":
      head.x -= 1;
      // if (!isAdjacent(head, tail)) {
      //   tail.x = head.x + 1;
      //   tail.y = head.y;
      // }
      break;
    case "R":
      head.x += 1;
      // if (!isAdjacent(head, tail)) {
      //   tail.x = head.x - 1;
      //   tail.y = head.y;
      // }
      break;
  }
}

// Part 1 -- uncomment && comment out part 2
// const inp = handleInput(input);
// const head = new Node(0, 0);
// const tail = new Node(0, 0);
// const visited = [[0, 0]];

// inp.forEach((e) => {
//   for (let i = 0; i < e[1]; i += 1) {
//     moveHead(head, tail, e[0]);

//     if (!visited.find((el) => el[0] === tail.x && el[1] === tail.y)) {
//       visited.push([tail.x, tail.y]);
//     }
//   }
// });

// console.log(visited.length);

const head = new Node(0, 0, null, null);
let tail = null;

let temp = head;

for (let i = 0; i < 9; i += 1) {
  const node = new Node(0, 0, temp, null);

  if (!temp.next) {
    temp.next = node;
  }

  temp = node;

  if (i === 8) {
    tail = node;
  }
}

const visited = [[0, 0]];

function moveNode(prev, curr) {
  if (isAdjacent(prev, curr)) {
    return;
  }

  const difX = prev.x - curr.x;
  const difY = prev.y - curr.y;

  if (Math.abs(difX) === 2 && Math.abs(difY) === 2) {
    curr.x += difX > 0 ? 1 : -1;
    curr.y += difY > 0 ? 1 : -1;
  }

  if (difX === 2 && difY > -2 && difY < 2) {
    curr.x = prev.x - 1;
    curr.y = prev.y;
  }

  if (difX === -2 && difY > -2 && difY < 2) {
    curr.x = prev.x + 1;
    curr.y = prev.y;
  }

  if (difY === -2 && difX > -2 && difX < 2) {
    curr.x = prev.x;
    curr.y = prev.y + 1;
  }

  if (difY === 2 && difX > -2 && difX < 2) {
    curr.x = prev.x;
    curr.y = prev.y - 1;
  }
}

const inp = handleInput(input);

inp.forEach((e) => {
  for (let i = 0; i < e[1]; i += 1) {
    moveHead(head, e[0]);

    let curr = head.next;

    while (curr) {
      moveNode(curr.prev, curr);

      curr = curr.next;
    }

    if (!visited.find((el) => el[0] === tail.x && el[1] === tail.y)) {
      visited.push([tail.x, tail.y]);
    }
  }
});

console.log(visited.length);
