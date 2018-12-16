import { runGame } from './snake';

const screens = document.getElementById('screens');

const difficultyRadios = document.querySelectorAll('.difficulty > input');
for (let radio of difficultyRadios) {
  radio.onclick = function (event) {
    const { target } = event;
    setDifficulty(target.value);
  }
}

let difficulty = 1;

function setDifficulty(value) {
  difficulty = value;
}

window.showScreen = function showScreen(number) {
  for (let child of screens.children) {
    child.hidden = true;
  }
  document.getElementById('screen' + number).hidden = false;
  if (number === 2) {
    start();
  }
}

function start() {
  runGame(difficulty);
}
