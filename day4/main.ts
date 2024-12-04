const lines = Deno.readTextFileSync("./data.txt").split("\n");

const dirs: [number, number][] = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1],
];

function checkWord(
  row: number,
  col: number,
  dir: [number, number],
  word: string = "XMAS"
): boolean {
  const rows = lines.length;
  const cols = lines[0].length;
  for (let i = 0; i < word.length; i++) {
    const newRow = row + dir[0] * i;
    const newCol = col + dir[1] * i;
    // Check bounds against grid dimensions
    const inBound = (newRow: number, newCol: number): boolean => {
      return newRow < 0 || newCol < 0 || newRow >= rows || newCol >= cols;
    };
    if (inBound(newRow, newCol) || lines[newRow][newCol] !== word[i]) {
      return false;
    }
  }
  return true;
}

export function part1(): number {
  let count = 0;
  for (let row = 0; row < lines.length; row++) {
    for (let col = 0; col < lines[row].length; col++) {
      const point = lines[row][col];
      if (point === "X") {
        for (const dir of dirs) {
          if (checkWord(row, col, dir)) {
            count++;
          }
        }
      }
    }
  }

  return count;
}

function checkPair(elem1: string, elem2: string): boolean {
  return (elem1 === "M" && elem2 === "S") || (elem1 === "S" && elem2 === "M");
}

export function part2(): number {
  let count = 0;
  const rows = lines.length;
  const cols = lines[0].length;

  for (let row = 1; row < rows - 1; row++) {
    for (let col = 1; col < cols - 1; col++) {
      const point = lines[row][col];
      if (point === "A") {
        const mainDiag = checkPair(
          lines[row - 1][col - 1],
          lines[row + 1][col + 1]
        );
        const antiDiag = checkPair(
          lines[row - 1][col + 1],
          lines[row + 1][col - 1]
        );

        if (mainDiag && antiDiag) {
          count++;
        }
      }
    }
  }
  return count;
}
