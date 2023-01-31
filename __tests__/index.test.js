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