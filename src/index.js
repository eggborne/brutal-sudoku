// import './css/styles.css';

export class SudokuChecker {
  constructor() {

  }

  checkArrayForUniqueness(arr) {
    return [...arr].sort().join() === '1,2,3,4,5,6,7,8,9';
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

  getSquareRootMatrices(matrix) {
    let matrices = [];
    let originalSize = matrix[0].length;
    let sqrt = Math.sqrt(originalSize);
    for (let i=0; i<originalSize; i++) {
      matrices[i] = [];
      for (let j=0; j<sqrt; j++) {
        matrices[i].push([]);
      }
    }
    let flatMatrix = matrix.flat(2);
    let currentMiniIndex = 0;
    let currentMiniRow = 0;
    let currentMiniColumn = 0;
    flatMatrix.forEach((digit, d) => {
      
      // console.log('mini index', currentMiniIndex)
      // console.log('row', currentMiniRow)
      // console.log('col', currentMiniColumn)
      matrices[currentMiniIndex][currentMiniRow][currentMiniColumn] = digit;
      if (currentMiniColumn + 1 === sqrt) {
        currentMiniColumn = 0;
        if (currentMiniRow + 1 === sqrt) {
          currentMiniRow = 0;
        } else {
          currentMiniRow++;
        }
      } else {
        currentMiniColumn++;
      }
      if (d > 0 && d % originalSize === 0 && (currentMiniIndex+1) < originalSize) {
        currentMiniIndex++;
      }
    });
    console.log(matrices);

    return matrices;
  }
}