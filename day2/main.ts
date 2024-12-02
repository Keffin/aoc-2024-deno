const lines = Deno.readTextFileSync("./data.txt").split("\n");

function isSafeArr(arr: number[]): boolean {
  const isAscending = arr.every((item, idx) => {
    return idx === 0 || arr[idx - 1] <= item;
  });
  const isDescending = arr.every((item, idx) => {
    return idx === 0 || arr[idx - 1] >= item;
  });
  const isSorted = isAscending || isDescending;
  const isValidDiff = arr.every((item, idx) => {
    if (idx === arr.length - 1) {
      return true;
    }
    const next = arr[idx + 1];
    const diff = Math.abs(item - next);
    return diff >= 1 && diff <= 3;
  });
  return isSorted && isValidDiff;
}

export function part1(): number {
  let safeReports = 0;
  lines.forEach((line) => {
    const lst = line.split(" ").map((x) => parseInt(x));
    const isSafe = isSafeArr(lst);

    if (isSafe) {
      safeReports++;
    }
  });
  return safeReports;
}

export function part2() {
  let safeReports = 0;
  lines.forEach((line) => {
    const lst = line.split(" ").map((x) => parseInt(x));
    const isSafe = isSafeArr(lst);

    if (isSafe) {
      safeReports++;
      return;
    }
    const toleratedList = lst.some((_, idx) => {
      const modified = lst.filter((_, innerIdx) => innerIdx !== idx);
      return isSafeArr(modified);
    });

    if (toleratedList) {
      safeReports++;
    }
  });
  return safeReports;
}
