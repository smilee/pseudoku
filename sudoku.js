function createGrid(size) {
  return Array(size).fill().map(() => Array(size).fill(0));
}

function updateGrid({ grid, coordinates, value }) {
  const { row, column } = coordinates;
  return grid.map((xs, i) => (
    xs.map((x, j) => (
      row === i && column === j ? value : x
    ))));
}

function getNumbers(grid) {
  return Array(grid.length).fill().map((_, i) => i + 1);
}

function getRow({ grid, coordinates }) {
  const row = grid[coordinates.row];

  return row;
}

function getColumn({ grid, coordinates }) {
  const column = grid.map((row) => row[coordinates.column]);

  return column;
}

function chunk({ array, chunks }) {
  return Array(chunks).fill().map((_, i) => array.slice(i * chunks, i * chunks + chunks));
}

function chunkGrid({ grid, chunks }) {
  const chunked = chunk({ array: grid.map((row) => chunk({ array: row, chunks })), chunks });

  return chunked;
}

function getSection({ grid, coordinates }) {
  const chunks = Math.ceil(Math.sqrt(grid.length));
  const sectionRow = chunkGrid({ grid, chunks })[Math.floor(coordinates.row / chunks)];
  const section = sectionRow.map((row) => row[Math.floor(coordinates.column / chunks)]);

  return section;
}

function getCandidates({ grid, coordinates }) {
  const numbers = getNumbers(grid);
  const row = getRow({ grid, coordinates });
  // const filteredRow = getRow({ grid, coordinates }).filter((c) => c !== coordinates.column);
  const column = getColumn({ grid, coordinates });
  // const filteredColumn = getColumn({ grid, coordinates }).filter((r) => r !== coordinates.row);
  const section = getSection({ grid, coordinates }).flat();
  // const filteredSection = [
  //   ...section[Math.floor(coordinates.row / chunks)].filter((_, j) => j !== coordinates.column),
  //   ...getSection({ grid, coordinates }).filter((_, i) => (
  //     i !== Math.floor(coordinates.row / chunks))),
  // ].flat();
  const candidates = numbers.filter((number) => !Array.from(new Set([
    ...row,
    ...column,
    ...section,
  ])).includes(number));

  return candidates;
}

function getNeighbors({ grid, coordinates }) {
  const { row, column } = coordinates;
  const chunks = Math.ceil(Math.sqrt(grid.length));
  const sectionRow = chunk({
    array: grid,
    chunks,
  })[Math.floor(row / chunks)];
  const neighboringRows = sectionRow
    .filter((_, i) => i !== row % chunks)
    .map((xs) => (
      chunk({ array: xs, chunks }).filter((_, j) => j !== row % chunks)));
  const sectionColumn = chunkGrid({ grid, chunks }).map((xs) => (
    xs.map((x) => x[column % chunks])
  ));
  const neighboringColumns = sectionColumn.filter((_, i) => i !== row % chunks)
    .map((xs) => xs.map((x) => x.filter((_, j) => j !== column % chunks)));
  const neighboringNumbers = [
    ...neighboringRows,
    ...neighboringColumns,
  ].flat().flat();

  return neighboringNumbers;
}

function weighCandidates({ grid, coordinates }) {
  const numbers = getNumbers(grid);
  const candidates = getCandidates({ grid, coordinates });
  const neighboringNumbers = getNeighbors({ grid, coordinates });
  const neighborOccurances = neighboringNumbers
    .filter((number) => number > 0)
    .reduce((count, number) => {
      if (count[number]) {
        return {
          ...count,
          [number]: count[number] + 1,
        };
      }
      return {
        ...count,
        [number]: 1,
      };
    }, {});
  const zeros = numbers
    .filter((num) => !neighboringNumbers.includes(num))
    .filter((num) => candidates.includes(num));
  const weights = Object.entries(neighborOccurances)
    .filter((entry) => candidates.includes(Number(entry[0])))
    .reduce((counts, [number, count]) => ({
      ...counts,
      [count]: counts[count] ? [...counts[count], Number(number)] : [Number(number)],
    }), {
      0: zeros,
    });

  return weights;
}

function checkConditions(grid) {
  const cellConditions = grid.map((xs, i) => xs.map((x, j) => {
    const candidates = getCandidates({
      grid,
      coordinates: { row: i, column: j },
    }).filter((c) => c !== grid[i][j]);
    return !candidates.includes(x) && x > 0;
  }));
  const conditionsMet = cellConditions.reduce((answer, bs) => {
    const partial = bs.reduce((accumulated, b) => (accumulated && b));

    return answer && partial;
  });

  return conditionsMet;
}

function sudoku(size) {
  const solution = Array(size).fill().reduce((grid, _, i) => grid.reduce((g, __, j) => {
    const candidates = weighCandidates({ grid: g, coordinates: { row: i, column: j } });
    const values = candidates[Object.keys(candidates).sort((a, b) => b - a)[0]];
    return updateGrid({
      grid: g,
      coordinates: { row: i, column: j },
      value: values[Math.floor(Math.random() * values.length)],
    });
  }, grid), createGrid(size));

  return !checkConditions(solution) ? sudoku(size) : solution;
}

module.exports = {
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
};
