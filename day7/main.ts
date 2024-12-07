const lines = Deno.readTextFileSync("./data.txt").split("\n");

function canReachRecursive(
  numberLst: number[],
  current: number,
  sum: number,
  part: "part1" | "part2"
): boolean {
  if (numberLst.length === 0) {
    return current === sum;
  }
  const next = numberLst[0];
  const rest = numberLst.slice(1);

  if (part === "part1") {
    return (
      canReachRecursive(rest, current + next, sum, part) ||
      canReachRecursive(rest, current * next, sum, part)
    );
  } else {
    const concatenated = parseInt(`${current}${next}`);
    return (
      canReachRecursive(rest, current + next, sum, part) ||
      canReachRecursive(rest, current * next, sum, part) ||
      canReachRecursive(rest, concatenated, sum, part)
    );
  }
}
export function part1(): number {
  let count = 0;
  lines.forEach((line) => {
    const [sum, nums] = line.split(":");
    const numbersParsed = nums
      .trimStart()
      .split(" ")
      .map((num) => parseInt(num));

    if (
      canReachRecursive(
        numbersParsed.slice(1),
        numbersParsed[0],
        parseInt(sum),
        "part1"
      )
    ) {
      count += parseInt(sum);
    }
  });
  return count;
}

export function part2(): number {
  let count = 0;
  lines.forEach((line) => {
    const [sum, nums] = line.split(":");
    const numbersParsed = nums
      .trimStart()
      .split(" ")
      .map((num) => parseInt(num));

    if (
      canReachRecursive(
        numbersParsed.slice(1),
        numbersParsed[0],
        parseInt(sum),
        "part2"
      )
    ) {
      count += parseInt(sum);
    }
  });
  return count;
}
