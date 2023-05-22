class Fruit {


    constructor(_size) {
        this.pos = createVector(0, 0);
        this.size = _size;
    }

    randomize(canvasSize) {
        let gridMax = floor(canvasSize / this.size);
        this.pos.x = floor(random(0, gridMax));
        this.pos.y = floor(random(0, gridMax));
        //return random pos for grid pos test (is occupuied)
        return this.pos;
    }

    draw() {
        fill(255, 10, 10)
        rect(this.pos.x * this.size, this.pos.y * this.size, this.size, this.size);
    }
}