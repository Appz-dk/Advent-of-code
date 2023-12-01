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

  const calories = []
  input.reduce((acc, cur, idx) => {
    if (cur === "" ) {
      calories.push(acc)
      return acc = 0
    } else if (idx === input.length - 1) {
      calories.push(acc + Number(cur))
    } else {
      return acc += Number(cur)
    }
  }, 0)

  const res = Math.max(...calories)
  console.log("Part 1 answer: ", res)
}

function part2() {
  const input = getInput();

  const calories = []
  input.reduce((acc, cur, idx) => {
    if (cur === "" ) {
      calories.push(acc)
      return acc = 0
    } else if (idx === input.length - 1) {
      calories.push(acc + Number(cur))
    } else {
      return acc += Number(cur)
    }
  }, 0)


  const res = calories.sort((a, b) => b - a).splice(0, 3).reduce((acc, cur) => acc += cur)
  console.log("Part 2 answer: ", res)
}

part1();

part2();