window.onload = init();

function init(){
    setCanvas();

    setMedia();

    game = new Game();
    game.run();
}

function setCanvas(){
    canvas = document.getElementById('canvas');
    cw = canvas.width = 960;
    ch = canvas.height = 600;
    pen = canvas.getContext('2d');
} 

function setMedia(){
    media = {};

    media.plane = new Image();
    media.plane.src = 'source/PNG/plane.png';

    media.bgAudio = new Audio();
    media.bgAudio.src = 'source/Bonus/sfx_laser1.ogg';

    media.bg = new Image();
    media.bg.src = 'source/PNG/background.png';

    media.asteroid = new Image();
    media.asteroid.src = 'source/PNG/asteroid.png';

    media.bullet = new Image();
    media.bullet.src = 'source/PNG/bullet.png';

    media.enemy = new Image();
    media.enemy.src = 'source/PNG/enemyRed1.png';
}

//event
window.addEventListener('keydown', function(e){
    let key = e.keyCode;

    if(key==38){
        game.plane.moving = true;
        game.plane.moveUp();
    }else if(key==40){
        game.plane.moving = true;
        game.plane.moveDown();
    }

    if(key==32){
        game.plane.shoot();
    }
});

window.addEventListener('keyup', function(e){
    game.plane.moving = false;
});