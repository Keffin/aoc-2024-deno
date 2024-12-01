const lines = Deno.readTextFileSync("./data.txt").split("\n");
export function part1(): number {
  const leftLst: number[] = [];
  const rightLst: number[] = [];
  lines.forEach((line) => {
    const [num1, num2] = line.split("  ");
    leftLst.push(parseInt(num1));
    rightLst.push(parseInt(num2));
  });
  leftLst.sort((a, b) => a - b);
  rightLst.sort((a, b) => a - b);
  return leftLst.reduce(
    (acc, item, idx) => acc + Math.abs(rightLst[idx] - item),
    0
  );
}

export function part2(): number {
  const freqMap: Map<number, number> = new Map();
  const leftLst: number[] = [];
  const rightLst: number[] = [];

  lines.forEach((line) => {
    const [num1, num2] = line.split("  ");
    leftLst.push(parseInt(num1));
    rightLst.push(parseInt(num2));
  });
  // Create frequency map on right list
  rightLst.forEach((item) => {
    const count = freqMap.get(item) || 0;
    freqMap.set(item, count + 1);
  });

  return leftLst.reduce((acc, item) => {
    const count = freqMap.get(item) || 0;
    return acc + item * count;
  }, 0);
}
