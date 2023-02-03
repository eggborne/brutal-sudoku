import './css/styles.css';
import SudokuChecker from './SudokuChecker.js';
import BruteForceGenerator from './BruteForceGenerator.js';
require('console-green');

let sudokuChecker;

window.onload = async () => {
  console.pink('loaded');
  sudokuChecker = new SudokuChecker();
  sudokuChecker.createPuzzleGrid(`main`);
  document.getElementById('start-search-button').addEventListener('click', handleStartSearchClick);
  document.getElementById('search-speed-input').addEventListener('input', handleChangeSearchSpeed);
};

function handleStartSearchClick() {
  if (sudokuChecker.phase === 'idle') {
    document.getElementById('start-search-button').innerText = 'Stop searching';
    document.body.classList.replace('idle', 'dimmed');
    sudokuChecker.phase = 'searching';

    // sudokuChecker.buildRandomPuzzle(1);
    sudokuChecker.buildRandomPuzzle(1);

  } else if (sudokuChecker.phase === 'searching') {
    sudokuChecker.phase = 'idle';
    document.getElementById('start-search-button').innerText = 'Start searching';
    document.body.classList.replace('dimmed', 'idle');
  }
}

function handleChangeSearchSpeed(e) {
  let displaySpeed = e.target.value;
  sudokuChecker.searchSpeed = parseInt(1000 - e.target.value);
  document.getElementById('search-speed-display').innerText = displaySpeed;
}