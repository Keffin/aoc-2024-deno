const lines = Deno.readTextFileSync("./data.txt").trim().split("\n");

const getMid = (lst: number[]): number => lst[Math.floor(lst.length / 2)];

function parseInput() {
  const pageOrd: string[] = [];
  const pageNum: string[] = [];
  lines.forEach((line) => {
    if (line.includes("|")) {
      pageOrd.push(line);
    } else if (line.includes(",")) {
      pageNum.push(line);
    }
  });
  return { pageOrd, pageNum };
}

export function part1(): number {
  const { pageOrd, pageNum }: { pageOrd: string[]; pageNum: string[] } =
    parseInput();

  const pageOrdX = pageOrd.map((it) =>
    it
      .trim()
      .split("|")
      .map((it) => parseInt(it))
  );

  const validateOrder = (update: number[]): boolean => {
    for (const [before, after] of pageOrdX) {
      const beforeIdx = update.indexOf(before);
      const afterIdx = update.indexOf(after);

      if (beforeIdx > afterIdx && beforeIdx !== -1 && afterIdx !== -1) {
        return false;
      }
    }
    return true;
  };

  const midPages: number[] = [];
  for (const updates of pageNum) {
    const update = updates.split(",").map((it) => parseInt(it));
    if (validateOrder(update)) {
      const mid = getMid(update);
      midPages.push(mid);
    }
  }

  return midPages.reduce((acc, item) => acc + item, 0);
}

const reOrder = (update: number[], rules: number[][]): number[] => {
  const rMapNested = new Map<number, Set<number>>();
  for (const [before, after] of rules) {
    if (!rMapNested.has(after)) {
      rMapNested.set(after, new Set());
    }
    rMapNested.get(after)!.add(before);
  }

  return update.slice().sort((a, b) => {
    // a should come after b
    if (rMapNested.get(a)?.has(b)) {
      return 1;
    }
    // b after a
    if (rMapNested.get(b)?.has(a)) {
      return -1;
    }

    return 0;
  });
};

const parseInputPart2 = () => {
  const [pageOrd, pageNum] = lines.join("\n").split("\n\n");
  const rules = pageOrd
    .split("\n")
    .map((line) => line.split("|").map((it) => parseInt(it)));
  const updates = pageNum
    .split("\n")
    .map((line) => line.split(",").map((it) => parseInt(it)));
  return { rules, updates };
};

const validateOrderPart2 = (update: number[], rules: number[][]): boolean => {
  for (const [before, after] of rules) {
    const beforeIdx = update.indexOf(before);
    const afterIdx = update.indexOf(after);

    if (beforeIdx > afterIdx && beforeIdx !== -1 && afterIdx !== -1) {
      return false;
    }
  }
  return true;
};

export function part2(): number {
  const { rules, updates }: { rules: number[][]; updates: number[][] } =
    parseInputPart2();

  let sum = 0;
  for (const update of updates) {
    if (!validateOrderPart2(update, rules)) {
      const reOrdered = reOrder(update, rules);
      const mid = getMid(reOrdered);
      sum += mid;
    }
  }
  return sum;
}
