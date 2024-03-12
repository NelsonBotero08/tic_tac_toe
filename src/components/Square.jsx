import React from 'react'
import "./board.css"

const Square = ({ children, index, updateBoard }) => {

const handleTurn = () => {
    updateBoard(index)
 }
    
  return (
    <div>
      <section className='square' onClick={handleTurn}>
        {children}
      </section>
    </div>
  )
}

export default Square
