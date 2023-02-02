import { pause, randomInt } from './util.js';

export default class SudokuChecker {
  constructor() {
    this.game = {
      width: 9,
      height: 9,
      currentGameID: 0,
      currentMatrix: [],
    };
    this.searchSpeed = 300;
    this.validPuzzles = [];
    this.rejectedPuzzles = [];
    this.phase = 'idle';
  }

  getUniqueID() {
    this.game.currentGameID++;
    return this.game.currentGameID;
  }

  buildPuzzleMatrix(fillRandomly) {
    this.game.currentMatrix = [];
    for (let r = 0; r < this.game.height; r++) {
      let rowContainer = [];
      this.game.currentMatrix.push(rowContainer);
      if (fillRandomly) {
        for (let c = 0; c < this.game.width; c++) {
          rowContainer.push(randomInt(1, this.game.width));
        }
      }
    }
  }

  createPuzzleGrid(targetQuery) {
    document.querySelector(targetQuery).innerHTML = '';
    let puzzleContainer = document.createElement('div');
    document.querySelector(targetQuery).append(puzzleContainer);
    puzzleContainer.classList.add('puzzle-grid');
    let puzzleID = this.getUniqueID();
    puzzleContainer.id = `sudoku-grid-${puzzleID}`;
    for (let r = 0; r < this.game.height; r++) {
      for (let c = 0; c < this.game.width; c++) {
        let newCell = document.createElement('div');
        newCell.classList.add('puzzle-cell');
        puzzleContainer.innerHTML += `
          <div id="puzzle-cell-${r}-${c}" class="puzzle-cell"></div>
        `;
      }
    }
    document.querySelector(targetQuery).append(puzzleContainer);
  }

  printPuzzleGrid() {
    let gridList = document.querySelectorAll(`#sudoku-grid-${this.game.currentGameID} > .puzzle-cell`);
    for (let i = 0; i < gridList.length; i++) {
      gridList[i].innerText = this.game.currentMatrix.flat()[i];
    }
  }

  async buildRandomPuzzle(num) {
    let pauseTime = (this.searchSpeed);
    this.createPuzzleGrid(`main`);
    this.buildPuzzleMatrix(true);
    this.printPuzzleGrid();
    let rowsAndColumnsOK = this.checkMatrixForUniqueness(this.game.currentMatrix);
    // let valid = this.checkPuzzle(this.game.currentMatrix);
    document.getElementById('valid-count-display').innerText = `Valid: ${this.validPuzzles.length}`;
    if (rowsAndColumnsOK) {
      console.green('PUZZLE ROWS/COLUMNS ARE OKAY!');
      console.table(this.game.currentMatrix);
      console.green('---end OKAY');
      if (this.checkPuzzle(this.game.currentMatrix, true)) {
        console.green('FOUND VALID PUZZLE!');
        console.table(this.game.currentMatrix);
        console.green('---end valid');
        this.validPuzzles.push(this.game);
        document.getElementById('valid-count-display').innerText = `Valid: ${this.validPuzzles.length}`;
      }
    } else {
      console.log('rejected invalid puzzle', this.game.currentGameID);
      // console.table(this.game.currentMatrix);
      this.rejectedPuzzles.push(this.game);
      document.getElementById('rejected-count-display').innerText = `Rejected: ${this.rejectedPuzzles.length}`;
      await pause(pauseTime);
    }
    if (this.phase === 'searching' && (this.rejectedPuzzles.length < num || this.validPuzzles.length < num)) {
      await pause(pauseTime);
      this.buildRandomPuzzle(1, pauseTime);
    } else {
      console.log('rejected', this.rejectedPuzzles.length, this.rejectedPuzzles);
      console.log('valid', this.validPuzzles.length, this.validPuzzles);
    }
  }

  checkForSquare(arr) {
    let isSquare = true;
    if (!Array.isArray(arr)) {
      isSquare = false;
    } else {
      for (const row of arr) {
        if (!Array.isArray(row)) {
          isSquare = false;
        } else if (row.length !== arr.length) {
          isSquare = false;
        }
      }
    }
    return isSquare ? arr.length : false;
  }

  checkArrayForUniqueness(arr) {
    return [...arr].sort().join() === '1,2,3,4,5,6,7,8,9';
  }

  getRowsFromColumns(matrix) {
    let newMatrix = [];
    for (let i = 0; i < matrix.length; i++) {
      newMatrix.push([]);
    }
    matrix.forEach((row, r) => {
      row.forEach((digit, c) => {
        newMatrix[c][r] = digit;
      });
    });
    return newMatrix;
  }

  checkMatrixForUniqueness(matrix) {
    let unique = true;
    let columns = this.getRowsFromColumns(matrix);
    for (const rowIndex in matrix) {
      let row = matrix[rowIndex];
      if (!this.checkArrayForUniqueness(row)) {
        unique = false;
        console.pink('row', rowIndex, 'not unique', row)
        break;
      } else {
        console.green('row', rowIndex, 'unique!', row)
      }
    }
    for (const rowIndex in columns) {
      let row = columns[rowIndex];
      if (!this.checkArrayForUniqueness(row)) {
        console.pink('converted column', rowIndex, 'not unique', row)
        unique = false;
        break;
      } else {
        console.green('converted column', rowIndex, 'unique', row)
      }
    }
    return unique;
  }

  getSquareRootMatrices(matrix) {
    if (!this.checkForSquare(matrix)) {
      return null;
    }
    let matrices = [];
    let originalSize = matrix[0].length;
    let rootSquareSize = Math.sqrt(originalSize);
    for (let y = 0; y < matrix.length; y += rootSquareSize) {
      for (let c = 0; c < matrix.length; c += rootSquareSize) {
        let rectangleMembers = this.getRectangleFromMatrix(matrix, rootSquareSize, rootSquareSize, c, y);
        matrices.push(rectangleMembers);
      }
    }
    return matrices;
  }

  getRectangleFromMatrix(arr, width, height, x, y) {
    let rectangleMembers = [];
    for (let row = 0; row < height; row++) {
      rectangleMembers.push(...arr[y + row].slice(x, x + width));
    }
    return rectangleMembers;
  }

  checkPuzzle(puzzleMatrix, rootSquaresOnly) {
    console.green('check puzzle')
    let legal = true;
    let rectangleRows = this.getSquareRootMatrices(puzzleMatrix);
    if (!rootSquaresOnly && !this.checkMatrixForUniqueness(puzzleMatrix)) {
      legal = false;
    }
    rectangleRows.forEach(row => {
      if (!this.checkArrayForUniqueness(row)) {
        legal = false;
      }
    });
    return legal;
  }
}