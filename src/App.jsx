import React, { useState, useEffect } from "react";
import "./App.css";
import Square from "./components/Square";
import confeti from "canvas-confetti";

function App() {
  const turns = {
    "X": "❌",
    "O": "🔴"
  };

  const [boards, setBoards] = useState(() => {
    let boardStorage = window.localStorage.getItem('board')
    return boardStorage ? JSON.parse(boardStorage) : Array(9).fill(null) 
  });
  const [turn, setTurn] = useState(() => {
    let turnStorage = window.localStorage.getItem('TURNO')
    return turnStorage ?? turns.X
  });
  const [winner, setWinner] = useState(null);
  const [pointX, setPointX] = useState(() => {
    let pointXStorage = window.localStorage.getItem('pointX');
    return pointXStorage ? parseInt(pointXStorage, 10) : 0;
  });
  const [pointO, setPointO] = useState(() => {
    let pointOStorage = window.localStorage.getItem('pointO');
    return pointOStorage ? parseInt(pointOStorage, 10) : 0;
  });

  useEffect(() => {
    window.localStorage.setItem('pointX', pointX.toString());
    window.localStorage.setItem('pointO', pointO.toString());
  }, [pointX, pointO]);

  const checkWinner = (boards) => {
    // Combinaciones horizontales
    if (boards[0] && boards[0] === boards[1] && boards[1] === boards[2]) {
      return boards[0];
    } else if (boards[3] && boards[3] === boards[4] && boards[4] === boards[5]) {
      return boards[3];
    } else if (boards[6] && boards[6] === boards[7] && boards[7] === boards[8]) {
      return boards[6];
    }
    // Combinaciones verticales
    else if (boards[0] && boards[0] === boards[3] && boards[3] === boards[6]) {
      return boards[0];
    } else if (boards[1] && boards[1] === boards[4] && boards[4] === boards[7]) {
      return boards[1];
    } else if (boards[2] && boards[2] === boards[5] && boards[5] === boards[8]) {
      return boards[2];
    }
    // Combinaciones diagonales
    else if (boards[0] && boards[0] === boards[4] && boards[4] === boards[8]) {
      return boards[0];
    } else if (boards[2] && boards[2] === boards[4] && boards[4] === boards[6]) {
      return boards[2];
    }
    return null; // Si no hay ganador
  };

  const resetGame = () => {
    setBoards(Array(9).fill(null));
    setTurn(turns.X);
    setWinner(null);
    window.localStorage.removeItem('board');
    window.localStorage.removeItem('TURNO');
  };

  const checkEndGame = (newBoards) => {
    return newBoards.every((square) => square !== null);
  };

  const updateBoard = (index) => {
    //No actualizar en la posición si hay algo
    if (boards[index] || winner) return;
    // Actializar el tablero
    const newBoards = [...boards];
    newBoards[index] = turn;
    setBoards(newBoards);
    // Saber en qué turno está 
    const newTurn = turn === turns.X ? turns.O : turns.X;
    setTurn(newTurn);
    
    //Guardar partida y turno en caso de no terminar
    window.localStorage.setItem('board', JSON.stringify(newBoards));
    window.localStorage.setItem('TURNO', newTurn);

    const newWinner = checkWinner(newBoards);

    if (newWinner) {
      confeti();
      setWinner(newWinner);
      if (newWinner === turns.X) {
        setPointX(pointX + 1);
      } else if (newWinner === turns.O) {
        setPointO(pointO + 1);
      }
    } else if (checkEndGame(newBoards)) {
      setWinner(false);
    }
  };

  const newGame = (e) => {
    setBoards(Array(9).fill(null));
    setTurn(turns.X);
    setWinner(null);
    setPointX(0); 
    setPointO(0);
    window.localStorage.removeItem('board');
    window.localStorage.removeItem('TURNO');
    window.localStorage.removeItem('pointX')
    window.localStorage.removeItem('pointO')
  }

  return (
    <div className="container">
      <h1>TIC TAC TOE</h1>
      <section className="puntos">
        <div><p>Puntos de <span>X</span></p> <p>{pointX}</p></div>
        
        <button onClick={newGame} className="newgame">New Game</button>
  
        <div><p>Puntos de <span>O</span></p> <p>{pointO}</p></div>
      </section>
      <section className="board">
        {boards.map((_, index) => (
          <Square
            key={index}
            index={index}
            updateBoard={updateBoard}
          >
            {boards[index]}
          </Square>
        ))}
      </section>
      <section>
        <span className="turn">Turno para <Square>{turn}</Square></span>
      </section>

      {winner !== null && (
        <section className="winner">
          <div className="text">
            <h2>
              {winner === false 
                ? "Empate"
                : "Ganador"
              }
            </h2>
            <header className="win">
              { winner && <Square>{winner}</Square> }
            </header>
            <footer>
              <button className="button__reset" onClick={resetGame}>Empezar De Nuevo</button>
            </footer>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
