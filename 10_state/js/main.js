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

    media.audioPlane = new Audio();
    media.audioPlane.src = 'source/Bonus/sfx_laser1.ogg';

    media.audioEnemy = new Audio();
    media.audioEnemy.src = 'source/Bonus/sfx_laser2.ogg';
    
    media.bg = new Image();
    media.bg.src = 'source/PNG/background.png';

    media.asteroid = new Image();
    media.asteroid.src = 'source/PNG/asteroid.png';

    media.bullet = new Image();
    media.bullet.src = 'source/PNG/bullet.png';

    media.enemy = new Image();
    media.enemy.src = 'source/PNG/enemyRed1.png';

    media.enemybullet = new Image();
    media.enemybullet.src = 'source/PNG/bullet_2.png';

    media.lifeup = new Image();
    media.lifeup.src = 'source/PNG/powerup.png';

    media.lifeUp = new Audio();
    media.lifeUp.src = 'source/Bonus/sfx_shieldUp.ogg';

    media.lifeDown = new Audio();
    media.lifeDown.src = 'source/Bonus/sfx_shieldDown.ogg';

    media.duar = new Audio();
    media.duar.src = 'source/Bonus/sfx_zap.ogg';

    media.mulai = new Audio();
    media.mulai.src = 'source/Bonus/sfx_twoTone.ogg';

    media.kalah = new Audio();
    media.kalah.src = 'source/Bonus/sfx_lose.ogg';
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
        media.audioPlane.play();
    }
});

window.addEventListener('keyup', function(e){
    game.plane.moving = false;
});

canvas.addEventListener('click', function(e){
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    game.clicked(x,y);
});