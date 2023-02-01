import { SudokuChecker } from './../src/index.js';
const sudokuChecker = new SudokuChecker();

describe('SudokuChecker.prototype.checkForSquare', () => {

  test('should correctly determine if its argument is an array of length x consisting of arrays of length x, returning x if true', () => {
    let correctTestArray = [
      [1, '2', 3],
      [4, 5, [6, 7]],
      [{ digit: 'seven' }, 8, 9],
    ];
    let incorrectWidthTestArray = [
      [1, 2, 3],
      [4, 5, 6, 7],
      [8, 9, 1],
    ];
    let incorrectHeightTestArray = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [0, 1, 1],
    ];
    expect(sudokuChecker.checkForSquare(correctTestArray)).toEqual(correctTestArray.length);
    expect(sudokuChecker.checkForSquare(incorrectWidthTestArray)).toEqual(false);
    expect(sudokuChecker.checkForSquare(incorrectHeightTestArray)).toEqual(false);
  });
});

describe('SudokuChecker.prototype.checkArrayForUniqueness', () => {

  test('should correctly determine if an array has only one of each number 1 through 9', () => {
    let correctTestArray = [3, 2, 1, 4, 5, 6, 7, 8, 9];
    let incorrectTestArray = [1, 2, 3, 3, 4, 5, 6, 7, 8];
    expect(sudokuChecker.checkArrayForUniqueness(correctTestArray)).toEqual(true);
    expect(sudokuChecker.checkArrayForUniqueness(incorrectTestArray)).toEqual(false);
  });
});

describe('SudokuChecker.prototype.getRowsFromColumns', () => {

  let testMiniMatrix, rotatedTestMiniMatrix;

  beforeEach(() => {
    testMiniMatrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    rotatedTestMiniMatrix = [
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
    ];
  });

  test('should return a 2d array whose rows equal the columns of the input array', () => {
    expect(sudokuChecker.getRowsFromColumns(testMiniMatrix)).toEqual(rotatedTestMiniMatrix);
  });
});

describe('SudokuChecker.prototype.checkMatrixForUniqueness', () => {

  let correctTestMatrix, incorrectTestMatrix, incorrectColumnOnlyTestMatrix;

  beforeEach(() => {
    correctTestMatrix = [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [2, 3, 4, 5, 6, 7, 8, 9, 1],
      [3, 4, 5, 6, 7, 8, 9, 1, 2],
      [4, 5, 6, 7, 8, 9, 1, 2, 3],
      [5, 6, 7, 8, 9, 1, 2, 3, 4],
      [6, 7, 8, 9, 1, 2, 3, 4, 5],
      [7, 8, 9, 1, 2, 3, 4, 5, 6],
      [8, 9, 1, 2, 3, 4, 5, 6, 7],
      [9, 1, 2, 3, 4, 5, 6, 7, 8]
    ];
    incorrectTestMatrix = [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [2, 3, 4, 5, 6, 7, 8, 9, 1],
      [3, 4, 5, 6, 7, 8, 9, 1, 2],
      [4, 5, 6, 7, 8, 9, 1, 3, 3],
      [5, 6, 7, 8, 9, 1, 2, 3, 4],
      [6, 7, 8, 9, 1, 2, 3, 4, 5],
      [7, 8, 9, 1, 2, 3, 4, 5, 6],
      [8, 9, 1, 2, 3, 4, 5, 6, 7],
      [9, 1, 2, 3, 4, 5, 6, 7, 8]
    ];
    incorrectColumnOnlyTestMatrix = [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [2, 3, 4, 5, 6, 7, 8, 9, 1],
      [3, 4, 5, 6, 7, 8, 9, 1, 2],
      [5, 6, 7, 8, 9, 1, 2, 3, 4],
      [4, 5, 6, 7, 8, 9, 1, 3, 2],
      [6, 7, 8, 9, 1, 2, 3, 4, 5],
      [7, 8, 9, 1, 2, 3, 4, 5, 6],
      [8, 9, 1, 2, 3, 4, 5, 6, 7],
      [9, 1, 2, 3, 4, 5, 6, 7, 8]
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

  let testMatrix, notAllNumbersMatrix, squareRootMatricesArray;

  beforeEach(() => {
    testMatrix = [
      [1, 1, 1, 2, 2, 2, 3, 3, 3],
      [1, 1, 1, 2, 2, 2, 3, 3, 3],
      [1, 1, 1, 2, 2, 2, 3, 3, 3],
      [4, 4, 4, 5, 5, 5, 6, 6, 6],
      [4, 4, 4, 5, 5, 5, 6, 6, 6],
      [4, 4, 4, 5, 5, 5, 6, 6, 6],
      [7, 7, 7, 8, 8, 8, 9, 9, 9],
      [7, 7, 7, 8, 8, 8, 9, 9, 9],
      [7, 7, 7, 8, 8, 8, 9, 9, 9],
    ];

    notAllNumbersMatrix = [
      [1, 1, 1, 2, 2, 2, 3, 3, 3],
      [1, 1, 1, 2, 2, 2, 3, 3, 3],
      [1, 1, 1, 2, 2, 2, 3, 3, 3],
      [4, 4, 4, 5, 'k', 5, 6, 6, 6],
      [4, 4, 4, 5, 5, 5, 6, 6, 6],
      [4, 4, 4, 5, 5, 5, 6, 6, 6],
      [7, 7, 7, 8, 8, 8, 9, 9, 9],
      [7, 7, 7, 8, 8, 8, 9, 9, 9],
      [7, 7, 7, 8, 8, 8, 9, 9, 9],
    ];

    squareRootMatricesArray = [
      [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
      ],
      [
        [2, 2, 2],
        [2, 2, 2],
        [2, 2, 2],
      ],
      [
        [3, 3, 3],
        [3, 3, 3],
        [3, 3, 3],
      ],
      [
        [4, 4, 4],
        [4, 4, 4],
        [4, 4, 4],
      ],
      [
        [5, 5, 5],
        [5, 5, 5],
        [5, 5, 5],
      ],
      [
        [6, 6, 6],
        [6, 6, 6],
        [6, 6, 6],
      ],
      [
        [7, 7, 7],
        [7, 7, 7],
        [7, 7, 7],
      ],
      [
        [8, 8, 8],
        [8, 8, 8],
        [8, 8, 8],
      ],
      [
        [9, 9, 9],
        [9, 9, 9],
        [9, 9, 9],
      ],
    ];
  });

  test('should return null if provided an argument which is not a square array', () => {
    let wrongType = { one: 1, two: 2, three: 3 };
    let squareMatrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    let wrongWidthMatrix = [
      [9, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    let wrongHeightMatrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 2, 3],
    ];
    expect(sudokuChecker.getSquareRootMatrices(wrongType)).toEqual(null);
    expect(sudokuChecker.getSquareRootMatrices(wrongWidthMatrix)).toEqual(null);
    expect(sudokuChecker.getSquareRootMatrices(wrongHeightMatrix)).toEqual(null);
    expect(!!sudokuChecker.getSquareRootMatrices(squareMatrix)).toEqual(true);
  });

  test('should return an array the same length as the argument', () => {
    let splitMatrix = sudokuChecker.getSquareRootMatrices(testMatrix);
    expect(splitMatrix.length).toEqual(testMatrix.length);
  });

  test('should return an array containing only arrays', () => {
    let splitMatrix = sudokuChecker.getSquareRootMatrices(testMatrix);
    let nonArrays = splitMatrix.filter(item => !Array.isArray(item)).length;
    expect(nonArrays).toEqual(0);
  });

  test('should return an array containing only arrays and numbers found in the argument', () => {
    let splitMatrix = sudokuChecker.getSquareRootMatrices(testMatrix);
    let originalNumbers = testMatrix.flat();
    let violatingTypes = splitMatrix.flat(2).filter(item => originalNumbers.indexOf(item) === -1);
    expect(violatingTypes.length).toEqual(0);
  });

  test('should return an array containing square arrays of size Math.sqrt(argument.length)', () => {
    let splitMatrix = sudokuChecker.getSquareRootMatrices(testMatrix);
    console.log(splitMatrix);
    let sqrt = Math.sqrt(testMatrix.length);
    let nonSquares = splitMatrix.filter(item => {
      let notSquare = !sudokuChecker.checkForSquare(item);
      let wrongSize = item.length !== sqrt;
      return notSquare || wrongSize;
    });
    expect(nonSquares.length).toEqual(0);
  });

  test('should return an array of equally-sized square matrices whose contents properly match the original', () => {
    let splitMatrix = sudokuChecker.getSquareRootMatrices(testMatrix);
    expect(splitMatrix).toEqual(squareRootMatricesArray);
  });
});