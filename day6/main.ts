const lines = Deno.readTextFileSync("./data.txt");

const OBSTRUCTION = "#";

type Position = {
  visited: boolean;
  value: string;
  x: number;
  y: number;
};

enum Direction {
  UP = "^",
  DOWN = "v",
  RIGHT = ">",
  LEFT = "<",
}

function findStartingPoint(
  grid: Position[][],
  char: string
): { x: number; y: number } {
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      if (grid[x][y].value === char) {
        return { x, y };
      }
    }
  }
  return { x: 0, y: 0 };
}

function getNextPosition(
  grid: Position[][],
  current: { x: number; y: number },
  dir: Direction
) {
  const { x, y } = current;
  let newX = x;
  let newY = y;
  switch (dir) {
    case Direction.UP:
      newX--;
      break;
    case Direction.DOWN:
      newX++;
      break;
    case Direction.RIGHT:
      newY++;
      break;
    case Direction.LEFT:
      newY--;
      break;
  }

  // Check if out of bounds
  if (newX < 0 || newX >= grid.length || newY < 0 || newY >= grid[0].length) {
    return { x, y, outOfBounds: true };
  }

  return { x: newX, y: newY, outOfBounds: false };
}

function turnRight(dir: Direction): Direction {
  switch (dir) {
    case Direction.UP:
      return Direction.RIGHT;
    case Direction.RIGHT:
      return Direction.DOWN;
    case Direction.DOWN:
      return Direction.LEFT;
    case Direction.LEFT:
      return Direction.UP;
  }
}

function moveCharacter(
  grid: Position[][],
  current: { x: number; y: number },
  dir: Direction
): { x: number; y: number; dir: Direction; outOfBounds: boolean } {
  let next = getNextPosition(grid, current, dir);

  while (grid[next.x][next.y].value === OBSTRUCTION) {
    dir = turnRight(dir);
    next = moveCharacter(grid, current, dir);
  }

  grid[next.x][next.y].visited = true;
  return { x: next.x, y: next.y, dir: dir, outOfBounds: next.outOfBounds };
}

export function part1() {
  const rows = lines.trim().split("\n");
  const grid: string[][] = rows.map((row) => row.split(""));
  const myGrid: Position[][] = grid.map((row, x) => {
    return row.map((char, y) => ({
      visited: false,
      value: char,
      x,
      y,
    }));
  });

  const { x, y } = findStartingPoint(myGrid, "^");
  let current = { x, y };
  myGrid[x][y].visited = true;
  let direction = Direction.UP;
  let itMov = true;
  while (itMov) {
    // move character

    const moved = moveCharacter(myGrid, current, direction);
    current = { x: moved.x, y: moved.y };
    direction = moved.dir;
    if (moved.outOfBounds) {
      itMov = false;
    }
  }

  let count = 0;
  for (let x = 0; x < myGrid.length; x++) {
    for (let y = 0; y < myGrid[x].length; y++) {
      if (myGrid[x][y].visited) {
        count++;
      }
    }
  }
  return count;
}

console.log(part1());
