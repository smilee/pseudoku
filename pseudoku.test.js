const {
  pseudoku,
  candidate,
  createGrid,
  updateGrid,
} = require('./pseudoku');

describe('pseudoku', () => {
  describe('when row = [1, 2, 3, 4]', () => {
    it('returns a pseudoku', () => {
      expect(pseudoku([1, 2, 3, 4])).toEqual([
        [1, 2, 3, 4],
        [3, 4, 1, 2],
        [2, 1, 4, 3],
        [4, 3, 2, 1],
      ]);
    });
  });
});

test('candidate', () => {
  const grid = createGrid(4);
  const numbers = [1, 2, 3, 4];

  expect(candidate({
    grid, numbers, row: 0, column: 0,
  })).toBe(1);

  expect(candidate({
    grid: updateGrid(grid, { row: 0, column: 0, value: 1 }),
    numbers,
    row: 1,
    column: 1,
  })).toBe(2);

  expect(candidate({
    grid: updateGrid(grid, { row: 0, column: 0, value: 1 }),
    numbers,
    row: 3,
    column: 3,
  })).toBe(1);

  expect(candidate({
    grid: [
      [1, 2, 3, 0],
      [3, 4, 1, 2],
      [2, 1, 4, 3],
      [0, 3, 2, 0],
    ],
    numbers,
    row: 3,
    column: 0,
  })).toBe(4);
});

test('createGrid', () => {
  expect(createGrid(4)).toEqual([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
});

test('updateGrid', () => {
  const grid = createGrid(4);

  expect(updateGrid(grid, { row: 0, column: 0, value: 1 })).toEqual([
    [1, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  expect(updateGrid(grid, { row: 1, column: 2, value: 1 })).toEqual([
    [0, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
});
