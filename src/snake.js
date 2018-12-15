const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');

// 163,103 - 336,256

const keyCodes = {
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  UP: 38
};

let lastTime;

const SIZE = 8;
const HEIGHT = canvas.height;
const WIDTH = canvas.width;

let state = createInitialState();

function createInitialState() {
  return {
    direction: '',
    food: [
      createRandomInteger(WIDTH / SIZE - 1) * SIZE,
      createRandomInteger(HEIGHT / SIZE - 1) * SIZE
    ],
    positions: [[0, 0]],
    x: 0,
    y: 0
  };
}

function createRandomInteger(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function downScale(x) {
  return Math.floor(x / SIZE);
}

function drawFood([x, y]) {
  context.fillRect(x, y, SIZE, SIZE);
}

function drawPlayer() {
  state.positions.forEach(drawRect);
}

function drawRect(position) {
  const x = position[0] * SIZE;
  const y = position[1] * SIZE;
  context.fillRect(x, y, SIZE, SIZE);
}

function hasCollided(position1, position2) {
  const x1 = downScale(position1[0]);
  const y1 = downScale(position1[1]);
  const x2 = downScale(position2[0]);
  const y2 = downScale(position2[1]);
  return x1 === x2 && y1 === y2;
}

export function keyHandler(event) {
  switch (event.keyCode) {
    case keyCodes.DOWN:
      state.direction = 'down';
      break;
    case keyCodes.LEFT:
      state.direction = 'left';
      break;
    case keyCodes.RIGHT:
      state.direction = 'right';
      break;
    case keyCodes.UP:
      state.direction = 'up';
      break;
  }
}

function update(dt) {
  const height = HEIGHT / SIZE;
  const width = WIDTH / SIZE;
  let { x, y } = state;
  const speed = SIZE * 6;
  const movement = speed * dt;
  if (!state.direction) {
    return;
  }
  switch (state.direction) {
    case 'down':
      y += movement;
      break;
    case 'left':
      x -= movement;
      break;
    case 'right':
      x += movement;
      break;
    case 'up':
      y -= movement;
      break;
  }
  const ateFood = hasCollided([x, y], state.food);
  const gridX = downScale(x);
  const gridY = downScale(y);
  const positionIndex = state.positions.findIndex(
    pos => pos[0] === gridX && pos[1] === gridY
  );
  let collided =
    gridX < 0 ||
    gridX >= width ||
    gridY < 0 ||
    gridY >= height ||
    (positionIndex >= 0 && positionIndex < state.positions.length - 1);
  if (collided) {
    state = createInitialState();
  } else {
    state.x = x;
    state.y = y;
    if (positionIndex === -1) {
      state.positions.push([gridX, gridY]);
      if (ateFood) {
        state.food = [
          createRandomInteger(width - 1) * SIZE,
          createRandomInteger(height - 1) * SIZE
        ];
      } else {
        state.positions.shift();
      }
    }
  }
}

export function runGame() {
  const now = Date.now();
  const dt = (now - lastTime) / 1000.0;
  context.clearRect(0, 0, WIDTH, HEIGHT);
  update(dt);
  drawFood(state.food);
  drawPlayer();
  lastTime = now;
  requestAnimationFrame(runGame);
}
