import React, { useState } from "react";
import "./App.css";
import Square from "./components/Square";
import confeti from "canvas-confetti"

function App() {
  const turns = {
    "X": "x",
    "O": "o"
  };

  const [boards, setBoards] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(turns.X);
  const [winner, setWinner] = useState(null)

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
    setBoards(Array(9).fill(null))
    setTurn(turns.X)
    setWinner(null)
  }

  const checkEndGame = (newboars) => {
    return newboars.every((square) => square !== null)
  }
  

  const updateBoard = (index) => {
    //No actualizar en la posición si hay algo
    if(boards[index] || winner) return
    // Actializar el trablero
    const newboars = [...boards]
    newboars[index] = turn
    setBoards(newboars)
    // Saber en ue turno esta 
    const newTurn = turn === turns.X ? turns.O : turns.X
    setTurn(newTurn)
    
    const newWinnwer = checkWinner(newboars)

    if(newWinnwer){
      confeti()
      setWinner(newWinnwer)
    } else if (checkEndGame(newboars)){
      setWinner(false)
    }
  }

  return (
    <div className="container">
      <h1>TIC TAC TOE</h1>
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

      {
        winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>
                {
                  winner === false 
                  ? "Empate"
                  : "Ganador"
                }
              </h2>

              <header className="win">
                { winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button className="button__reset" onClick={resetGame}>Empezar De Nuevo</button>
              </footer>
            </div>
          </section>
        )
      }
    </div>
  );
}

export default App;
