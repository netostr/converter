const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const calculateWinner = (squares) => {
  let flagDraw = true;
  for (let i = 0; i < LINES.length; i += 1) {
    const [a, b, c] = LINES[i];
    const line = [squares[a], squares[b], squares[c]];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], [a, b, c]];
    }

    if (!(line.includes('X') && line.includes('O'))) flagDraw = false;
  }
  if (flagDraw) {
    return ['Дружба', []];
  }
  return [null, []];
};

export default calculateWinner;
