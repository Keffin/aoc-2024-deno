const lines = Deno.readTextFileSync("./data.txt");

function parseAndBuild(): number[][] {
  const listSection = lines.split("\n\n").map((it) => it.split("\n"));
  return listSection.map((it) => {
    const [aBtnX, aBtnY] = /Button A: X\+(\d+), Y\+(\d+)/
      .exec(it[0])!
      .slice(1)
      .map((it) => parseInt(it));
    const [bBtnX, bBtnY] = /Button B: X\+(\d+), Y\+(\d+)/
      .exec(it[1])!
      .slice(1)
      .map((it) => parseInt(it));
    const [prizeX, prizeY] = /Prize: X=(\d+), Y=(\d+)/
      .exec(it[2])!
      .slice(1)
      .map((it) => parseInt(it));
    return [aBtnX, aBtnY, bBtnX, bBtnY, prizeX, prizeY];
  });
}

export function solve(part: "part1" | "part2") {
  const parsed = parseAndBuild();
  function check(sections: number[][], offset: number): number {
    let count = 0;
    for (const [aBtnX, aBtnY, bBtnX, bBtnY, prizeX, prizeY] of sections) {
      const [x, y] = [offset + prizeX, offset + prizeY];
      const det = aBtnX * bBtnY - aBtnY * bBtnX;
      const detA = bBtnY * x - bBtnX * y;
      const detB = aBtnX * y - aBtnY * x;

      const fA = detA / det;
      const fB = detB / det;

      if (detA % det === 0 && detB % det === 0) {
        count += 3 * fA + fB;
      }
    }
    return count;
  }

  if (part === "part1") {
    return check(parsed, 0);
  } else {
    return check(parsed, 1e13);
  }
}

console.log(solve("part1"));
console.log(solve("part2"));
