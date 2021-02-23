const {
  generateSudoku,
  solveSudoku,
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
  getGreatestWeights,
  checkConditions,
  generatePuzzle,
  generateRandomInteger,
} = require('./sudoku');

describe('generateSudoku', () => {
  context('when the size is 4', () => {
    it('returns a sudoku of size 4 that passes sudoku conditions', () => {
      expect(checkConditions(generateSudoku(4))).toBe(true);
    });
  });

  context('when the size is 9', () => {
    it('returns a sudoku of size 9 that passes sudoku conditions', () => {
      expect(checkConditions(generateSudoku(9))).toBe(true);
    });
  });

  // A sudoku of size 16 takes too long to generate...
  // context('when the size is 16', () => {
  //   it('returns a sudoku of size 16 that passes sudoku conditions', () => {
  //     expect(checkConditions(generateSudoku(16))).toBe(true);
  //   });
  // });
});

describe('solveSudoku', () => {
  context('when a sudoku puzzle is given', () => {
    // it('returns the solved sudoku', () => {
    //   const sudoku = [
    //     [0, 0, 5, 3, 0, 0, 0, 0, 0],
    //     [8, 0, 0, 0, 0, 0, 0, 2, 0],
    //     [0, 7, 0, 0, 1, 0, 5, 0, 0],
    //     [4, 0, 0, 0, 0, 5, 3, 0, 0],
    //     [0, 1, 0, 0, 7, 0, 0, 0, 6],
    //     [0, 0, 3, 2, 0, 0, 0, 8, 0],
    //     [0, 6, 0, 5, 0, 0, 0, 0, 9],
    //     [0, 0, 4, 0, 0, 0, 0, 3, 0],
    //     [0, 0, 0, 0, 0, 9, 7, 0, 0],
    //   ];

    //   expect(solveSudoku(sudoku)).toEqual([
    //     'something',
    //   ]);
    // });

    // it('returns the solved sudoku', () => {
    //   const sudoku = [
    //     [0, 0, 4, 0, 0, 0, 0, 6, 7],
    //     [3, 0, 0, 4, 7, 0, 0, 0, 5],
    //     [1, 5, 0, 8, 2, 0, 0, 0, 3],
    //     [0, 0, 6, 0, 0, 0, 0, 3, 1],
    //     [8, 0, 2, 1, 0, 5, 6, 0, 4],
    //     [4, 1, 0, 0, 0, 0, 9, 0, 0],
    //     [7, 0, 0, 0, 8, 0, 0, 4, 6],
    //     [6, 0, 0, 0, 1, 2, 0, 0, 0],
    //     [9, 3, 0, 0, 0, 0, 7, 1, 0],
    //   ];

    // expect(solveSudoku(sudoku)).toEqual([
    //   [2, 8, 4, 5, 9, 3, 1, 6, 7],
    //   [3, 6, 9, 4, 7, 1, 8, 2, 5],
    //   [1, 5, 7, 8, 2, 6, 4, 9, 3],
    //   [5, 7, 6, 9, 4, 8, 2, 3, 1],
    //   [8, 9, 2, 1, 3, 5, 6, 7, 4],
    //   [4, 1, 3, 2, 6, 7, 9, 5, 8],
    //   [7, 2, 1, 3, 8, 9, 5, 4, 6],
    //   [6, 4, 5, 7, 1, 2, 3, 8, 9],
    //   [9, 3, 8, 6, 5, 4, 7, 1, 2],
    // ]);
    // });

    it('returns the solved sudoku', () => {
      const sudoku = [
        [0, 3, 4, 0],
        [4, 0, 0, 2],
        [1, 0, 0, 3],
        [0, 2, 1, 0],
      ];

      expect(solveSudoku(sudoku)).toEqual([
        [2, 3, 4, 1],
        [4, 1, 3, 2],
        [1, 4, 2, 3],
        [3, 2, 1, 4],
      ]);
    });

    it('returns the solved sudoku', () => {
      const sudoku = [
        [0, 0, 1, 0],
        [4, 0, 0, 0],
        [0, 0, 0, 2],
        [0, 3, 0, 0],
      ];

      expect(solveSudoku(sudoku)).toEqual([
        [3, 2, 1, 4],
        [4, 1, 2, 3],
        [1, 4, 3, 2],
        [2, 3, 4, 1],
      ]);
    });
  });
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

  context('when given a 4x4 grid and the coordinates', () => {
    const grid = [
      [0, 2, 3, 4],
      [0, 0, 1, 2],
      [2, 3, 4, 1],
      [4, 1, 2, 3],
    ];

    it('returns neighboring cells', () => {
      expect(getNeighbors({ grid, coordinates: { row: 2, column: 2 } })).toEqual([4, 1, 4, 2]);
    });
  });

  context('when given a 4x4 grid and the coordinates', () => {
    const grid = [
      [0, 3, 4, 0],
      [4, 0, 0, 2],
      [1, 0, 0, 3],
      [0, 2, 1, 0],
    ];

    it('returns neighboring cells', () => {
      expect(getNeighbors({ grid, coordinates: { row: 2, column: 1 } })).toEqual([1, 0, 0, 4]);
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
    it('returns weighed candidates', () => {
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
    it('returns weighed candidates', () => {
      expect(weighCandidates({
        grid,
        coordinates: { row: 0, column: 1 },
      })).toEqual({ 0: [2, 3, 4] });
    });
  });

  context('when given the grid and the coordinates', () => {
    const grid = [
      [0, 3, 4, 0],
      [4, 0, 0, 2],
      [1, 0, 0, 3],
      [0, 2, 1, 0],
    ];
    it('returns weighed candidates', () => {
      expect(weighCandidates({
        grid,
        coordinates: { row: 2, column: 1 },
      })).toEqual({ 1: [4], 0: [] });
    });
  });
});

describe('getGreatestWeights', () => {
  const sudoku = [
    [0, 3, 4, 0],
    [4, 0, 0, 2],
    [1, 0, 0, 3],
    [0, 2, 1, 0],
  ];

  context('when a sudoku is given', () => {
    it('returns a grid of greatest weights', () => {
      expect(getGreatestWeights(sudoku)).toEqual({
        2: [
          { row: 0, column: 0 },
          { row: 1, column: 2 },
          { row: 2, column: 2 },
          { row: 3, column: 0 },
        ],
        1: [
          { row: 0, column: 3 },
          { row: 1, column: 1 },
          { row: 2, column: 1 },
          { row: 3, column: 3 },
        ],
      });
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

describe('generateRandomInteger', () => {
  context('when the min and the max values are given', () => {
    it('generates a random integer between min and max', () => {
      expect(generateRandomInteger(0, 81)).toBeGreaterThanOrEqual(0);
      expect(generateRandomInteger(0, 81)).toBeLessThanOrEqual(81);
    });
  });
});

describe('generatePuzzle', () => {
  context('when a solved sudoku is given', () => {
    const sudoku = [
      [2, 8, 4, 5, 9, 3, 1, 6, 7],
      [3, 6, 9, 4, 7, 1, 8, 2, 5],
      [1, 5, 7, 8, 2, 6, 4, 9, 3],
      [5, 7, 6, 9, 4, 8, 2, 3, 1],
      [8, 9, 2, 1, 3, 5, 6, 7, 4],
      [4, 1, 3, 2, 6, 7, 9, 5, 8],
      [7, 2, 1, 3, 8, 9, 5, 4, 6],
      [6, 4, 5, 7, 1, 2, 3, 8, 9],
      [9, 3, 8, 6, 5, 4, 7, 1, 2],
    ];

    expect(generatePuzzle(sudoku).flat()).toContain(0);
  });
});
