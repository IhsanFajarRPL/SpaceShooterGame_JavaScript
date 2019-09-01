class Game {
    constructor() {
        this.bg = {
            x: 0,
            y: 0,
            w: 1920, //resolusi gambar
            h: 600, //
        };

        this.plane = null;
        this.asteroids = [];
        this.enemys = [];
        this.enemybullets = [];
        this.lifeups = [];

        this.points = 0;
        this.life = 5;
    }
    animate(callback) {
        window.requestAnimationFrame(callback);
    }
    run() {
        this.generate();
        this.start();

        //menjalankan audio
        // this.playAudio();
    }
    generate() {
        this.plane = new Plane(10, ch / 2 - 50, 100, 100);

        this.generateAsteroid();
        this.generateEnemy();
        //this.generateEnemybullet();
        this.generateLifeup();
    }
    generateLifeup() {
        let randomX = (Math.floor(Math.random() * ch / 2));
        this.lifeups.push(new Lifeup(randomX, ch / ch, 50, 50));

        setTimeout(() => this.generateLifeup(), 10000);
    }
    // generateEnemybullet(){
    //     let randomY = Math.abs(Math.floor(Math.random() * ch));
    //     this.enemybullets.push(new Enemybullet(cw,randomY,20,20));
    //     setTimeout(() => this.generateEnemybullet(),2000);
    // }
    generateEnemy() {
        let randomY = Math.abs(Math.floor(Math.random() * ch));
        this.enemys.push(new Enemy(cw, randomY - 35, 100, 100));
        this.enemybullets.push(new Enemybullet(cw, randomY, 25, 30));
        //media.audioEnemy.play();
        setTimeout(() => this.generateEnemy(), 2500);
    }
    generateAsteroid() {
        let randomY = Math.abs(Math.floor(Math.random() * ch));
        this.asteroids.push(new Asteroid(cw, randomY, 75, 75));

        setTimeout(() => this.generateAsteroid(), 1500);
    }
    start() {
        this.animate(() => this.start());
        cw = canvas.width = 960;
        ch = canvas.height = 600;
        pen.clearRect(0, 0, cw, ch);

        this.draw();
        this.update();
    }
    draw() {
        this.drawBackground();


        this.asteroids.forEach((asteroid) => {
            asteroid.draw();
        });

        this.enemys.forEach((enemy) => {
            enemy.draw();
        });

        this.enemybullets.forEach((enemybullet) => {
            enemybullet.draw();
        });

        this.lifeups.forEach((lifeup) => {
            lifeup.draw();
        })

        this.plane.draw();

        this.drawKet();
        // pen.drawImage(media.plane, 50, ch/2-  50, 75, 100);
    }
    drawKet() {
        pen.fillStyle = '#fff';
        pen.font = "27px KenVector Future";
        pen.textBaseLine = 'middle';
        pen.textAlign = 'left';
        pen.fillText('Point : ' + this.points, 23, 20);

        pen.fillStyle = '#fff';
        pen.font = "27px KenVector Future";
        pen.textBaseLine = 'middle';
        pen.textAlign = 'right';
        pen.fillText('Life : ' + this.life, cw - 20, 20);
    }
    drawBackground() {
        this.bg.x -= 3;
        if (this.bg.x + this.bg.w <= cw) {
            this.bg.x = 0;
        }
        pen.drawImage(media.bg, this.bg.x, this.bg.y, this.bg.w, this.bg.h);
    }
    update() {
        //Peluru dan Asteroid
        this.plane.bullets.forEach((bullet, i) => {
            this.asteroids.forEach((asteroid, i2) => {
                this.collide(bullet, asteroid, () => {
                    this.plane.bullets.splice(i, 1);
                    this.asteroids.splice(i2, 1);

                    this.points += 15;
                    media.duar.play();
                });
            });
        });

        //Pesawat dan Asteroid
        this.asteroids.forEach((asteroid, i2) => {
            this.collide(this.plane, asteroid, () => {
                this.asteroids.splice(i2, 1);

                this.life -= 1;
                media.lifeDown.play();
                if (this.life == 0) {
                    this.over();
                }
            });
        });

        //Peluru dan Pesawat Musuh
        this.plane.bullets.forEach((bullet, i) => {
            this.enemys.forEach((enemy, i3) => {
                this.collide(bullet, enemy, () => {
                    this.plane.bullets.splice(i, 1);
                    this.enemys.splice(i3, 1);

                    this.points += 20;
                    media.duar.play();
                });
            });
        });

        //Pesawat dan Pesawat Musuh
        this.enemys.forEach((enemy, i3) => {
            this.collide(this.plane, enemy, () => {
                this.enemys.splice(i3, 1);

                this.life -= 1;
                media.lifeDown.play();
                if (this.life == 0) {
                    this.over();
                }
            });
        });

        //Peluru dan Peluru Musuh
        this.plane.bullets.forEach((bullet, i) => {
            this.enemybullets.forEach((enemybullet, i4) => {
                this.collide(bullet, enemybullet, () => {
                    this.plane.bullets.splice(i, 1);
                    this.enemybullets.splice(i4, 1);

                    media.duar.play();
                });
            });
        });

        //Pesawat dan Peluru Musuh
        this.enemybullets.forEach((enemybullet, i4) => {
            this.collide(this.plane, enemybullet, () => {
                this.enemybullets.splice(i4, 1);

                this.life -= 1;
                media.lifeDown.play();
                if (this.life == 0) {
                    this.over();
                }
            });
        });

        //Peluru dan Life Up
        this.plane.bullets.forEach((bullet, i) => {
            this.lifeups.forEach((lifeup, i5) => {
                this.collide(bullet, lifeup, () => {
                    this.plane.bullets.splice(i, 1);
                    this.lifeups.splice(i5, 1);

                    this.life += 1;
                    media.lifeUp.play();
                    if (this.life == 6) {
                        this.life -= 1;
                    }
                });
            });
        });

        //Pesawat dan Life Up
        this.lifeups.forEach((lifeup, i5) => {
            this.collide(this.plane, lifeup, () => {
                this.lifeups.splice(i5, 1);

                this.life += 1;
                media.lifeUp.play();
                if (this.life == 6) {
                    this.life -= 1;
                }
            });
        });
    }
    collide(obj1, obj2, callback) {
        if (
            obj1.x + obj1.w > obj2.x &&
            obj1.x < obj2.x + obj2.w &&
            obj1.y + obj1.h > obj2.y &&
            obj1.y < obj2.y + obj2.h
        ) {
            callback();
        }
    }
    over() {
        media.kalah.play();
        alert('Game Over');
    }
    // playAudio() {
    //     setTimeout(() => {
    //         media.bgAudio.play();

    //     }, 1000);
    // }
}