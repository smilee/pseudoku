function createGrid(size) {
  return Array(size).fill().map(() => Array(size).fill(0));
}

function updateGrid(grid, { row, column, value }) {
  return grid.map((xs, i) => (
    xs.map((x, j) => (
      row === i && column === j ? value : x
    ))
  ));
}

function candidate({
  grid, numbers, row, column,
}) {
  const usedNumbers = [...grid.flat()];
  const candidates = usedNumbers
    .filter((i) => i > 0)
    .reduce((xs, i) => xs.filter((x) => x !== i), numbers);
  return candidates[0];
}

function pseudoku(numbers) {
  // 1. grid
  // 2. numbers
  // 3. coordinate => { row: 0, column: 0 }
  // { grid: ..., numbers: ..., row: ..., column: ... }
  // => candidates
  const grid = createGrid(numbers.length);
  return [
    [candidate({
      grid, numbers, row: 0, column: 0,
    }), 2, 3, 4],
    [3, 4, 1, 2],
    [2, 1, 4, 3],
    [4, 3, 2, 1],
  ];
}

module.exports = {
  pseudoku,
  candidate,
  createGrid,
  updateGrid,
};
