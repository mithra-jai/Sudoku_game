const board = [
    [5, 3, null, null, 7, null, null, null, null],
    [6, null, null, 1, 9, 5, null, null, null],
    [null, 9, 8, null, null, null, null, 6, null],
    [8, null, null, null, 6, null, null, null, 3],
    [4, null, null, 8, null, 3, null, null, 1],
    [7, null, null, null, 2, null, null, null, 6],
    [null, 6, null, null, null, null, 2, 8, null],
    [null, null, null, 4, 1, 9, null, null, 5],
    [null, null, null, null, 8, null, null, 7, 9]
  ];

  let startTime;
  let timerInterval;


  function createBoard() {
    const sudokuBoard = document.querySelector('.sudoku-board');
  
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const cell = document.createElement('div');
        cell.classList.add('sudoku-cell');
        cell.textContent = board[i][j] ? board[i][j] : '';
  
        if (board[i][j]) {
          cell.classList.add('given');
        }
  
        sudokuBoard.appendChild(cell);
      }
    }
  
    const cells = document.querySelectorAll('.sudoku-cell');
  
    document.getElementById('start-button').addEventListener('click', function() {
      startTimer();
  
      cells.forEach(cell => {
        if (!cell.classList.contains('given')) {
          cell.addEventListener('click', () => {
            const currentValue = parseInt(cell.textContent) || 0;
            const newValue = (currentValue % 9) + 1;
            cell.textContent = newValue === 0 ? '' : newValue;
          });
        }
      });
    });
  }
  
  function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
  }

  function updateTimer() {
    const timerElement = document.getElementById('timer');
    const currentTime = Date.now();
    const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timerElement.textContent = formattedTime;
  }

  function validateSolution() {
    const cells = document.querySelectorAll('.sudoku-cell');
    const solutionValid = isSolutionValid(cells);
    highlightErrors(cells, solutionValid);
    if (solutionValid) {
      clearInterval(timerInterval); // Stop the timer
      alert(`Congratulations! Solution is valid. Time taken: ${document.getElementById('timer').textContent}`);
    } else {
      alert('Solution is invalid. Please check for errors.');
    }
  }

  function isSolutionValid(cells) {
    const rows = new Array(9).fill().map(() => new Set());
    const columns = new Array(9).fill().map(() => new Set());
    const boxes = new Array(9).fill().map(() => new Set());

    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      const cellValue = parseInt(cell.textContent) || 0;

      if (cellValue < 1 || cellValue > 9 || isNaN(cellValue)) {
        return false; // Invalid value found
      }

      const row = Math.floor(i / 9);
      const column = i % 9;
      const box = Math.floor(row / 3) * 3 + Math.floor(column / 3);

      if (rows[row].has(cellValue) || columns[column].has(cellValue) || boxes[box].has(cellValue)) {
        return false; // Duplicate value found in row, column, or box
      }

      rows[row].add(cellValue);
      columns[column].add(cellValue);
      boxes[box].add(cellValue);
    }

    return true; // Solution is valid
  }

  function highlightErrors(cells, solutionValid) {
    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      const cellValue = parseInt(cell.textContent) || 0;

      if (!solutionValid || cellValue < 1 || cellValue > 9 || isNaN(cellValue)) {
        cell.classList.add('error');
         // Apply 'error' class to highlight invalid or conflicting numbers
         setTimeout(() => {
          cell.classList.remove('error'); // Remove 'error' class after 3 seconds
        }, 3000);
        } else {
        cell.classList.remove('error'); // Remove 'error' class if value is valid
      }
    }
  }

  document.getElementById('start-button').addEventListener('click', function() {
    startTimer();
  });
  createBoard();
 