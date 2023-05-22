class Snake {

  constructor(_size) {
    this.head = createVector(10, 10);
    this.body = [];
    this.body[1] = createVector(10, 11);
    this.body[0] = createVector(10, 12);

    this.xdir = 0;
    this.ydir = -1;
    this.size = _size;
    this.collectedFruit = false;
  }

  setDir(x, y) {
    this.xdir = x;
    this.ydir = y;
  }

  update() {
    //save neck pos
    let prevHead = createVector(this.head.x, this.head.y);
    //move head toward dir
    this.head.x += this.xdir;
    this.head.y += this.ydir;

    let temp;
    if (!this.collectedFruit) {
      //no fruit, move tail to neck
      temp = this.body.shift();
    }

    temp = prevHead;
    //append to body(start of tail)
    this.body.push(temp);

    this.collectedFruit = false;
  }

  isOccupied(testPos) {
    if ((this.head.x == testPos.x) && (this.head.y == testPos.y)) {
      return true;
    }
    for (let i = 0; i < this.body.length; i++) {
      if ((this.body[i].x == testPos.x) && (this.body[i].y == testPos.y)) {
        return true;
      }
    }
    return false;
  }

  eatFruit(fruitPos) {
    let nextPos = createVector(this.head.x + this.xdir, this.head.y + this.ydir);

    if ((nextPos.x == fruitPos.x) && (nextPos.y == fruitPos.y)) {
      this.collectedFruit = true;
    }
    return this.collectedFruit;
  }

  show() {
    //draw head light green
    fill(10, 180, 0);
    rect(this.head.x * this.size, this.head.y * this.size, this.size, this.size);
    //draw body lime green
    fill(20, 128, 0);
    for (let i = 0; i < this.body.length; i++) {
      rect(this.body[i].x * this.size, this.body[i].y * this.size, this.size, this.size);
    }
  }

}