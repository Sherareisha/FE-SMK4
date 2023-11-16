import { useState } from 'react'

function Board({xIsNext, squares, onPlay}) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();

    if (xIsNext === true) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status = "";

  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
  <div className="status">{status}</div>
  <div className="board">
  <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
  <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
  <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
  <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
  <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
  <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
  <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
  <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
  <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
  </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentmove, setCurrentMove] = useState(0);
  const xIsNext = currentmove % 2 === 0;
  const currentSquares = history[currentmove];

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentmove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const moves = history.map((squares, move) => {
    let description = '';
    if(move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>

    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function Square({value, onSquareClick}) {
  return (
  <button className="square" onClick= {onSquareClick}>
    {value}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
  // garis horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  
  // garis vertikal
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  // garis diagonal
  [0, 4, 8],
  [2, 4, 6],
  ];
  for(let z=0; z < lines.length; z++) {
    const a = lines[z][0];
    const b = lines[z][1];
    const c = lines[z][2];

    // jika isi square[a] tidak kosong dan square[a] = square[b]
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      console.log("sudah ada yang menang")
      return squares[a];
    }
  }
  console.log("belum ada yang menang")
  return false;
}

