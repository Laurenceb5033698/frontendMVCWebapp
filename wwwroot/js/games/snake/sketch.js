import { Snake } from "snakeclass.js";
import { Grid } from "grid.js";
import { Fruit } from "fruit.js";


let rez;


let canvasSize = 400;
let unitSize = 20;
let gameActive = true;
var numberOfCollectedFruit = 0;

function setup() {
  createCanvas(canvasSize, canvasSize);
  frameRate(5);
  resetGame();
}

function resetGame() {
  snake = new Snake(unitSize);
  grid = new Grid(canvasSize, unitSize);
  fruit = new Fruit(unitSize);
  fruit.randomize(canvasSize);
  numberOfCollectedFruit = 0;
}


function keyPressed() {
  switch (keyCode) {
    case LEFT_ARROW: snake.setDir(-1, 0); break;
    case RIGHT_ARROW: snake.setDir(1, 0); break;
    case DOWN_ARROW: snake.setDir(0, 1); break;
    case UP_ARROW: snake.setDir(0, -1); break;
    case ENTER:
      if (!gameActive) {
        resetGame();
        gameActive = true;
      }
      break;
  }

}

function draw() {
  //scale(rez);

  if (gameActive) {
    background(220);
    //logic
    collectFruit();
    gameRules();
    snake.update();

    //render
    grid.drawGrid();
    snake.show();
    fruit.draw();
  }
  else {
    drawGameover();
  }
}

function collectFruit() {
  let collected = snake.eatFruit(fruit.pos);
  if (collected) {
    numberOfCollectedFruit++;
    randomizeFruit();
  }
  collected = false;
}

//call before snake.update().
function gameRules() {
  let nextHeadPos = createVector(snake.head.x + snake.xdir, snake.head.y + snake.ydir);
  let gameover = false;
  gameover |= snakeCollide(nextHeadPos);
  gameover |= outofBounds(nextHeadPos);
  if (gameover) {
    gameActive = false;
  }
}

function snakeCollide(nextHeadPos) {
  if (snake.isOccupied(nextHeadPos)) {
    return true;
  }
  return false;
}

function outofBounds(nextpos) {
  let gridMax = floor(canvasSize / unitSize);
  if (((nextpos.x < 0) || (nextpos.x >= gridMax)) || ((nextpos.y < 0) || (nextpos.y >= gridMax))) {
    return true;
  }
  return false;
}

function randomizeFruit() {
  let isOccupied = false;
  do {
    isOccupied = snake.isOccupied(fruit.randomize(canvasSize));
  } while (isOccupied);
  isOccupied = false;
}

function drawGameover() {
  fill(100, 30, 30);
  //rounded rect
  rect(canvasSize / 4, canvasSize / 4, canvasSize / 2, canvasSize / 3, 10, 10, 10, 10);
  fill(0);
  textAlign(CENTER);
  
  let textover = "Game Over";
  textSize(30);
  text(textover, (canvasSize / 2), canvasSize / 3);

  let textScore = "Score: " + numberOfCollectedFruit*10;
  textSize(20);
  text(textScore, (canvasSize / 2) , canvasSize / 2.5);

  let textRetry = "Hit 'Enter' key to retry";
  textSize(20);
  text(textRetry, (canvasSize / 2), canvasSize / 2);

}
