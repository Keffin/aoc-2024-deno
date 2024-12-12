const data = Deno.readTextFileSync("./data.txt");

function parse(): number[] {
  const lst: number[] = [];
  data
    .split(" ")
    .map((it) => parseInt(it))
    .map((elem) => lst.push(elem));
  return lst;
}

function largePush(src: number[], dst: number[]) {
  for (let i = 0; i < src.length; i++) {
    dst.push(src[i]);
  }
}

function part1(): number {
  const lst = parse();
  const newArr: number[] = [];
  let i = 0;
  while (i < 25) {
    for (const elem of lst) {
      if (elem === 0) {
        newArr.push(1);
      } else if (elem.toString().length % 2 === 0) {
        const elemToStr = elem.toString();
        const halfOne = elemToStr.slice(0, elemToStr.length / 2);
        const halfTwo = elemToStr.slice(elemToStr.length / 2, elemToStr.length);
        newArr.push(...[parseInt(halfOne), parseInt(halfTwo)]);
      } else {
        newArr.push(elem * 2024);
      }
    }
    lst.length = 0;
    largePush(newArr, lst);
    newArr.length = 0;
    i++;
  }
  return lst.length;
}

function part2(): number {
  const lst = parse();
  const cache = new Map<string, number>();

  function recCount(elem: number, numOfBlinks: number): number {
    const key = `${elem},${numOfBlinks}`;
    if (cache.has(key)) {
      return cache.get(key)!;
    }

    // Basfall
    if (numOfBlinks === 0) {
      return 1;
    }

    let count = 0;
    if (elem === 0) {
      count = recCount(1, numOfBlinks - 1);
    } else if (elem.toString().length % 2 === 0) {
      const elemStr = elem.toString();
      const halfOne = elemStr.slice(0, elemStr.length / 2);
      const halfTwo = elemStr.slice(elemStr.length / 2, elemStr.length);
      count = recCount(parseInt(halfOne), numOfBlinks - 1) +
        recCount(parseInt(halfTwo), numOfBlinks - 1);
    } else {
      count = recCount(elem * 2024, numOfBlinks - 1);
    }
    cache.set(key, count);
    return count;
  }

  return lst.reduce((acc, sum) => acc + recCount(sum, 75), 0);
}

console.log(part1());
console.log(part2());
