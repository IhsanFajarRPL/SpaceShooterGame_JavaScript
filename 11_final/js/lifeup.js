class Lifeup{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    draw(){
        this.y += 3;
        pen.drawImage(media.lifeup,this.x,this.y,this.w,this.h);
    }
}