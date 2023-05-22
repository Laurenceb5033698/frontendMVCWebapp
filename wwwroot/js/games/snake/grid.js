
class gSquare {
    constructor(xpos, ypos, width, height) {
        this.x = xpos;
        this.y = ypos;
        this.w = width;
        this.h = height;
    }
}

class Grid {
    constructor(_canvasSize, _unitSize) {
        this.gridSqaures = [];
        this.gridRows = floor(canvasSize / unitSize);
        this.setupGrid(_canvasSize, _unitSize);
    }

    setupGrid(canvasSize, unitSize) {

        for (let x = 0; x < this.gridRows; x++) {
            this.gridSqaures[x] = [];
            for (let y = 0; y < this.gridRows; y++) {
                this.gridSqaures[x][y] = new gSquare(x * unitSize, y * unitSize, unitSize - 1, unitSize - 1);
            }
        }
    }

    drawGrid() {
        fill(250);
        noStroke();
        for (let x = 0; x < this.gridRows; x++) {
            for (let y = 0; y < this.gridRows; y++) {
                rect(this.gridSqaures[x][y].x, this.gridSqaures[x][y].y,
                     this.gridSqaures[x][y].w, this.gridSqaures[x][y].h);
            }
        }
    }
}