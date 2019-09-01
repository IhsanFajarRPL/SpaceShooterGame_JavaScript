class Game {
    constructor(){
        this.bg = {
            x : 0,
            y : 0,
            w : 1920, //resolusi gambar
            h : 600, //
        };

        this.plane = null;
        this.asteroids = [];
        this.enemys = [];
    }
    animate(callback){
        window.requestAnimationFrame(callback);
    }
    run(){
        this.generate();
        this.start();

        //menjalankan audio
        this.playAudio();
    }
    generate(){
        this.plane = new Plane(10,ch/2-50,100,100);
        
        this.generateAsteroid();
        this.generateEnemy();
    }
    generateEnemy(){
        let randomY = Math.abs(Math.floor(Math.random() * ch));
        this.enemys.push(new Enemy(cw,randomY,100,100));

        setTimeout(() => this.generateEnemy(),2000);
    }
    generateAsteroid(){
        let randomY = Math.abs(Math.floor(Math.random() * ch));
        this.asteroids.push(new Asteroid(cw,randomY,75,75));

        setTimeout(() => this.generateAsteroid(),3000);
    }
    start(){
        this.animate(() => this.start());
        cw = canvas.width = 960;
        ch = canvas.height = 600;
        pen.clearRect(0,0,cw,ch);

        this.draw();
        this.update();
    }
    draw(){
        this.drawBackground();

        // pen.drawImage(media.plane, 50, ch/2-  50, 75, 100);
        
        this.asteroids.forEach((asteroid) => {
            asteroid.draw();
        });
        
        this.enemys.forEach((enemy) => {
            enemy.draw();
        });
        
        this.plane.draw();
    }
    drawBackground(){
        this.bg.x -= 3;
        if(this.bg.x + this.bg.w <= cw){
            this.bg.x = 0;
        }
        pen.drawImage(media.bg, this.bg.x,this.bg.y,this.bg.w,this.bg.h);
    }
    update(){

    }
    playAudio(){
        setTimeout(() => {
            media.bgAudio.play();

        },1000);
    }
}