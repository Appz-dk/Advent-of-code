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

function part1() {
  const input = getInput();
  const digits = []

  input.map(s => {
    const firstDigit = s.split("").find(v => !isNaN(Number(v)))
    const lastDigit = [...s].reverse().find(v => !isNaN(Number(v)))

    digits.push(firstDigit + lastDigit)
  })

  const res = digits.reduce((acc, cur) => {
    return acc += Number(cur)
  }, 0)

  console.log("Part 1: ", res)
}


const spelledNums = {
  o: ["one"],
  t: ["two", "three"],
  f: ["four", "five"],
  s: ["six", "seven"],
  e: ["eight"],
  n: ["nine"]
}

const spelledToDigit = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9"
}

function part2() {
  const input = getInput();
  const digits = []

  input.forEach(str => {
    const spelledKeys = Object.keys(spelledNums)
    let firstDigit
    let lastDigit

    for (let i = 0; i < str.length; i++) {
      // Check if we find a number digit (firstDigit will only be updated once, while lastDigit will be updated til end of loop)
      if (!isNaN(Number(str[i])) && !firstDigit) {
        firstDigit = str[i]
      } 
      
      if (!isNaN(Number(str[i]))) {
        lastDigit = str[i]
      }

      // Check if current char is part of a spelled number
      if (spelledKeys.includes(str[i])) {
        const key = str[i]
        let spelledNum = str[i]
        // Use inner loop to see if we have a spelled number
        for (let j = i + 1; j < str.length; j++) {
          // Add next char to spelledNum
          spelledNum += str[j]
          // Check if we are not spelling a number
          const validNum = spelledNums[key].some(numStr => numStr.startsWith(spelledNum))
          if (!validNum) {
            break
          }

          // Check if we find a spelled digit (firstDigit will only be updated once, while lastDigit will be updated til end of loop)
          const validSpelledNumber = spelledNums[key].find(numStr => numStr === spelledNum)
          if (validSpelledNumber && !firstDigit) {
            firstDigit = spelledToDigit[validSpelledNumber]
          } else if (validSpelledNumber) {
            lastDigit = spelledToDigit[validSpelledNumber]
          }
        }
      }
    }
    // At the end we concat the 2 string digits and push them to the digits array
    digits.push(firstDigit + lastDigit)
  })

  const res = digits.reduce((acc, cur) => {
    return acc += Number(cur)
  }, 0)

  console.log("part 2: ", res)
}

part1();
part2();