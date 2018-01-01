var Koopa = function (y, x, image) {
    // Koopa hÃ©rite de Cell
    this.direction = 'left';
    this.die = function() {
        // koopa met fin Ã  son intervalle d'animations
        // koopa est retirÃ© de la map
    };
    this.move = function () {
        // koopa se dÃ©place en direction de direction s'il le peut
        // sinon il change de direction
        // si koopa recontre mario, mario meurt
    };
    this.fall = function () {
        // koopa se dÃ©place d'une cellule vers le bas s'il le peut
    };
    this.interval = setInterval(function () {
        koopa.fall();
        koopa.move();
        koopa.update();
    }, 200);
}
