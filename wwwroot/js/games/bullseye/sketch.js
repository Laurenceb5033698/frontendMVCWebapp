

let aimx = 0;
let aimy = 0;

function setup() {
    let gameCanvas = createCanvas(400,400);
    gameCanvas.id("bullseyeCanvas");
    gameCanvas.parent(document.getElementById('canvas-holder'));
    frameRate(30);
}

function draw() {
    background(255);
    
    aimx = mouseX;
    aimy = mouseY;
    
    fill(0);
    rect(aimx,aimy,10,10);
}
