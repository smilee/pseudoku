const {
  sudoku,
  createGrid,
  updateGrid,
  getNumbers,
  getRow,
  getColumn,
  chunk,
  chunkGrid,
  getSection,
  getCandidates,
  getNeighbors,
  weighCandidates,
  checkConditions,
} = require('./sudoku');

describe('sudoku', () => {
  context('when the size is 4', () => {
    it('returns a sudoku of size 4 that passes sudoku conditions', () => {
      expect(checkConditions(sudoku(4))).toBe(true);
    });
  });

  context('when the size is 9', () => {
    it('returns a sudoku of size 9 that passes sudoku conditions', () => {
      expect(checkConditions(sudoku(9))).toBe(true);
    });
  });

  // A sudoku of size 16 takes too long to generate...
  // context('when the size is 16', () => {
  //   it('returns a sudoku of size 16 that passes sudoku conditions', () => {
  //     expect(checkConditions(sudoku(16))).toBe(true);
  //   });
  // });
});

describe('createGrid', () => {
  context('when the size of the puzzle is given', () => {
    it('returns a sudoku of given size filled with 0s', () => {
      expect(createGrid(4)).toEqual(
        [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
      );
    });
  });
});

describe('updateGrid', () => {
  context('when the grid, coordinates, and value are given', () => {
    it('returns an updated sudoku', () => {
      expect(updateGrid({
        grid: createGrid(4),
        coordinates: { row: 0, column: 0 },
        value: 1,
      })).toEqual(
        [
          [1, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
      );
    });
  });
});

describe('getNumbers', () => {
  context('when the grid is given', () => {
    const grid = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    it('returns an array of numbers that can be used in the puzzle', () => {
      expect(getNumbers(grid)).toEqual(
        [1, 2, 3, 4],
      );
    });
  });
});

describe('getRow', () => {
  const grid = [
    [0, 2, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  context('when given the grid and the coordinates', () => {
    it('returns row', () => {
      expect(getRow({ grid, coordinates: { row: 0, column: 0 } })).toEqual([0, 2, 0, 0]);
    });
  });
});

describe('getColumn', () => {
  const grid = [
    [0, 2, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  context('when given the grid and the coordinates', () => {
    it('returns column', () => {
      expect(getColumn({ grid, coordinates: { row: 1, column: 1 } })).toEqual([2, 0, 0, 0]);
    });
  });
});

describe('chunk', () => {
  context('when given an array and the number of chunks', () => {
    it('returns the chunked array', () => {
      expect(chunk({
        array: [1, 2, 3, 4],
        chunks: 2,
      })).toEqual([[1, 2], [3, 4]]);

      expect(chunk({
        array: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        chunks: 3,
      })).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    });
  });
});

describe('chunkGrid', () => {
  context('when given an array of arrays', () => {
    it('returns the chunked array', () => {
      expect(chunkGrid({
        grid: [
          [1, 2, 3, 4],
          [1, 2, 3, 4],
          [1, 2, 3, 4],
          [1, 2, 3, 4],
        ],
        chunks: 2,
      })).toEqual([
        [
          [[1, 2], [3, 4]],
          [[1, 2], [3, 4]],
        ],
        [
          [[1, 2], [3, 4]],
          [[1, 2], [3, 4]],
        ],
      ]);
      expect(chunkGrid({
        grid: [
          [1, 2, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        chunks: 2,
      })).toEqual([
        [
          [[1, 2], [0, 0]],
          [[0, 0], [0, 0]],
        ],
        [
          [[0, 0], [0, 0]],
          [[0, 0], [0, 0]],
        ],
      ]);
    });
  });
});

describe('getSection', () => {
  const grid = [
    [0, 2, 3, 4],
    [0, 0, 1, 2],
    [2, 3, 4, 1],
    [4, 1, 2, 3],
  ];

  context('when given the grid and the coordinates', () => {
    it('returns section', () => {
      expect(getSection({ grid, coordinates: { row: 0, column: 0 } })).toEqual([
        [0, 2],
        [0, 0],
      ]);
    });
  });
});

describe('getCandidates', () => {
  context('when given the grid and the cell location', () => {
    const grid = [
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    it('returns an array of candidates for the cell', () => {
      expect(getCandidates({ grid, coordinates: { row: 0, column: 0 } })).toEqual([2, 3, 4]);
    });
  });
});

describe('getNeighbors', () => {
  context('when given a 4x4 grid and the coordinates', () => {
    const grid = [
      [0, 2, 3, 4],
      [0, 0, 1, 2],
      [2, 3, 4, 1],
      [4, 1, 2, 3],
    ];

    it('returns neighboring cells', () => {
      expect(getNeighbors({ grid, coordinates: { row: 0, column: 0 } })).toEqual([1, 2, 3, 1]);
    });
  });

  context('when given a 9x9 grid and the coordinates', () => {
    const grid = [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [4, 5, 6, 1, 2, 3, 4, 5, 6],
      [7, 8, 9, 7, 8, 9, 1, 2, 3],
      [2, 1, 3, 5, 4, 7, 6, 9, 8],
      [5, 4, 7, 2, 1, 6, 3, 9, 8],
      [5, 4, 7, 2, 1, 6, 3, 9, 8],
      [5, 4, 7, 2, 1, 6, 3, 9, 8],
      [5, 4, 7, 2, 1, 6, 3, 9, 8],
      [5, 4, 7, 2, 1, 6, 3, 9, 8],
    ];

    it('returns neighboring cells', () => {
      expect(getNeighbors({
        grid,
        coordinates: { row: 0, column: 0 },
      })).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 1, 3, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7]);
    });
  });
});

describe('weighCandidates', () => {
  context('when given the grid and the coordinates', () => {
    const grid = [
      [0, 2, 3, 4],
      [0, 0, 1, 2],
      [2, 3, 4, 1],
      [4, 1, 2, 3],
    ];
    it('returns weighted candidates', () => {
      expect(weighCandidates({
        grid,
        coordinates: { row: 0, column: 0 },
      })).toEqual({ 2: [1], 0: [] });
    });
  });

  context('when given the grid and the coordinates', () => {
    const grid = [
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    it('returns weighted candidates', () => {
      expect(weighCandidates({
        grid,
        coordinates: { row: 0, column: 1 },
      })).toEqual({ 0: [2, 3, 4] });
    });
  });
});

describe('checkConditions', () => {
  const gridFalse = [
    [1, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  const gridTrue = [
    [1, 2, 3, 4],
    [3, 4, 2, 1],
    [2, 1, 4, 3],
    [4, 3, 1, 2],
  ];

  context('when given the grid', () => {
    it('checks whether conditions are met', () => {
      expect(checkConditions(gridFalse)).toBe(false);
      expect(checkConditions(gridTrue)).toBe(true);
    });
  });
});
