import { pause, randomInt } from './util.js';
require('console-green');

export default class SudokuChecker {
  constructor() {
    this.game = {
      width: 9,
      height: 9,
      currentGameID: 0,
      currentMatrix: [],
    };
    this.searchSpeed = 50;
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
      let rowContainer;
      // let rowContainer = [];
      // this.game.currentMatrix.push(rowContainer);
      if (fillRandomly) {
        rowContainer = this.getRandomUniqueArray(this.game.width);
        this.game.currentMatrix.push(rowContainer);
        // for (let c = 0; c < this.game.width; c++) {
        //   rowContainer.push(randomInt(1, this.game.width));
        // }
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

  async buildRandomPuzzle(limit) {
    let pauseTime = this.searchSpeed;
    this.createPuzzleGrid(`main`); // inefficient
    this.buildPuzzleMatrix(true);
    this.printPuzzleGrid();
    let rowsAndColumnsOK = this.checkMatrixForUniqueness(this.game.currentMatrix);
    // let valid = this.checkPuzzle(this.game.currentMatrix);
    if (!document.getElementById('valid-count-display').innerText) {
      document.getElementById('valid-count-display').innerText = `Valid: ${this.validPuzzles.length}`;
    }
    if (rowsAndColumnsOK) {
      console.green('PUZZLE ROW AND COLUMNS ARE OKAY');
      console.table(this.game.currentMatrix);
      if (this.checkPuzzle(this.game.currentMatrix, true)) {
        console.green('FOUND VALID PUZZLE!');
        console.table(this.game.currentMatrix);
        this.validPuzzles.push(this.game);
        document.getElementById('valid-count-display').innerText = `Valid: ${this.validPuzzles.length}`;
      }
    } else {
      // console.log('rejected invalid puzzle', this.game.currentGameID);
      // console.table(this.game.currentMatrix);
      this.rejectedPuzzles.push(this.game.currentGameID);
      document.getElementById('rejected-count-display').innerText = `Rejected: ${this.rejectedPuzzles.length}`;
      // await pause(pauseTime);
    }
    if (this.phase === 'searching' || (this.rejectedPuzzles.length < limit && this.validPuzzles.length < limit)) {
      await pause(pauseTime);
      this.buildRandomPuzzle(1);
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
    return Array.from(new Set(arr)).length === arr.length;
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
        // console.pink('row', rowIndex, 'not unique', row)
        break;
      } else {
        console.green(this.game.currentGameID, 'row', rowIndex, 'unique', row);
      }
    }
    for (const rowIndex in columns) {
      let row = columns[rowIndex];
      if (!this.checkArrayForUniqueness(row)) {
        // console.pink('converted column', rowIndex, 'not unique', row)
        unique = false;
        break;
      } else {
        console.green(this.game.currentGameID, 'converted column', rowIndex, 'unique', row);
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
    let legal = true;
    let rectangleRows = this.getSquareRootMatrices(puzzleMatrix);
    if (!rootSquaresOnly && !this.checkMatrixForUniqueness(puzzleMatrix)) {
      legal = false;
    }
    if (rectangleRows === null) {
      console.pink('getSquareRootMatrices produced a bad rectangleRows in checkPuzzle')
    }
    rectangleRows.forEach(row => {
      if (!this.checkArrayForUniqueness(row)) {
        legal = false;
      }
    });
    return legal;
  }

  getRandomUniqueArray(len) {
    let randomArray = Array.from({ length: len }, (value, index) => index + 1);
    return randomArray.sort((a, b) => 0.5 - Math.random());
  }
}