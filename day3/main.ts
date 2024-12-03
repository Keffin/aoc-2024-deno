const lines = Deno.readTextFileSync("./data.txt");

export function part1() {
  let sum = 0;
  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
  const matches = [...lines.matchAll(regex)];
  for (const match of matches) {
    sum += parseInt(match[1]) * parseInt(match[2]);
  }

  return sum;
}

export function part2() {
  const regex = /do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\)/g;
  const matches = [...lines.matchAll(regex)];
  let enabled = true;
  let sum = 0;

  for (const match of matches) {
    if (match[0] === "do()") {
      enabled = true;
    } else if (match[0] === "don't()") {
      enabled = false;
    } else if (enabled) {
      sum += parseInt(match[1]) * parseInt(match[2]);
    }
  }

  return sum;
}
