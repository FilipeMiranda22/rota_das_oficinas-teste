import React, { useState, useEffect } from 'react';

const JogoDaVida = () => {
  const [grid, setGrid] = useState([]);
  const [generation, setGeneration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    initializeGrid();
  }, []);

  useEffect(() => {
    if (isPlaying) {
      const id = setInterval(getNextGeneration, 1000);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isPlaying, grid]);

  const initializeGrid = () => {
    const rows = 20;
    const cols = 43;

    const newGrid = [];
    for (let row = 0; row < rows; row++) {
      const rowArray = [];
      for (let col = 0; col < cols; col++) {
        rowArray.push(false);
      }
      newGrid.push(rowArray);
    }

    setGrid(newGrid);
  };

  const toggleCellState = (row, col) => {
    const newGrid = [...grid];
    newGrid[row][col] = !newGrid[row][col];
    setGrid(newGrid);

    if (newGrid[row][col]) {
      const neighborsCount = countAliveNeighbors(row, col);
      console.log(`Alive neighbors: ${neighborsCount}`);
    }
  };

  const countAliveNeighbors = (row, col) => {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];

    let aliveNeighbors = 0;

    for (let i = 0; i < directions.length; i++) {
      const [dx, dy] = directions[i];
      const newRow = row + dx;
      const newCol = col + dy;

      if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length) {
        if (grid[newRow][newCol]) {
          aliveNeighbors++;
        }
      }
    }

    return aliveNeighbors;
  };

  const getNextGeneration = () => {
    const newGrid = grid.map((row, rowIndex) =>
      row.map((alive, colIndex) => {
        const neighborsCount = countAliveNeighbors(rowIndex, colIndex);

        if (alive) {
          if (neighborsCount < 2 || neighborsCount > 3) {
            return false; // Cell dies due to loneliness or overpopulation
          } else {
            return true; // Cell survives to the next generation
          }
        } else {
          if (neighborsCount === 3) {
            return true; // Cell becomes alive due to exactly 3 neighbors
          } else {
            return false; // Cell remains dead
          }
        }
      })
    );

    setGrid(newGrid);
    setGeneration(generation + 1);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setIsPlaying(false);
    clearInterval(intervalId);
    initializeGrid();
    setGeneration(0);
  };

  const renderGrid = () => {
    return grid.map((row, rowIndex) =>
      row.map((alive, colIndex) => (
        <div
          key={`${rowIndex}-${colIndex}`}
          style={{
            backgroundColor: alive ? '#59cf2a' : '#707070',
            border: alive ? '1px solid #41f04a' :'1px solid #969696',
            width: '20px',
            height: '20px',
            cursor: 'pointer',
          }}
          onClick={() => toggleCellState(rowIndex, colIndex)}
        ></div>
      ))
    );
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center mt-5 ">
        <h3 style={{ color: '#FFF' }}>Geração: {generation}</h3>
        <div className="grid-container d-flex flex-wrap" style={{ width: '54rem', height: "25rem" }}>
          {renderGrid()}
        </div>
      </div>
      <div className="d-flex justify-content-center ">
        {isPlaying ? (
          <button className="btn btn-danger mt-3 me-3" onClick={handlePause}>
            <i title="Pausar" className="bi bi-pause-fill"></i>
          </button>
        ) : (
          <button className="btn btn-success mt-3 me-3" onClick={handlePlay}>
            <i title="Jogar" className="bi bi-play-fill"></i>
          </button>
        )}
        <button className="btn btn-primary mt-3" onClick={handleReset}>
        <i title="Novo Jogo" className="bi bi-arrow-clockwise" ></i>
        </button>
      </div>
    </>
  );
};

export default JogoDaVida;
