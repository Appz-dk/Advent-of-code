import { readFileSync } from "node:fs";

const example = "example.txt"
const input = "input.txt"

const lines = readFileSync(input, { encoding: "utf-8" }) // read of input or example content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim() // Remove starting/ending whitespace
  .split("\n"); // Split on newline

// Return a new copy to avoid side effects between part 1 and 2
function getInput() {
  return [...lines];
}

const checkSymbolDiagonal = (lines, curIdx, numStart, numEnd) => {
  let linesToCheck
  if (curIdx === 0) {
    linesToCheck = [lines[curIdx + 1]]
  } else if (curIdx === lines.length - 1) {
    linesToCheck = [lines[curIdx - 1]]
  } else {
    linesToCheck = [lines[curIdx + 1], lines[curIdx - 1]]
  }

  const res = linesToCheck.map((l) => {
    return l.split("").some((char, idx) => {
      if (numStart - 1 > idx || numEnd + 1 < idx) {
        return false
      } else if (char.match(/[^\.\d]/)) {
        return true
      } else {
        return false
      }
    })
  })
  
  return res.some(r => r)
}



function part1() {
  const input = getInput();
  const lineLen = input[0].length
  // Have to add '\w' to deal with test on 'undefined'
  // Or would have to make sure line[numStart - 1] is not undefined
  const isSymbol = /[^\.\d\w]/

  const allNumbers = input.map((line, idx, arr) => {
    const numbers = []
    let num = ""
    let numStart = 0
    let pos = 0
    for (let char of line) {
      if (char.match(/\d/)) {
        if (!num) numStart = pos;
        num += char
      // } else if (num && (char.match(/[^\.\d]/) || line[numStart - 1]?.match(/[^\.\d]/))) {
      } else if (num && (isSymbol.test(char) || isSymbol.test(line[numStart - 1]))) {
        numbers.push(Number(num))
        num = ""
      } else if (num && checkSymbolDiagonal(lines, idx, numStart, pos - 1)){
        numbers.push(Number(num))
        num = ""
      } else {
        num = ""
      }

      pos++

      // Incase last digit of the line was a number have to check if it also needs to be added
      if (pos === lineLen && num && isSymbol.test(line[numStart - 1])) {
        console.log(idx, ": ", num)
        numbers.push(Number(num))
        num = ""
      }

    }

    return numbers
  })
  
  const res = allNumbers.flat().reduce((acc, cur) => {
    return acc += cur
  },0)
  console.log("Part 1: ", res)
}


function part2() {
  const input = getInput();

  // Find all stars -> check if a star touches 2 different nums.

  // console.log("Part 2: ", res)
}

part1();
// console.time("part2");
// part2(); // 1.965ms
// console.timeEnd("part2");