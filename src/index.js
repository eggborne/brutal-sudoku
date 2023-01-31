// import './css/styles.css';

export class SudokuChecker {
  constructor() {

  }

  checkArrayForUniqueness(arr) {    
    return [...arr].sort().join() === '1,2,3,4,5,6,7,8,9';
  }
}