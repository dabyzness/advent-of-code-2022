// One Elf has the important job of loading all of the rucksacks with supplies for the jungle journey. Unfortunately, that Elf didn't quite follow the packing instructions, and so a few items now need to be rearranged.

// Each rucksack has two large compartments. All items of a given type are meant to go into exactly one of the two compartments. The Elf that did the packing failed to follow this rule for exactly one item type per rucksack.

// The Elves have made a list of all of the items currently in each rucksack (your puzzle input), but they need your help finding the errors. Every item type is identified by a single lowercase or uppercase letter (that is, a and A refer to different types of items).

// The list of items for each rucksack is given as characters all on a single line. A given rucksack always has the same number of items in each of its two compartments, so the first half of the characters represent items in the first compartment, while the second half of the characters represent items in the second compartment.

// For example, suppose you have the following list of contents from six rucksacks:

// vJrwpWtwJgWrhcsFMMfFFhFp
// jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
// PmmdzqPrVvPwwTWBwg
// wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
// ttgJtRGJQctTZtZT
// CrZsJsPPZsGzwwsLwLmpwMDw
// The first rucksack contains the items vJrwpWtwJgWrhcsFMMfFFhFp, which means its first compartment contains the items vJrwpWtwJgWr, while the second compartment contains the items hcsFMMfFFhFp. The only item type that appears in both compartments is lowercase p.
// The second rucksack's compartments contain jqHRNqRjqzjGDLGL and rsFMfFZSrLrFZsSL. The only item type that appears in both compartments is uppercase L.
// The third rucksack's compartments contain PmmdzqPrV and vPwwTWBwg; the only common item type is uppercase P.
// The fourth rucksack's compartments only share item type v.
// The fifth rucksack's compartments only share item type t.
// The sixth rucksack's compartments only share item type s.
// To help prioritize item rearrangement, every item type can be converted to a priority:

// Lowercase item types a through z have priorities 1 through 26.
// Uppercase item types A through Z have priorities 27 through 52.
// In the above example, the priority of the item type that appears in both compartments of each rucksack is 16 (p), 38 (L), 42 (P), 22 (v), 20 (t), and 19 (s); the sum of these is 157.

// Find the item type that appears in both compartments of each rucksack. What is the sum of the priorities of those item types?

import { input } from "./data.js";

// Part 1
function handleInput() {
  return input
    .split(`\n`)
    .map((e) => [e.slice(0, e.length / 2), e.slice(e.length / 2, e.length)]);
}

function findSharedChar(str1, str2) {
  for (let i = 0; i < str1.length; i += 1) {
    if (str2.includes(str1[i])) {
      return str1[i];
    }
  }
  return "";
}

let total = 0;
const inp = handleInput();
// A-Z = 65 - 90
// a-z = 97 - 122

inp.forEach((e) => {
  const sharedChar = findSharedChar(e[0], e[1]);

  total +=
    sharedChar === sharedChar.toUpperCase()
      ? sharedChar.charCodeAt(0) - 38
      : sharedChar.charCodeAt(0) - 96;
});

console.log(total);

// Part 2
function handleInput2() {
  return input.split(`\n`);
}

function findSharedChar2(str1, str2, str3) {
  for (let i = 0; i < str1.length; i += 1) {
    if (str2.includes(str1[i]) && str3.includes(str1[i])) {
      return str1[i];
    }
  }
  return "";
}

let total2 = 0;
const inp2 = handleInput2();

for (let i = 0; i < inp2.length; i += 3) {
  const sharedChar = findSharedChar2(inp2[i], inp2[i + 1], inp2[i + 2]);

  total2 +=
    sharedChar === sharedChar.toUpperCase()
      ? sharedChar.charCodeAt(0) - 38
      : sharedChar.charCodeAt(0) - 96;
}

console.log(total2);
