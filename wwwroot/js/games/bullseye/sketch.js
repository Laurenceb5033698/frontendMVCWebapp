
let canvasSize = 400;
let aimx = 0;
let aimy = 0;
let points = 0;

function setup() {
    let gameCanvas = createCanvas(canvasSize,canvasSize);
    gameCanvas.id("bullseyeCanvas");
    gameCanvas.parent(document.getElementById('canvas-holder'));
    frameRate(30);
    
    target = new Target(50);
    target.randomise(canvasSize);
}

function draw() {
    background(255);
    
    target.draw();
    drawPoints();
}


function drawPoints(){
    fill(0);
    textAlign(CENTER);

    let pointsText = ("Points: " + points);
    textSize(30);
    text(pointsText, (canvasSize / 2), 30);
}

function mousePressed() {
    points += target.shoot(createVector(mouseX,mouseY));
    target.randomise(canvasSize);
}

//start by creating circle within canvas area
