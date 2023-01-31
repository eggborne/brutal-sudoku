import {SudokuChecker} from './../src/index.js';

describe('SudokuChecker.prototype.checkArrayForUniqueness', () => {

  let sudokuChecker, correctTestArray, incorrectTestArray;

  beforeEach(() => {
    sudokuChecker = new SudokuChecker();
    correctTestArray = [3,2,1,4,5,6,7,8,9];
    incorrectTestArray = [1,2,3,3,4,5,6,7,8];
  });

  test('should correctly determine if an array has only one of each number 1 through 9', () => {
    expect(sudokuChecker.checkArrayForUniqueness(correctTestArray)).toEqual(true);
    expect(sudokuChecker.checkArrayForUniqueness(incorrectTestArray)).toEqual(false);
  });
});

describe('SudokuChecker.prototype.rotateMatrix', () => {

  let sudokuChecker, testMatrix, rotatedTestMatrix;

  beforeEach(() => {
    sudokuChecker = new SudokuChecker();
    testMatrix = [
      [1,2,3],
      [4,5,6],
      [7,8,9],
    ];
    rotatedTestMatrix = [
      [1,4,7],
      [2,5,8],
      [3,6,9],
    ];
  });

  test('should return a 2d array whose rows equal the columns of the input array', () => {
    expect(sudokuChecker.rotateMatrix(testMatrix)).toEqual(rotatedTestMatrix);
  });
});

describe('SudokuChecker.prototype.checkMatrixForUniqueness', () => {

  let sudokuChecker, correctTestMatrix, incorrectTestMatrix, incorrectColumnOnlyTestMatrix;

  beforeEach(() => {
    sudokuChecker = new SudokuChecker();
    correctTestMatrix = [
      [1,2,3,4,5,6,7,8,9],
      [2,3,4,5,6,7,8,9,1],
      [3,4,5,6,7,8,9,1,2],
      [4,5,6,7,8,9,1,2,3],
      [5,6,7,8,9,1,2,3,4],
      [6,7,8,9,1,2,3,4,5],
      [7,8,9,1,2,3,4,5,6],
      [8,9,1,2,3,4,5,6,7],
      [9,1,2,3,4,5,6,7,8]
    ];
    incorrectTestMatrix = [
      [1,2,3,4,5,6,7,8,9],
      [2,3,4,5,6,7,8,9,1],
      [3,4,5,6,7,8,9,1,2],
      [4,5,6,7,8,9,1,3,3],
      [5,6,7,8,9,1,2,3,4],
      [6,7,8,9,1,2,3,4,5],
      [7,8,9,1,2,3,4,5,6],
      [8,9,1,2,3,4,5,6,7],
      [9,1,2,3,4,5,6,7,8]
    ];
    incorrectColumnOnlyTestMatrix = [
      [1,2,3,4,5,6,7,8,9],
      [2,3,4,5,6,7,8,9,1],
      [3,4,5,6,7,8,9,1,2],
      [5,6,7,8,9,1,2,3,4],
      [4,5,6,7,8,9,1,3,2],
      [6,7,8,9,1,2,3,4,5],
      [7,8,9,1,2,3,4,5,6],
      [8,9,1,2,3,4,5,6,7],
      [9,1,2,3,4,5,6,7,8]
    ];
  });

  test('should correctly determine if all of a matrix\'s rows have unique digits 1-9', () => {
    expect(sudokuChecker.checkMatrixForUniqueness(correctTestMatrix)).toEqual(true);
    expect(sudokuChecker.checkMatrixForUniqueness(incorrectTestMatrix)).toEqual(false);
  });
  
  test('should correctly determine if all of a matrix\'s columns have unique digits 1-9', () => {
    // expect(sudokuChecker.checkMatrixForUniqueness(correctTestMatrix)).toEqual(true);
    // expect(sudokuChecker.checkMatrixForUniqueness(incorrectTestMatrix)).toEqual(false);
    expect(sudokuChecker.checkMatrixForUniqueness(incorrectColumnOnlyTestMatrix)).toEqual(false);
  });
});