class Enemy{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    draw(){
        this.x -= 4;
        pen.drawImage(media.enemy, this.x,this.y,this.w,this.h);
    }
    shoot(){
        this.enemybullets.push(new Enemybullet(this.x + this.w,this.y + this.h/2,30,30));
    }
}