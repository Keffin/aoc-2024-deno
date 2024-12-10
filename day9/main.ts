const line = Deno.readTextFileSync("./data.txt");

function parseBlocks(): string[] {
  const blocks: string[] = [];

  let blockIdNumber = 0;
  for (const [idx, item] of line.split("").entries()) {
    if (idx % 2 === 0) {
      const toPush = Array.from({ length: parseInt(item) }, () =>
        blockIdNumber.toString()
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
  for (let right = blocks.length - 1; right > 0; ) {
    while (blocks[right] === ".") {
      right--;
    }

    const rightStart = right;
    while (blocks[rightStart] === blocks[right] && right > 0) {
      right--;
    }
    inner: for (let left = 0; left < right + 1; ) {
      while (blocks[left] !== ".") {
        left++;
      }
      const leftStart = left;
      while (blocks[left] === "." && left < right + 1) {
        left++;
      }

      const freeSpace = left - leftStart;
      const blockSize = rightStart - right;
      if (freeSpace >= blockSize) {
        blocks.fill(blocks[rightStart], leftStart, leftStart + blockSize);
        blocks.fill(".", right + 1, rightStart + 1);
        break inner;
      }
    }
  }

  let sum = 0;
  for (const [idx, item] of blocks.entries()) {
    if (item !== ".") {
      sum += idx * parseInt(item);
    }
  }
  return sum;
}
console.log(part2());
