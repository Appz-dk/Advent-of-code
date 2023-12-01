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
 

// Rock === 1 === A or X, gives + 1 score
// Paper === 2 === B or Y, gives + 2 score
// Scissors === 3 === C or Z, gives + 3 score

// Losing + 0 score
// Draw + 3 score
// win + 6 score

// 1 beats 3, 3 beats 2, 2 beats 1

const letterValuesPart1 = {
  A: 1,
  X: 1,
  B: 2,
  Y: 2,
  C: 3,
  Z: 3,
}

const win = 6
const draw = 3


function part1() {
  const input = getInput();

  const score = input.reduce((acc, cur) => {
    const [NPC, Player] = cur.split(" ").map(v => letterValuesPart1[v])

    const isALoss = (NPC === 1 && Player === 3) || (NPC === 2 && Player === 1) || (NPC === 3 && Player === 2)

    if (NPC === Player) {
      return acc += Player + draw
    }
    else if (isALoss) {
      return acc += Player 
    } else {
      return acc += Player + win
    }
  }, 0)
  
  console.log("Answer is: ", score)
}

// X === Lose
// Y === Draw
// Z === win

// Rock -> A or X -> + 1 score
// Paper -> B or Y -> + 2 score
// Scissors -> C or Z -> + 3 score

// 1 beats 3, 3 beats 2, 2 beats 1

const letterValuesPart2 = {
  A: {
    draw: 1,
    lose: 3,
    win: 2,
  },
  X: {
    reward: 0,
    action: "lose"
  },
  B: {
    draw: 2,
    lose: 1,
    win: 3
  },
  Y: {
    reward: 3,
    action: "draw"
  },
  C: {
    draw: 3,
    lose: 2,
    win: 1
  },
  Z: {
    reward: 6,
    action: "win"
  },
}

function part2() {
  const input = getInput();
  
  const score = input.reduce((acc, cur) => {
    const [NPC, player] = cur.split(" ")
    const instruction = letterValuesPart2[player].action // win, lose or draw
    const reward = letterValuesPart2[player].reward

    return acc += letterValuesPart2[NPC][instruction] + reward
  }, 0)
  
  console.log("Answer is: ", score)
}

part1();
part2();