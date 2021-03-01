/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useRef } from 'react';

import styled from '@emotion/styled';

import { generateSudoku, generatePuzzle, updateGrid } from '../sudoku';

import './style.css';

export default function App() {
  const Sudoku = styled.div({
    marginTop: '16%',
    marginLeft: '50%',
    display: 'inline-grid',
    gridTemplate: 'repeat(9, 60px) / repeat(9, 60px)',
    transform: 'translateX(-50%)',
    border: '5px solid #333333',
  })
  const Cell = styled.div({
    textAlign: 'center',
    '&:nth-child(3n)': {
      borderRight: '3px solid #333333',
    },
    '&:nth-child(9n)': {
      border: 'none'
    },
    '&:nth-child(n+19):nth-child(-n+27)': {
      borderBottom: '3px solid #4f4444',
    },
    '&:nth-child(n+46):nth-child(-n+54)': {
      borderBottom: '3px solid #333333',
    }
  })
  const Input = styled.input({
    marginTop: '3px',
    padding: 0,
    width: '48px',
    fontSize: '48px',
    textAlign: 'center',
    color: '#666666',
    border: 'none',
    '&:focus': {
      outline: 'none'
    }
  });
  const Given = styled.span({
    width: 'fit-content',
    height: 'fit-content',
    lineHeight: '60px',
    fontFamily: "'Courier Prime', monospace",
    fontSize: '48px',
    textAlign: 'center',
  });
  const Button = styled.button({
    display: 'block',
    margin: '24px auto',
    padding: '16px 36px',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333333',
    background: '#ffffff',
    border: '3px solid #333333',
    borderRadius: '6px',
    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.1s ease-in-out',
    '&:hover': {
      boxShadow: '0px 15px 20px rgba(0, 0, 0, 0.1)'
    }
  })

  const [state, setState] = useState({});
  useEffect(() => {
    const answer = generateSudoku(9);
    const solution = generatePuzzle(answer)
    setState({...state, answer, sudoku: solution, solution })
  }, [])
  const sudokuRef = useRef(null)

  const { answer, sudoku, solution } = state;

  function handleChange(event, { row, column }) {
    const { target: { value }} = event;
    const updatedSolution = updateGrid({
      grid: state.solution,
      coordinates: {row, column},
      value: parseInt(value)
    });

    setState({...state, solution: updatedSolution })
  }

  function handleClick(event) {
    event.preventDefault();

    console.log('answer:', answer, 'solution:', solution)
    answer.forEach((row, i) => {
      row.forEach((cell, j) => {
        const target = sudokuRef.current.getElementsByClassName(`input-${i}-${j}`)[0];
        console.log(target);
        if (solution[i][j] > 0 && cell !== solution[i][j]) {
          console.log('answer:', cell, 'solution:', solution[i][j])
          console.log('value:', target.value)
          target.style.color = '#bc544b';
        }
      })
    })
  }

  return (
    <>
      <Sudoku title="sudoku" ref={sudokuRef}>
        {
          sudoku?.map((row, i) => (
            row.map((cell, j) => (cell === 0
              ? <Cell
                  key={`input-${i}-${j}`}
                >
                  <Input
                    type="text"
                    className={`input-${i}-${j}`}
                    value={solution[i][j] > 0 ? solution[i][j] : ''}
                    onChange={((event) => handleChange(event, { row: i, column: j }))}
                  />
                </Cell>
              : <Cell
                  key={`cell-${i}-${j}`}>
                  <Given>{ cell }</Given>
                </Cell>))
          ))
        }
        
      </Sudoku>
      <Button type="button" onClick={handleClick}>Check solution</Button>
    </>
  );
}
