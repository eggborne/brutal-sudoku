// import './css/styles.css';

export class SudokuChecker {
  constructor() {

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

  getSquareRootMatrices(matrix) {
    let matrices = [];
    let originalSize = matrix[0].length;
    let sqrt = Math.sqrt(originalSize);

    matrix.forEach(row => {
      
    });

    console.log(matrices);

    return matrices;
  }

}