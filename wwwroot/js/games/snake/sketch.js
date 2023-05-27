//import { Snake } from "snakeclass.js";
//import { Grid } from "grid.js";
//import { Fruit } from "fruit.js";
//import {postScoreToLeaderboard} from "../../PostScores.js";

let canvasSize = 400;
let unitSize = 20;
let gameActive = true;
let numberOfCollectedFruit = 0;

function setup() {
  let gameCanvas = createCanvas(canvasSize, canvasSize);
  gameCanvas.id("snakeCanvas");
  gameCanvas.parent(document.getElementById('canvas-holder'));

  //addLeaderboardEntryForm();
  frameRate(5);
  grid = new Grid(canvasSize, unitSize);
  LeaderboardForm = new GameOverForm(canvasSize, calculateScore);
  LeaderboardForm.addLeaderboardEntryForm(calculateScore);
  LeaderboardForm.updateGameActive(gameActive);
  resetGame();
}

function resetGame() {
  snake = new Snake(unitSize);
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
        LeaderboardForm.updateGameActive(gameActive);
      }
      break;
  }

}

function draw() {
  if (gameActive) {
    //LeaderboardForm.toggleForm(false);

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
    LeaderboardForm.draw();
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
    LeaderboardForm.updateGameActive(gameActive);
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

function calculateScore() {
  return numberOfCollectedFruit * 10;
}


function drawGameover() {
  fill(100, 30, 30);
  //rounded rect
  rect(canvasSize / 4, canvasSize / 4, canvasSize / 2, canvasSize / 2, 10, 10, 10, 10);
  fill(0);
  textAlign(CENTER);

  let textover = "Game Over";
  textSize(30);
  text(textover, (canvasSize / 2), canvasSize / 3);

  textSize(20);
  
  let textScore = "Score: " + numberOfCollectedFruit * 10;
  text(textScore, (canvasSize / 2), canvasSize / 2.5);

  let textSubmitPrompt = "Submit your score!";
  text(textSubmitPrompt, (canvasSize / 2), (canvasSize / 2));

  let textRetry = "Hit 'Enter' key to retry";
  text(textRetry, (canvasSize / 2), canvasSize / 2 + canvasSize / 5);

  //show form div
  //LeaderboardForm.toggleForm(true);
}

//create form for inputing name
function addLeaderboardEntryForm() {

  //get canvas dom element
  let myCanvas = document.getElementById("snakeCanvas");
  let canvRect = myCanvas.getBoundingClientRect();

  //select first dom element with CLASS 'ScoreForm'
  let ScoreForm = select('.ScoreForm');
  if (!ScoreForm) {
    console.log("ScoreForm null! check div with class .ScoreForm exists in html.");
    return;
  }
  ScoreForm.position(0, 0, 'relative');

  let formElement = createInput('');
  formElement.id("formInputElement");
  formElement.position(canvasSize / 4 + 10, canvasSize / 2);
  formElement.size(canvasSize / 4);

  let button = createButton('submit');
  button.position(formElement.x + formElement.width + 20, formElement.y);
  button.mousePressed(submittedCallback);
  
  ScoreForm.child(formElement);
  ScoreForm.child(button);

  textAlign(CENTER);
  textSize(20);
}

//callback on submit
function submittedCallback() {
  let formElement = select('#formInputElement');
  const userName = formElement.value().toString();
  const userScore = numberOfCollectedFruit*10;
  
  //reset to prevent multi-submissions
  formElement.value('');
  numberOfCollectedFruit =0;
  
  postScoreToLeaderboard("Scoreboard", userName, userScore);
}


function toggleForm(show) {
  let ScoreForm = select(".ScoreForm");
  if (show) {
    ScoreForm.style('display', 'block');
  } else {
    ScoreForm.style('display', 'none');
  }
}