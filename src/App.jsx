/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useRef } from 'react';

import styled from '@emotion/styled';

import { generateSudoku, generatePuzzle, updateGrid } from '../sudoku';

import './style.css';

export default function App() {
  const Container = styled.div({
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '20px',
    width: '100%',
  });
  const Sudoku = styled.div({
    margin: '10% auto 0',
    display: 'inline-grid',
    gridTemplate: 'repeat(9, 40px) / repeat(9, 40px)',
    border: '4px solid #333333',
  });
  const Cell = styled.div({
    textAlign: 'center',
    '&:nth-child(3n)': {
      borderRight: '2px solid #333333',
    },
    '&:nth-child(9n)': {
      border: 'none',
    },
    '&:nth-child(n+19):nth-child(-n+27)': {
      borderBottom: '2px solid #4f4444',
    },
    '&:nth-child(n+46):nth-child(-n+54)': {
      borderBottom: '2px solid #333333',
    },
  });
  const Input = styled.input({
    display: 'block',
    padding: '5px 0 0 2px',
    width: '34px',
    height: '30px',
    fontSize: '36px',
    textAlign: 'center',
    lineHeight: '26px',
    verticalAlign: 'top',
    color: '#666666',
    border: 'none',
    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
      display: 'none',
    },
    '&:focus': {
      outline: 'none',
    },
    '@supports (-webkit-touch-callout: none)': {
      padding: '0 0 5px 2px',
    },
  });
  const Given = styled.span({
    boxSizing: 'border-box',
    width: 'fit-content',
    height: 'fit-content',
    lineHeight: '40px',
    fontFamily: "'Courier Prime', monospace",
    fontSize: '36px',
    textAlign: 'center',
  });
  const Button = styled.button({
    display: 'block',
    marginTop: '24px',
    padding: '16px 36px',
    width: '368px',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333333',
    background: '#ffffff',
    border: '3px solid #333333',
    borderRadius: '6px',
    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.1s ease-in-out',
    '&:hover': {
      boxShadow: '0px 15px 20px rgba(0, 0, 0, 0.1)',
    },
  });

  const [state, setState] = useState({});
  useEffect(() => {
    const answer = generateSudoku(9);
    const solution = generatePuzzle(answer);
    setState({
      ...state, answer, sudoku: solution, solution,
    });
  }, []);
  const sudokuRef = useRef(null);

  const { answer, sudoku, solution } = state;

  function handleChange(event, { row, column }) {
    const { target: { value } } = event;
    const updatedSolution = updateGrid({
      grid: state.solution,
      coordinates: { row, column },
      value: parseInt(value, 10),
    });

    setState({ ...state, solution: updatedSolution });
  }

  function handleClick(event) {
    event.preventDefault();
    answer.forEach((row, i) => {
      row.forEach((cell, j) => {
        const target = sudokuRef.current.getElementsByClassName(`input-${i}-${j}`)[0];
        if (solution[i][j] > 0 && cell !== solution[i][j]) {
          target.style.color = '#bc544b';
        }
      });
    });
  }

  return (
    <Container>
      <Sudoku title="sudoku" ref={sudokuRef}>
        {
          sudoku?.map((row, i) => (
            row.map((cell, j) => (cell === 0
              ? (
                <Cell
                  key={`input-${i}-${j}`}
                >
                  <Input
                    type="number"
                    inputmode="numeric"
                    className={`input-${i}-${j}`}
                    value={solution[i][j] > 0 ? solution[i][j] : ''}
                    onChange={((event) => handleChange(event, { row: i, column: j }))}
                  />
                </Cell>
              )
              : (
                <Cell
                  key={`cell-${i}-${j}`}
                >
                  <Given>{ cell }</Given>
                </Cell>
              )))
          ))
        }

      </Sudoku>
      <Button type="button" onClick={handleClick}>Check solution</Button>
    </Container>
  );
}
