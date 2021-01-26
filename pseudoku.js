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
  const rowsMiniSquare = row % 2 === 0
    ? [grid[row], grid[row + 1]]
    : [grid[row - 1], grid[row]];

  const usedNumbers = [
    ...grid[row],
    ...grid.map((r) => r[column]),
    ...[
      column % 2 === 0
        ? rowsMiniSquare.map((r) => r.slice(column, column + 2)).flat()
        : rowsMiniSquare.map((r) => r.slice(column - 1, column + 1)).flat(),
    ],
  ].flat();

  const candidates = usedNumbers
    .filter((i) => i > 0)
    .reduce((xs, i) => xs.filter((x) => x !== i), numbers);

  return candidates[0];
}

function pseudoku(numbers) {
  return createGrid(numbers.length)
    .reduce((grid, _, row) => (numbers.reduce((g, __, column) => updateGrid(g, {
      row,
      column,
      value: candidate({
        grid: g, numbers, row, column,
      }),
    }), grid)), createGrid(numbers.length));
}

module.exports = {
  pseudoku,
  candidate,
  createGrid,
  updateGrid,
};
