class Game {
    constructor() {

    }
    animate(callback){
        window.requestAnimationFrame(callback);
    }
    run(){
        this.generate();
        this.start();
    }

    generate(){

    }

    start() {
        alert('start');

        this.animate(0,0,cw,ch);

        this.draw();
        this.update();
    }
    draw(){

    }
    update(){
        
    }
}