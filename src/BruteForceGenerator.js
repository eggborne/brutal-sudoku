import { pause, randomInt } from './util.js';
require('console-green');

export default class BruteForceGenerator {
  constructor(options) {
    this.type = 'sudoku';
  }

  buildPuzzleMatrix(fillRandomly) {
    this.game.currentMatrix = [];
    for (let r = 0; r < this.game.height; r++) {
      let rowContainer;
      if (fillRandomly) {
        rowContainer = [];
        for (let c = 0; c < this.game.width; c++) {
          rowContainer[c] = (randomInt(1, this.game.width));
        }
      }
      rowContainer = Array(this.game.width)
      // rowContainer.fill(0, 0, this.game.width)
    }
  }

  async buildRandomPuzzle(limit) {
    let pauseTime = this.searchSpeed;
    // this.createPuzzleGrid(`main`); // inefficient
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

  // async buildRandomPuzzle(limit) {
  //   limit = 100000;
  //   let pauseTime = (this.searchSpeed);
  //   this.createPuzzleGrid(`main`);
  //   this.buildPuzzleMatrix(true);
  //   this.printPuzzleGrid();
  //   let rowsAndColumnsOK = this.checkMatrixForUniqueness(this.game.currentMatrix);
  //   // let valid = this.checkPuzzle(this.game.currentMatrix);
  //   if (!document.getElementById('valid-count-display').innerText) {
  //     document.getElementById('valid-count-display').innerText = `Valid: ${this.validPuzzles.length}`;
  //   }
  //   if (rowsAndColumnsOK) {
  //     console.green('PUZZLE ROWS/COLUMNS ARE OKAY!');
  //     console.table(this.game.currentMatrix);
  //     if (this.checkPuzzle(this.game.currentMatrix, true)) {
  //       console.green('FOUND VALID PUZZLE!');
  //       console.table(this.game.currentMatrix);
  //       this.validPuzzles.push(this.game);
  //       document.getElementById('valid-count-display').innerText = `Valid: ${this.validPuzzles.length}`;
  //     }
  //   } else {
  //     // console.log('rejected invalid puzzle', this.game.currentGameID);
  //     // console.table(this.game.currentMatrix);
  //     this.rejectedPuzzles.push(this.game.currentGameID);
  //     document.getElementById('rejected-count-display').innerText = `Rejected: ${this.rejectedPuzzles.length}`;
  //     // await pause(pauseTime);
  //   }
  //   if (this.phase === 'searching' || (this.rejectedPuzzles.length < limit && this.validPuzzles.length < limit)) {
  //     await pause(pauseTime);
  //     this.buildRandomPuzzle(1);
  //   } else {
  //     console.log('rejected', this.rejectedPuzzles.length, this.rejectedPuzzles);
  //     console.log('valid', this.validPuzzles.length, this.validPuzzles);
  //   }
  // }

  getRandomUniqueArray2(len) {
    let randomArray = Array.from({ length: len }, (value, index) => index + 1);
    return randomArray.sort((a, b) => 0.5 - Math.random());
  }
}