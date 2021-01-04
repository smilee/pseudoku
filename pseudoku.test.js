const { log } = console;

function generateRow() {
  const row = [1, 2, 3, 4];

  // shuffle array

  return row;
}

function generateRows(row) {
  const rows = new Array(4).fill(null).map(() => row.slice());

  return rows;
}

// p is an integer between (inclusive) 0-3
// shift row p elements to the left
function permuteRow(row, p) {
  if (p === 0) {
    return row;
  }

  for (let i = 1; i <= p; i += 1) {
    const temp = row.shift();
    row.push(temp);
  }

  return row;
}

function permuteRows(grid, x, y, z) {
  return [grid[0], permuteRow(grid[1], x), permuteRow(grid[2], y), permuteRow(grid[3], z)];
}

// Check pseudoku conditions

function linearSearch(array, item) {
  for (let i = 0; i < array.length; i += 1) {
    if (array[i] === item) {
      return true;
    }
  }
  return false;
}

function checkColumn(puzzle, j) {
  const temp = new Array(4).fill(null).map((item, i) => puzzle[i][j]);

  const check = [1, 2, 3, 4]
    .map((number) => linearSearch(temp, number))
    .reduce((prev, curr) => prev && curr);

  return check;
}

function checkColumns(puzzle) {
  return [
    checkColumn(puzzle, 0),
    checkColumn(puzzle, 1),
    checkColumn(puzzle, 2),
    checkColumn(puzzle, 3),
  ].reduce((prev, curr) => prev && curr);
}

function colsFromGrids(puzzle) {
  function getRow(i, g) {
    return Math.floor(i / 2) + Math.floor(g / 2) * 2;
  }
  function getCol(i, g) {
    return g % 2 === 1 ? (i % 2) + 2 : i % 2;
  }

  const grid = new Array(4).fill(null).map(() => []);

  for (let i = 0; i < 4; i += 1) {
    for (let j = 0; j < 4; j += 1) {
      const row = getRow(j, i);
      const col = getCol(j, i);

      grid[j][i] = puzzle[row][col];
    }
  }

  return grid;
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function permuteToMeetConditions(puzzle) {
  let temp = puzzle.slice();

  while (!(checkColumns(temp) && checkColumns(colsFromGrids(temp)))) {
    temp = permuteRows(
      puzzle,
      generateRandomNumber(0, 4),
      generateRandomNumber(0, 4),
      generateRandomNumber(0, 4),
    );
  }

  return temp;
}

function makeSolution(row) {
  const puzzle = generateRows(row);

  return permuteToMeetConditions(puzzle);
}

// The problem with this function is that it can try to empty a position previously emptied out.
function emptyCells(puzzle, n) { // n is the number of empty cells
  const unsolvedPuzzle = puzzle.slice();

  // Code added to solve duplicate problem
  function checkDuplicates({ row, col }) {
    return unsolvedPuzzle[row][col] === '';
  }

  function pickRandomCell() {
    const cell = {
      row: generateRandomNumber(0, 4),
      col: generateRandomNumber(0, 4),
    };

    return checkDuplicates(cell) ? pickRandomCell() : cell;
  }

  new Array(n).fill(null).map((c, i) => i).forEach(() => {
    const { row, col } = pickRandomCell();

    unsolvedPuzzle[row][col] = '';
  });

  log(unsolvedPuzzle);

  return unsolvedPuzzle;
}

describe('generateRow', () => {
  it('should have a length of 4', () => {
    expect(generateRow().length).toBe(4);
  });

  it('should have columns with a number from 1-4', () => {
    expect(generateRow()[0]).toBeGreaterThanOrEqual(1);
    expect(generateRow()[0]).toBeLessThanOrEqual(4);
  });

  it('should have a sum of 1+2+3+4', () => {
    expect(generateRow().reduce((p, c) => p + c)).toBe(10);
  });
});

describe('generateRows', () => {
  it('should have a length of 4', () => {
    expect(generateRows([1, 2, 3, 4]).length).toBe(4);
  });

  it('should return 4 copies of row', () => {
    expect(generateRows([1, 2, 3, 4]))
      .toEqual([[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]]);
  });
});

describe('permuteRow', () => {
  it('should return an array cyclically permuted by p elements to the left', () => {
    expect(permuteRow([1, 2, 3, 4], 1).length).toBe(4);
  });

  it('should return [4, 1, 2, 3] when given [1, 2, 3, 4]', () => {
    expect(permuteRow([1, 2, 3, 4], 1)).toEqual([2, 3, 4, 1]);
  });
});

describe('permuteRows', () => {
  it('should cyclically permute row2, row3, and row4 by x, y, and z', () => {
    expect(permuteRows([
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [1, 2, 3, 4],
    ], 1, 2, 3))
      .toEqual([[1, 2, 3, 4], [2, 3, 4, 1], [3, 4, 1, 2], [4, 1, 2, 3]]);
  });
});

describe('linearSearch', () => {
  it('', () => {});
});

describe('checkColumn', () => {
  it('should check to make sure all numbers from 1 to 4 are included in each column of the puzzle', () => {
    expect(checkColumn(
      [
        [1, 2, 3, 4],
        [2, 3, 4, 1],
        [3, 4, 1, 2],
        [4, 1, 2, 3],
      ], 1,
    )).toBe(true);

    expect(checkColumn(
      [
        [1, 2, 3, 4],
        [2, 3, 4, 1],
        [3, 1, 1, 2],
        [4, 1, 2, 3],
      ], 1,
    )).toBe(false);
  });
});

describe('checkColumns', () => {
  it('should check to make sure every column in the puzzle includes numbers 1 through 4', () => {
    expect(checkColumns([
      [1, 2, 3, 4],
      [2, 3, 4, 1],
      [3, 4, 1, 2],
      [4, 1, 2, 3],
    ])).toBe(true);

    expect(checkColumns([
      [1, 2, 3, 4],
      [2, 2, 4, 1],
      [3, 4, 1, 2],
      [4, 1, 2, 1],
    ])).toBe(false);
  });
});

describe('colsFromGrids', () => {
  it('should return an array of length 4', () => {
    expect(colsFromGrids([
      [1, 2, 3, 4],
      [2, 3, 4, 1],
      [3, 4, 1, 2],
      [4, 1, 2, 3],
    ]).length).toBe(4);
  });

  it('should return an array where numbers in each sub-grid is in a column', () => {
    expect(colsFromGrids([
      [1, 2, 3, 4],
      [2, 3, 4, 1],
      [3, 4, 1, 2],
      [4, 1, 2, 3],
    ])).toEqual([
      [1, 3, 3, 1],
      [2, 4, 4, 2],
      [2, 4, 4, 2],
      [3, 1, 1, 3],
    ]);
  });
});

describe('generateRandomNumber', () => {
  it('will return a number between min and max, inclusive', () => {
    expect(generateRandomNumber(0, 4)).toBeGreaterThanOrEqual(0);
    expect(generateRandomNumber(0, 4)).toBeLessThan(4);
  });
});

describe('makeSolution', () => {
  it('will return a puzzle satisfying all conditions for all columns', () => {
    expect(
      checkColumns(
        makeSolution([1, 2, 3, 4]),
      ) && checkColumns(
        colsFromGrids(makeSolution([1, 2, 3, 4])),
      ),
    ).toBe(true);
  });

  it('will return a puzzle satisfying all conditions for all subgrids', () => {
  });
});

describe('emptyCells', () => {
  it('should return a puzzle array of length 4', () => {
    expect(emptyCells(
      [
        [1, 2, 3, 4],
        [3, 4, 1, 2],
        [4, 1, 2, 3],
        [2, 3, 4, 1],
      ], 10,
    ).length).toEqual(4);
  });
});
