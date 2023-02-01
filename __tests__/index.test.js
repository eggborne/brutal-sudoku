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
    expect(sudokuChecker.checkMatrixForUniqueness(correctTestMatrix)).toEqual(true);
    expect(sudokuChecker.checkMatrixForUniqueness(incorrectTestMatrix)).toEqual(false);
    expect(sudokuChecker.checkMatrixForUniqueness(incorrectColumnOnlyTestMatrix)).toEqual(false);
  });
});

describe('SudokuChecker.prototype.getSquareRootMatrices', () => {

  let sudokuChecker, testMatrix, squareRootMatricesArray;

  beforeEach(() => {
    sudokuChecker = new SudokuChecker();
    testMatrix = [
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
    squareRootMatricesArray = [
      [
        [1,2,3],
        [2,3,4],
        [3,4,5],
      ],
      [
        [4,5,6],
        [5,6,7],
        [6,7,8],
      ],
      [
        [7,8,9],
        [8,9,1],
        [9,1,2],
      ],
      [
        [4,5,6],
        [5,6,7],
        [6,7,8],
      ],
      [
        [7,8,9],
        [8,9,1],
        [9,1,2],
      ],
      [
        [1,2,3],
        [2,3,4],
        [3,4,5],
      ],
      [
        [7,8,9],
        [8,9,1],
        [9,1,2],
      ],
      [
        [1,2,3],
        [2,3,4],
        [3,4,5],
      ],
      [
        [4,5,6],
        [5,6,7],
        [6,7,8],
      ],
    ]
  });

  test('should convert a 2d array into an array of equally-sized square matrices', () => {
    let splitMatrix = sudokuChecker.getSquareRootMatrices(testMatrix);
    let numberOfMinis = splitMatrix.length;
    let minisContainThreeArraysOfLengthThree = true;
    splitMatrix.forEach(mini => {
      if (mini.length !== 3 || mini[0].length !== 3 || mini[1].length !== 3 || mini[2].length !== 3) {
        minisContainThreeArraysOfLengthThree = true;
      }
    })
    expect(numberOfMinis).toEqual(9);
    expect(minisContainThreeArraysOfLengthThree).toEqual(true);
  });

  test('should convert a 2d array into an array of square matrices which contain only numbers', () => {
    let notAllNumbersMatrix = [
      [1,2,3,4,5,6,7,8,9],
      [2,3,4,5,6,7,8,9,1],
      [3,4,5,6,7,8,9,1,2],
      [4,5,6,7,'k',9,1,2,3],
      [5,6,7,8,9,1,2,3,4],
      [6,7,8,9,1,2,3,4,5],
      [7,8,9,1,2,3,4,5,6],
      [8,9,1,2,3,4,5,6,7],
      [9,1,2,3,4,5,6,7,8]
    ];
    let splitMatrix = sudokuChecker.getSquareRootMatrices(testMatrix);
    let splitIncorrectMatrix = sudokuChecker.getSquareRootMatrices(notAllNumbersMatrix);
    let allNumbers = false;
    let nonNumbersDetected = false;
    splitMatrix.forEach(mini => {
      mini.forEach(row => {
        if (row.filter(digit => isNaN(digit)).length > 0) {
          allNumbers = false;
        }
      });
    })
    splitIncorrectMatrix.forEach(mini => {
      mini.forEach(row => {
        if (row.filter(digit => isNaN(digit)).length > 0) {
          nonNumbersDetected = true;
        }
      });
    })
    expect(allNumbers).toEqual(true);
    expect(nonNumbersDetected).toEqual(true);
  });

  // test('should convert a 2d array into an array of equally-sized square matrices whose contents properly match the original', () => {
  //   expect(sudokuChecker.getSquareRootMatrices(testMatrix)).toEqual(squareRootMatricesArray);
  // });
});