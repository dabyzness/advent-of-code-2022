// --- Day 2: Rock Paper Scissors ---
// The Elves begin to set up camp on the beach. To decide whose tent gets to be closest to the snack storage, a giant Rock Paper Scissors tournament is already in progress.

// Rock Paper Scissors is a game between two players. Each game contains many rounds; in each round, the players each simultaneously choose one of Rock, Paper, or Scissors using a hand shape. Then, a winner for that round is selected: Rock defeats Scissors, Scissors defeats Paper, and Paper defeats Rock. If both players choose the same shape, the round instead ends in a draw.

// Appreciative of your help yesterday, one Elf gives you an encrypted strategy guide (your puzzle input) that they say will be sure to help you win. "The first column is what your opponent is going to play: A for Rock, B for Paper, and C for Scissors. The second column--" Suddenly, the Elf is called away to help with someone's tent.

// The second column, you reason, must be what you should play in response: X for Rock, Y for Paper, and Z for Scissors. Winning every time would be suspicious, so the responses must have been carefully chosen.

// The winner of the whole tournament is the player with the highest score. Your total score is the sum of your scores for each round. The score for a single round is the score for the shape you selected (1 for Rock, 2 for Paper, and 3 for Scissors) plus the score for the outcome of the round (0 if you lost, 3 if the round was a draw, and 6 if you won).

// Since you can't be sure if the Elf is trying to help you or trick you, you should calculate the score you would get if you were to follow the strategy guide.

// For example, suppose you were given the following strategy guide:

// A Y
// B X
// C Z
// This strategy guide predicts and recommends the following:

// In the first round, your opponent will choose Rock (A), and you should choose Paper (Y). This ends in a win for you with a score of 8 (2 because you chose Paper + 6 because you won).
// In the second round, your opponent will choose Paper (B), and you should choose Rock (X). This ends in a loss for you with a score of 1 (1 + 0).
// The third round is a draw with both players choosing Scissors, giving you a score of 3 + 3 = 6.
// In this example, if you were to follow the strategy guide, you would get a total score of 15 (8 + 1 + 6).

// What would your total score be if everything goes exactly according to your strategy guide?

import { input } from "./data.js";

const p1 = {
  A: 1,
  B: 2,
  C: 3,
};
const p2 = {
  X: 1,
  Y: 2,
  Z: 3,
};
const score = {
  "-2": 6,
  "-1": 0,
  0: 3,
  1: 6,
  2: 0,
};

function handleInput() {
  return input.split("\n").map((el) => el.split(" "));
}

function handlePoints(input1, input2) {
  const diff = p1[input1] - p2[input2];

  const points1 = p1[input1] + score[diff.toString()];
  const points2 = p2[input2] + score[(diff * -1).toString()];

  return [points1, points2];
}

// Part 1
function game(inputArr) {
  let p1Points = 0,
    p2Points = 0;

  inputArr.forEach((el) => {
    const roundPoints = handlePoints(el[0], el[1]);
    p1Points += roundPoints[0];
    p2Points += roundPoints[1];
  });

  return [p1Points, p2Points];
}

// Part 2
// Manipulate to win!
function cheat(inputArr) {
  return inputArr.map((el) => {
    let changed = "";
    switch (el[1]) {
      case "X":
        changed = p1[el[0]] - 1 ? p1[el[0]] - 1 : 3;
        break;
      case "Y":
        changed = p1[el[0]];
        break;
      case "Z":
        changed = p1[el[0]] + 1 < 4 ? p1[el[0]] + 1 : 1;
        break;
    }

    let newMove = "";
    for (const key in p2) {
      if (p2[key] === changed) {
        newMove = key;
      }
    }

    return [el[0], newMove];
  });
}

console.log(game(cheat(handleInput())));
