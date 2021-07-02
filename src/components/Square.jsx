import {useCallback, useMemo} from 'react';
import clsx from 'clsx';
import styles from '../../styles/Square.module.css';

function Square({value, onClick, squares, winnerSquares}) {
  const handleClick = useCallback(() => {onClick(value)}, [value, onClick]);

  const styleSquare = useMemo(() => (clsx({
    [styles.squareWinner]: winnerSquares.includes(value),    
    [styles.square]: true,
  })), [winnerSquares, value]);
  
  return (
    <button className={styleSquare} onClick={handleClick}>
      {squares[value]}
    </button>
  );
}
  
export default Square;