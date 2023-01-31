// import './css/styles.css';

export class SudokuChecker {
  constructor() {

  }

  checkArrayForUniqueness(arr) {
    return [...arr].sort().join() === '1,2,3,4,5,6,7,8,9';
  }

  checkMatrixForUniqueness(matrix) {
    let unique = true;
    let columns = this.rotateMatrix(matrix);
    for (const rowIndex in matrix) {
      let row = matrix[rowIndex];
      if (!this.checkArrayForUniqueness(row)) {
        unique = false;
        break;
      }
    }
    for (const rowIndex in columns) {
      let row = columns[rowIndex];
      if (!this.checkArrayForUniqueness(row)) {
        unique = false;
        break;
      }
    }
    return unique;
  }

  rotateMatrix(matrix) {
    let newMatrix = [];
    for (let i=0; i<matrix.length; i++) {
      newMatrix.push([]);
    }
    matrix.forEach((row, r) => {
      row.forEach((digit, c) => {
        newMatrix[c][r] = digit;
      });
    });
    return newMatrix;
  }
}