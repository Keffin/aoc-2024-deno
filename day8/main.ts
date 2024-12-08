const lines = Deno.readTextFileSync("./data.txt").split("\n");
type Point = [number, number];

function buildMap(): Map<string, Point[]> {
  const map = new Map<string, Point[]>();
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[0].length; x++) {
      const curr = lines[y][x];
      if (curr === "." || curr === "#") continue;
      if (!map.has(curr)) {
        map.set(curr, []);
      }
      const mapCurr = map.get(curr);
      mapCurr?.push([y, x]);
      map.set(curr, mapCurr!);
    }
  }
  return map;
}

export function part1() {
  const map = buildMap();
  const unique = new Set<string>();
  for (const [_, P] of map.entries()) {
    for (let i = 0; i < P.length; i++) {
      for (let j = 0; j < P.length; j++) {
        if (i !== j) {
          const diffY = P[i][0] - P[j][0];
          const diffX = P[i][1] - P[j][1];
          const posY = P[i][0] - 2 * diffY;
          const posX = P[i][1] - 2 * diffX;

          if (
            posY >= 0 &&
            posY < lines.length &&
            posX >= 0 &&
            posX < lines[0].length
          ) {
            unique.add(`${posY},${posX}`);
          }
        }
      }
    }
  }
  return unique.size;
}

export function part2() {
  const map = buildMap();
  const unique = new Set<string>();
  for (const [_, P] of map.entries()) {
    for (let i = 0; i < P.length; i++) {
      for (let j = 0; j < P.length; j++) {
        if (i !== j) {
          const diffY = P[i][0] - P[j][0];
          const diffX = P[i][1] - P[j][1];

          let z = 1;
          let out = true;
          while (out) {
            const posY = P[i][0] - z * diffY;
            const posX = P[i][1] - z * diffX;
            if (
              posY >= 0 &&
              posY < lines.length &&
              posX >= 0 &&
              posX < lines[0].length
            ) {
              unique.add(`${posY},${posX}`);
            } else {
              out = false;
            }
            z++;
          }
        }
      }
    }
  }
  return unique.size;
}

console.log(part1());
console.log(part2());
