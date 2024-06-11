class Target {
    
    
    constructor(_size) {
        this.pos = createVector(0,0);
        this.size = _size;  //size of the target circle, larger = easier
        this.middle = this.size/1.5;
        this.inner = this.size/4;
    }
    
    randomise(canvasSize){
        //for a square canvas
        let minpos = this.size;
        let maxpos = canvasSize-this.size;
        //keep random pos centred so target is entirely visible
        this.pos.x = random(minpos,maxpos);
        this.pos.y = random(minpos,maxpos);
        
        return this.pos;
    }
    
    shoot(_aimpos) {
        //let shootDiffernce = this.pos - _aimpos;
        //let sqrDist = this.sqrMagnitude(shootDiffernce);
        let distance = dist(this.pos.x,this.pos.y,_aimpos.x,_aimpos.y);
        console.log(distance);
        //based on accuracy, return number of points the shot is worth.
        if(distance < this.inner)
        {   
            return 50;  //within inner section.
        } else
        if (distance < this.middle)
        {   
            return 20;  //within middle section.
        } else
        if(distance < this.size)
        {
            return 10;  //within outer section.
        } else {
            return 0;
        }
    }
        
    sqrMagnitude(_vec) {
        return (_vec.x*_vec.x + _vec.y*_vec.y);
    }
    
    dataDump(){
        console.log("target pos:", this.pos.x, ", ", this.pos.y);
        console.log("target size: ", this.size);
        console.log("target middle: ", this.middle);
        console.log("target inner: ", this.inner);
    }
    
    draw() {
        noStroke();
        fill(255,10,10);
        circle(this.pos.x, this.pos.y, this.size*2);
        fill(240,240,240);
        circle(this.pos.x, this.pos.y, this.middle*2);
        fill(255,10,10);
        circle(this.pos.x, this.pos.y, this.inner*2);
        
    }
    
}