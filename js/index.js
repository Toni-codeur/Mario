var Cell = function (y, x, image) {
    this.x = x;
    this.y = y;
    this.image = image;
    this.myImgCellFull = new Image();
    this.myImgCellFull.src = this.image;
    this.myImgCellFull.style.position = "absolute";
    this.myImgCellFull.style.width = "35px";
    this.myImgCellFull.style.transition = "all 0.3s";
    document.body.appendChild(this.myImgCellFull);
    this.update = function () {
        this.myImgCellFull.style.left = this.x * 35 + "px";
        this.myImgCellFull.style.top = this.y * 35 + "px";
    };
    this.checkCollision = function (cell,choixLettreMap) {
       if(cell == choixLettreMap) {
           return true;
       } else {
           return false;
       }
    };
    this.update();
};
var Stars = function (y, x, image) {
    Cell.call(this, y, x, image);
    var score = 0;
    document.getElementById("score").innerHTML = '<p> Coins: ' + score +'</p>';
    this.checkCollisionL = function () {
        var oAudio = document.getElementById('stars');
       for(var i = 0; i < map.stars.length; i++) {
           var etoile = map.stars[i];
           if(mario.x == etoile.x && mario.y == etoile.y) {
               if(etoile.myImgCellFull.src == 'http://localhost/mario/image/cell/stars.png') {
                   oAudio.play();
                   if(score == 0) {
                       score = 1;
                       document.getElementById("score").innerHTML = '<p> Coins: ' + score +'</p>';
                        etoile.myImgCellFull.src = 'image/cell/cellVoid.png';
                   }
                   document.getElementById("score").innerHTML = '<p> Coins: ' + score++ +'</p>';
                   etoile.myImgCellFull.src = 'image/cell/cellVoid.png';
               }
           }
      } 
    };
    this.interval = setInterval(function () {
     star.checkCollisionL();
    }, 100);
};
var Invinsibles = function (y, x, image) {
   Cell.call(this, y, x, image);
   this.checkCollisionEtoile = function () {
       var oAudio = document.getElementById('bump');
       for(var i = 0; i < map.invinsibles.length;i++) {
            var invinsibles = map.invinsibles[i];
            if(mario.x == invinsibles.x && mario.y == invinsibles.y) {
                console.log(invinsibles.myImgCellFull.src);
                if(invinsibles.myImgCellFull.src == 'http://localhost/mario/image/cell/box.png') {
                oAudio.play();
                invinsibles.myImgCellFull.src = 'image/cell/off.png';
                }
            }
        }
   };
   this.interval = setInterval(function () {
    invinsibles.checkCollisionEtoile();
   }, 100);
};
var Invinsible = function (y, x, image) {
   Cell.call(this, y, x, image);
    var oAudio = document.getElementById('etoile');
    this.direction = 'left';
   this.checkCollisionEtoiles = function () {
       for(var i = 0; i < map.invinsible.length;i++) {
            var invinsible = map.invinsible[i];
            //console.log(invinsible);
            if(mario.x == invinsible.x && mario.y == invinsible.y+1) {
                if(invinsibles.myImgCellFull.src == 'http://localhost/mario/image/cell/box.png') {
                    oAudio.play();
                    invinsible.myImgCellFull.src = 'image/cell/invincible.png';
                }
            }
            if(mario.x == invinsible.x && mario.y == invinsible.y) {
                var oAudi = document.getElementById('musicStars');
                invinsible.myImgCellFull.src = 'image/cell/cellVoid.png';
                mario.myImgCellFull.src = 'image/mario/Mario_Stars.gif';
                oAudi.play();
            }
        }
   };
   this.moveEtoiles = function () {
       if(this.direction == 'left' && invinsible.checkCollision(schema[invinsible.y][invinsible.x-1],"w") == false && invinsible.checkCollision(schema[invinsible.y][invinsible.x-1],"z") == false && invinsible.myImgCellFull.src == 'http://localhost/mario/image/cell/invincible.png') {
        invinsible.x --;
       }  else if(this.direction == 'left' && invinsible.checkCollision(schema[invinsible.y][invinsible.x-1],"w") == true  || invinsible.checkCollision(schema[invinsible.y][invinsible.x-1],"z") === true ) {
        this.direction = "right";
       }
       if (this.direction == "right" && invinsible.checkCollision(schema[invinsible.y][invinsible.x+1],"w") == false && invinsible.checkCollision(schema[invinsible.y][invinsible.x-1],"z") == false && invinsible.myImgCellFull.src == 'http://localhost/mario/image/cell/invincible.png') {
        invinsible.x++;
       } else if(this.direction == 'right' && invinsible.checkCollision(schema[invinsible.y][invinsible.x+1],"w") == true) {
        this.direction = "left";
       }
   };
   this.interval = setInterval(function () {
    invinsible.checkCollisionEtoiles();
    invinsible.update();
   }, 100);
   this.inter = setInterval(function () {
    invinsible.moveEtoiles();
   }, 200);
};
var Mario = function (y, x, image) {
    Cell.call(this, y, x, image);
    var scoreee = 0;
    document.getElementById("scoreKoopa").innerHTML = '<p> Koopa Die: ' + scoreee +'</p>';
    this.falling = false;
    this.jumps = 0;
    this.status = "off";
    var Up = "ArrowUp";
    this.input = new Input(['ArrowUp', 'Space', 'ArrowLeft','ArrowRight']);
    this.jump = {
        power: 0, // hauteur du saut en nombre de cellules
        interval: null // identifiant de l'intervalle de temps entre chaque animations du saut
    };
    this.makeJump = function () {
        // mario monte d'une case s'il le peut et s'il lui reste du power
        // s'il ne le peut pas, il met fin Ã  l'intervalle de temps entre chaque animation du saut
        // mario met Ã  jour le dom Ã  chaque animation de saut
        // si mario saute dans un koopa, il meurt
        if(mario.jumps > 0 && mario.checkCollision(schema[mario.y-1][mario.x],"w") == false) {
            mario.jumps--;
            mario.y--;
        }
    };
    this.fall = function () {
        // mario se dÃ©place d'une cellule vers le bas s'il le peut et met falling Ã  true
        // si mario tombe sur un koopa, il meurt
        if(mario.jumps == 0 && mario.checkCollision(schema[mario.y+1][mario.x],"w") == false) {
            mario.y++;
        } else if (mario.checkCollision(schema[mario.y-1][mario.x],"w") == true) {
            mario.y-1;
            mario.jumps = 0;
        }
    };
    function disablekeyboard() {
    document.addEventListener("keydown", handler, true);
        function handler(e) {
            e.stopPropagation();
            e.preventDefault();
        }
    }
    this.checkCollisionDie = function () {
        var oAudio = document.getElementById('gameovere');
        for(var i = 0; i < map.koopa.length;i++) {
            var koopa = map.koopa[i];
            if(mario.x == koopa.x && mario.y == koopa.y) {
                disablekeyboard();
                oAudio.play();
                document.getElementById("gameover").innerHTML = '<p>Game Over</p>';
                document.getElementById("restart").innerHTML = '<p><a href="#" onclick="location.reload()">Restart</a></p>';
                document.getElementById("quit").innerHTML = '<p><a href="#" onclick="location.replace("http://google.com")">Quit</a></p>';
                mario.myImgCellFull.src = 'image/mario/marioRedSmallDie.png';
                if(mario.checkCollision(schema[mario.y+1][mario.x],"w") == true || mario.checkCollision(schema[mario.y+1][mario.x],"w") == false) {
                    mario.y--;
                }
            }
            else if(mario.x == koopa.x && mario.y == koopa.y-1) {
                //koopa.myImgCellFull.src = 'image/koopa/koopaDie.png';
                console.log("1 win");
                koopa.x = 1;
                koopa.y = 1;
                if(koopa.y === 1 & koopa.x === 1) {
                      if(scoreee == 0) {
                        scoreee = 1;
                        koopa.myImgCellFull.src = 'image/koopa/koopaDie.png';
                        document.getElementById("scoreKoopa").innerHTML = '<p> Koopa Die: ' + scoreee +'</p>';
                      }
                      koopa.myImgCellFull.src = 'image/koopa/koopaDie.png';
                      document.getElementById("scoreKoopa").innerHTML = '<p> Koopa Die: ' + scoreee++ +'</p>';
                }
               var statusKoopa = 1;
            }
        }
        return false;
    };
    this.move = function () {
        if(mario.checkCollision(schema[mario.y][mario.x+1],"z") == true || mario.checkCollision(schema[mario.y][mario.x-1],"z") == true) {
             var oAudio = document.getElementById('win');
                disablekeyboard();
                statusMap = "ON";
                localStorage.setItem("statusLVLmap", statusMap);
                oAudio.play();
                document.getElementById("gameover").innerHTML = '<p>Win</p>';
                document.getElementById("restart").innerHTML = '<p><a href="#" onclick="location.reload()">Restart</a></p>';
                document.getElementById("quit").innerHTML = '<p><a href="#" onclick="location.replace("http://google.com")">Quit</a></p>';
                mario.myImgCellFull.src = 'image/mario/marioWin.png';
                peach.myImgCellFull.src = 'image/cell/cellVoid.png';
                if(mario.checkCollision(schema[mario.y+1][mario.x],"w") == true || mario.checkCollision(schema[mario.y+1][mario.x],"w") == false) {
                    mario.y--;
                }
                 this.interval = setInterval(function () {
                   location.reload()
                }, 200000);
        }
        document.onkeydown = checkKey;
        function checkKey(e) {
            var oAudio = document.getElementById('myaudio');
            e = e || window.event;
            //up
            if (e.keyCode == '38' && mario.jumps == 0 && mario.checkCollision(schema[mario.y+1][mario.x],"w") == true) {
                if(mario.jumps == 0 && mario.checkCollision(schema[mario.y-1][mario.x],"w") == false) {
                    mario.jumps = 3;
                    oAudio.play();
                    mario.myImgCellFull.src = 'image/mario/marioRedSmallUp.png';
                }
            }
            //up
            else if (e.keyCode == '32' && mario.jumps == 0 && mario.checkCollision(schema[mario.y+1][mario.x],"w") == true) {
                 if(mario.jumps == 0 && mario.checkCollision(schema[mario.y-1][mario.x],"w") == false) {
                    mario.jumps = 3;
                    oAudio.play();
                    mario.myImgCellFull.src = 'image/mario/marioRedSmallUp.png';
                 }
            }
            //left
            else if (e.keyCode == '37') {
                mario.myImgCellFull.src = 'image/mario/marioRedSmallLeft.png';
                 if(mario.checkCollision(schema[mario.y][mario.x-1],"w") == false) {
                    mario.x--;
                    mario.myImgCellFull.src = 'image/mario/marioRedSmallLeft.png';
                 }
            }
            //right
            else if (e.keyCode == '39') {
                if(mario.checkCollision(schema[mario.y][mario.x+1],"w") == false) {
                    mario.x++;
                    mario.myImgCellFull.src = 'image/mario/Mario_move.gif';
                }
            }
        }
    };

    this.interval = setInterval(function () {
        mario.makeJump();
        mario.fall();
        mario.move();
        mario.checkCollisionDie();
        mario.update();
    }, 100);
};

var Koopa = function (y, x, image) {
    Cell.call(this, y, x, image);
    // Koopa hÃ©rite de Cell
    this.direction = 'left';
    this.die = function() {
        // koopa met fin Ã  son intervalle d'animations
        // koopa est retirÃ© de la map
    };
    this.move = function () {
       if(this.direction == 'left' && thi.checkCollision(schema[thi.y][thi.x-1],"w") == false && thi.checkCollision(schema[thi.y][thi.x-1],"z") == false) {
           //console.log("Koopa X=" + thi.x + " Y=" + thi.y);
        thi.x --;
       }
       else if(this.direction == 'left' && thi.checkCollision(schema[thi.y][thi.x-1],"w") == true  || thi.checkCollision(schema[thi.y][thi.x-1],"z") === true ) {
        this.direction = "right";
        thi.myImgCellFull.src = 'image/koopa/koopaRedRight.png';
       }
       if (this.direction == "right" && thi.checkCollision(schema[thi.y][thi.x+1],"w") == false) {
        thi.x++;
       }
       else if(this.direction == 'right' && thi.checkCollision(schema[thi.y][thi.x+1],"w") == true) {
        this.direction = "left";
        thi.myImgCellFull.src = 'image/koopa/koopaRed.png';
       }
        // koopa se dÃ©place en direction de direction s'il le peut
        // sinon il change de direction
        // si koopa recontre mario, mario meurt
    };
    this.fall = function () {
        // koopa se dÃ©place d'une cellule vers le bas s'il le peut
            if(thi.checkCollision(schema[thi.y+1][thi.x],"w") == false) {
                thi.y++;
            }
    };
    this.checkCollisionKoopa = function () {
       for(var i = 0; i < map.koopa.length; i++) {
        if(this.direction == "left") {
            thi.myImgCellFull.src = 'image/koopa/koopaRed.png';
           if(thi.x == map.koopa[i].x+1 && thi.y == map.koopa[i].y) {
            this.direction = "right";
            map.koopa[i].direction = "left";
           }
        }
        if(this.direction == "right") {
            thi.myImgCellFull.src = 'image/koopa/koopaRedRight.png';
           if(thi.x == map.koopa[i].x-1 && thi.y == map.koopa[i].y) {
            this.direction = "left";
            map.koopa[i].direction = "right";
           }
        }

      }
    };
    var thi = this;
    this.interval = setInterval(function () {
       thi.fall();
       thi.checkCollisionKoopa();
       thi.move();
       thi.update();
    }, 200);
};

var Input = function (newDirection) {
    this.newDirection = {};
};

var Map = function (model) {
    this.map = [];
    this.koopa = [];
    this.stars = [];
    this.peach = [];
    this.invinsibles = [];
    this.invinsible = [];
    this.generateMap = function () {
        this.koopa = [];
        for(var x = 0; x < model.length; x++) {
            for(var y = 0; y < model[x].length; y++) {
                if(model[x][y] == "w")
                 this.map.push(cellFull = new Cell(x,y,'image/cell/cellFull.png'));
                if(model[x][y] == "t")
                 this.map.push(cellFull = new Cell(x,y,'image/cell/herbe.png'));
//                if(model[x][y] == " ")
//                 this.map.push(new Cell(x,y,'image/cell/cellVoid.png'));
                if(model[x][y] == "m")
                 this.map.push(mario = new Mario(x,y,'image/mario/marioRedSmallRight.png'));
                if(model[x][y] == "k")
                 this.koopa.push(new Koopa(x,y,'image/koopa/koopaRed.png'));
                if(model[x][y] == "z")
                 this.map.push(peach = new Cell(x,y,'image/cell/newMap.png'));
                if(model[x][y] == "l")
                 this.stars.push(star = new Stars(x,y,'image/cell/stars.png'));
                if(model[x][y] == "e")
                 this.invinsibles.push(invinsibles = new Invinsibles(x,y,'image/cell/box.png'));
                if(model[x][y] == "p")
                 this.invinsible.push(invinsible = new Invinsible(x,y,'image/cell/cellVoid.png'));
            }
        }
    };
};
var schema = [
    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
    'w w                                    w',
    'ww                                     w',
    'w     l       ll                       w',
    'wz    k                           k    w',
    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww wwww  ww',
    'w                                    www',
    'w                                  wwwww',
    'w                               lwwwwwww',
    'w                              wwwwwwwww',
    'w  l      l   l              wwwwwwwwwww',
    'w          k    w          wwwwwwwwwwwww',
    'wwwwwwwwwwwwwwwww   ww ww wwwwwwwwwwwwww',
    'w                   w  k        k      w',
    'w           lwwwww wwwwwwwwwwwwwwwwwwwww',
    'w            w                         w',
    'w    p      ww                         w',
    'w    e     www                         w',
    'w  l  l   wwww                         w',
    'wm       wwwww k       w    k          w',
    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'
];
var schema2 = [
    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
    'w w                                    w',
    'ww                                     w',
    'w                                      w',
    'wz    k      llll   ll            k    w',
    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww wwww  ww',
    'w                                    www',
    'w                                  wwwww',
    'w                                wwwwwww',
    'w                              wwwwwwwww',
    'w  l   l  l   l              wwwwwwwwwww',
    'w  k   kk  k    w          wwwwwwwwwwwww',
    'wwwwwwwwwwwwwwwww   ww ww wwwwwwwwwwwwww',
    'w                   w  k        k      w',
    'w           lwwwww wwwwwwwwwwwwwwwwwwwww',
    'w            w                         w',
    'w    p     kww                         w',
    'w    e     www                         w',
    'ww l  l   wwww                         w',
    'wm       wwwww k  kkk  w    k          w',
    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'
];
var statusMap = "OFF";
//if(localStorage.getItem("statusLVLmap") == "OFF") {
    localStorage.setItem("statusLVLmap", statusMap);
    var map = new Map(schema);
    map.generateMap();
//}
//else if(localStorage.getItem("statusLVLmap") == "ON") {
//    localStorage.setItem("statusLVLmap", statusMap);
//    var map = new Map(schema2);
//    map.generateMap();
//}