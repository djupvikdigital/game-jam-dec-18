import { runGame } from './snake';

const screens = document.getElementById('screens');

let difficulty = 4;

start();

function setDifficulty(value) {
  difficulty = value;
}

window.showScreen = function showScreen(number) {
  for (let child of screens.children) {
    child.hidden = true;
  }
  document.getElementById('screen' + number).hidden = false;
}

function start() {
  runGame(difficulty);
}
