import React from 'react';
import Board from './Board';
import calculateWinner from '../gameFunction/calculateWinner';
import styles from '../../styles/Game.module.css';

class Game extends React.Component {

  state = {
    history: [{
      squares: Array(9).fill(null),
    }],
    stepNumber: 0,
    xIsNext: true,
  };
  
  handleClick = (i) => {
    const {history, stepNumber, xIsNext} = this.state;

    const historyItem = history.slice(0, stepNumber + 1);
    const current = historyItem[historyItem.length - 1];
    const squares = current.squares.slice();
    const draw = current.squares.includes(null);

    if (calculateWinner(squares)[0] || squares[i] || !draw) {
      return;
    }
    
    squares[i] = xIsNext ? 'X' : 'O';

    this.setState({
      history: historyItem.concat([{
        squares: squares,
      }]),
      stepNumber: historyItem.length,
      xIsNext: !xIsNext,
    });
  }
  
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }
  
  render() {
    const {history, stepNumber, xIsNext} = this.state;

    const current = history[stepNumber];
    const [winner, winnerSquares] = calculateWinner(current.squares);
    const draw = current.squares.includes(null);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Перейти к ходу #' + move :
        'К началу игры';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)} className={styles.historyStep}>{desc}</button>
        </li>
      );
    });

    let status;
    
    if (winner) {
      status = 'Выйграл ' + winner;
    } else {
      if (draw) {
        status = 'Следующий ход: ' + (xIsNext ? 'X' : 'O');
      } else {
        status = 'Ничья';
      }
    }      

    return (
      <div className={styles.game}>
        <Board
          squares={current.squares}
          onClick={this.handleClick}
          winnerSquares={winnerSquares}
        />
        <div className={styles.gameInfo}>
          <div>{status}</div>
          <ol className={styles.olBlock}>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;