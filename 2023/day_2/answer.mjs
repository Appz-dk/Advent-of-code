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

// Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
// Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
// Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
// Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
// Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green

// only 12 red cubes, 13 green cubes, and 14 blue cubes

const maxCubes = {
  red: 12,
  green: 13,
  blue: 14,
}

function part1() {
  const input = getInput();

  const allGames = input.map(g => {
  
    const [gameNum, draws] = g.split(":")
    
    return draws.split(";").map(d => {
      const cubes = d.split(",")
      const isValidDraw = cubes.map(c => {
        const [num, color] = c.trim().split(" ")
        if (Number(num) <= maxCubes[color]) {
          return true
        }
        return false
      })

      return isValidDraw.every(d => d)
    })
  })


  const res = allGames.reduce((acc, cur, idx) => {
    if (cur.every(d => d)) {
      return acc += idx + 1
    }
    return acc
  }, 0)

  console.log("Part 1: ", res)
}


function part2() {
  const input = getInput();

  const allGames = input.map(g => {
    const gameData = {
      red: 0,
      green: 0,
      blue:0,
    }

    const [_, draws] = g.split(":")
    
    draws.split(";").forEach(d => {
      const cubes = d.split(",")
      cubes.forEach(c => {
        const [num, color] = c.trim().split(" ")
        if (!num) return

        if (gameData[color] === 0) {
          gameData[color] = Number(num)
        } else {
          if (gameData[color] < Number(num)) {
            gameData[color] = Number(num)
          }
        }
      })
    })
    return gameData
  })

  const res = allGames.reduce((acc, cur) => {
    return acc += cur.red * cur.green * cur.blue
  }, 0)

  console.log("Part 2: ", res)
}

part1();
console.time("part2");
part2(); // 1.965ms
console.timeEnd("part2");