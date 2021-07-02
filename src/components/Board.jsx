import Square from './Square';
import styles from '../../styles/Board.module.css';

const generateRowsMap = () => {
  const rows = [];
  let rowIndex = 0;

  for (let i=0; i<9; i++) {
    if (i%3 === 0) rowIndex++;

    if (rows[rowIndex] == null) rows[rowIndex] = [];

    rows[rowIndex].push(i);
  }

  return rows;
}
  
const ROWS_MAP = generateRowsMap();

const Board = ({onClick, squares, winnerSquares}) => {
  return (
    <div>
      {ROWS_MAP.map((columns, index) => {
        return <div className={styles.bordRow} key={index}>
          {columns.map((item) => {
            return <Square value={item} onClick={onClick} squares={squares} winnerSquares={winnerSquares} key={item}/>
          })}
        </div>
      })}       
    </div>
  );
};

export default Board;