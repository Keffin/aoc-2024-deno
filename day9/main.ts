const line = Deno.readTextFileSync("./data.txt");

function parseBlocks(): string[] {
  const blocks: string[] = [];

  let blockIdNumber = 0;
  for (const [idx, item] of line.split("").entries()) {
    if (idx % 2 === 0) {
      const toPush = Array.from(
        { length: parseInt(item) },
        () => blockIdNumber.toString(),
      );
      blocks.push(...toPush);
      blockIdNumber++;
    } else {
      const toPush = Array.from({ length: parseInt(item) }, () => ".");
      blocks.push(...toPush);
    }
  }
  return blocks;
}

export function part1(): number {
  // Parsing is valid checked against example input
  const blocks = parseBlocks();

  for (let i = blocks.length - 1; i >= 0; i--) {
    if (blocks[i] === ".") continue;
    for (let j = 0; j < blocks.length; j++) {
      if (blocks[j] === ".") {
        const oldI = blocks[i];
        const oldJ = blocks[j];

        blocks[j] = oldI;
        blocks[i] = oldJ;
      }
    }
  }
  const offByOne = blocks.shift();
  blocks.push(offByOne!);

  let sum = 0;
  for (const [idx, item] of blocks.entries()) {
    if (item !== ".") {
      sum += idx * parseInt(item);
    }
  }
  return sum;
}

export function part2(): number {
  const blocks = parseBlocks();
  const map = new Map<string, number>();
  for (let i = 0; i < blocks.length; i++) {
    const curr = blocks[i];
    if (curr !== ".") {
      map.set(curr, map.get(curr)! + 1 || 1);
    }
  }
  let start = 0;
  let end = 0;

  for (let i = blocks.length - 1; i >= 0; i--) {
    for (let j = 0; j < blocks.length; j++) {
      const current = blocks[j];
      let room = 0;
      const startIdx = j;
      if (current === ".") {
        while (j < blocks.length && blocks[j] === ".") {
          room++;
          j++;
        }
        start = startIdx;
        end = j - 1;

        const numOfOccurences = map.get(blocks[i]);
        if (numOfOccurences! < room) {
          for (let x = start; x < start + numOfOccurences!; x++) {
            const toAdd = blocks[i];
            blocks[i] = ".";
            blocks.splice(
              x,
              numOfOccurences!,
              ...Array(numOfOccurences).fill(toAdd),
            );
          }
        }
      }
    }
  }

  console.log(blocks.join(""));
  return 2;
}
console.log(part2());
