import { readFileSync } from "node:fs";

const example = "example.txt"
const input = "input.txt"

const lines = readFileSync(input, { encoding: "utf-8" }) // read of input or example content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim() // Remove starting/ending whitespace
  .split("\n"); // Split on newline

// Return a new object to avoid side effects between part 1 and 2
function getInput() {
  return [...lines];
}

function part1() {
  const input = getInput();
  //do something here
}

function part2() {
  const input = getInput();
  //do something here
}

part1();
// part2();