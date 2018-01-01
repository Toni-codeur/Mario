var Mario = function (y, x, image) {
    // Mario hÃ©rite de Cell
    this.falling = false;
    this.input = new Input(['ArrowLeft', 'ArrowRight', 'Space']);
    this.jump = {
        power: 0, // hauteur du saut en nombre de cellules
        interval: null // identifiant de l'intervalle de temps entre chaque animations du saut
    };
    this.makeJump = function () {
        // mario monte d'une case s'il le peut et s'il lui reste du power
        // s'il ne le peut pas, il met fin Ã  l'intervalle de temps entre chaque animation du saut
        // mario met Ã  jour le dom Ã  chaque animation de saut
        // si mario saute dans un koopa, il meurt
    };
    this.fall = function () {
        // mario se dÃ©place d'une cellule vers le bas s'il le peut et met falling Ã  true
        // si mario tombe sur un koopa, il meurt
    };
    this.die = function () {
        // mario met fin Ã  son intervalle d'animations
        // mario est retirÃ© de la map
    };
    this.move = function () {
        // si l'Input est flÃ¨che de gauche, mario se dÃ©place Ã  gauche s'il le peut
        // si l'Input est flÃ¨che de droite, mario se dÃ©place Ã  droite s'il le peut
        // si l'Input est espace, mario commence un saut
        // si mario rencontre un koopa aprÃ¨s son dÃ©placement, il meurt
    };
    this.interval = setInterval(function () {
        mario.fall();
        mario.move();
        mario.update();
    }, 100);
};