const lines = Deno.readTextFileSync("./data.txt");
const myGrid: number[][] = lines
  .split("\n")
  .map((it) => it.split("").map((it) => parseInt(it)));
const dirs: [number, number][] = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

export function solution(part: "part1" | "part2"): number {
  let sum = 0;
  for (let i = 0; i < myGrid.length; i++) {
    for (let j = 0; j < myGrid[0].length; j++) {
      const curr = myGrid[i][j];
      if (curr === 0) {
        const lst: [number, number][] = [];
        if (part === "part1") {
          recPath(i, j, lst);
          const parsed = lst.map((it) => it.join(","));
          sum += [...new Set(parsed)].length;
        } else {
          recPath(i, j, lst);
          sum += lst.length;
        }
      }
    }
  }
  return sum;
}

function recPath(currI: number, currJ: number, lst: [number, number][]) {
  for (let i = 0; i < dirs.length; i++) {
    const nextI = currI + dirs[i][0];
    const nextJ = currJ + dirs[i][1];
    const nextPoint = myGrid[nextI]?.[nextJ];
    if (nextPoint === myGrid[currI][currJ] + 1) {
      if (nextPoint === 9) {
        lst.push([nextI, nextJ]);
      } else {
        recPath(nextI, nextJ, lst);
      }
    }
  }
}

console.log(solution("part1"));
console.log(solution("part2"));
