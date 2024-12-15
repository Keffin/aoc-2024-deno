const lines = Deno.readTextFileSync("./data.txt").split("\n");

const WIDTH = 101;
const HEIGHT = 103;

type Robot = {
  pos: [number, number];
  vel: [number, number];
};
function parse(): Robot[] {
  const robotPaths: Robot[] = [];
  lines.forEach((path) => {
    const itRob = path.split(" ");
    const pos = itRob[0]
      .split("=")[1]
      .split(",")
      .map((it) => parseInt(it));
    const vel = itRob[1]
      .split("=")[1]
      .split(",")
      .map((it) => parseInt(it));
    const robot: Robot = { pos: [pos[0], pos[1]], vel: [vel[0], vel[1]] };
    robotPaths.push(robot);
  });
  return robotPaths;
}

export function part1(width: number, height: number): number {
  const robots = parse();
  const excludeRow = Math.floor(height / 2);
  const excludeCol = Math.floor(width / 2);
  const midX = Math.ceil(width / 2);
  const midY = Math.ceil(height / 2);

  const quadrants = [0, 0, 0, 0];
  for (let i = 0; i < robots.length; i++) {
    const currRobot = robots[i];
    robots[i].pos[0] =
      (((currRobot.pos[0] + currRobot.vel[0] * 100) % width) + width) % width;
    robots[i].pos[1] =
      (((currRobot.pos[1] + currRobot.vel[1] * 100) % height) + height) %
      height;

    if (robots[i].pos[0] === excludeCol || robots[i].pos[1] === excludeRow) {
      continue;
    }

    const quad =
      Math.floor(robots[i].pos[0] / midX) +
      Math.floor(robots[i].pos[1] / midY) * 2;
    quadrants[quad]++;
  }
  return quadrants.reduce((product, factor) => product * factor, 1);
}

export async function part2(width: number, height: number) {
  const robots = parse();
  const encoder = new TextEncoder();
  let sec = 0;
  while (true) {
    sec++;
    const posSet = new Set<string>();
    for (let i = 0; i < robots.length; i++) {
      robots[i].pos[0] = (robots[i].pos[0] + robots[i].vel[0] + width) % width;
      robots[i].pos[1] =
        (robots[i].pos[1] + robots[i].vel[1] + height) % height;

      posSet.add(`${robots[i].pos[0]},${robots[i].pos[1]}`);
    }

    if (posSet.size === robots.length) {
      let strBuilder = "";
      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          strBuilder += posSet.has(`${x},${y}`) ? "#" : ".";
        }
        strBuilder += "\n";
      }
      const data = encoder.encode(sec + "\n" + strBuilder);
      await Deno.writeFile("./tree.txt", data, { append: true });
    }
  }
}

await part2(WIDTH, HEIGHT);
