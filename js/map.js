var Cell = function (y, x, image) {
    this.x = x;
    this.y =  y;
    this.image = image;
    // crÃ©e un Ã©lÃ©ment img et l'insÃ¨re dans le DOM aux coordonnÃ©es x et y
    this.update = function () {
        // met Ã  jour la position de la cellule dans le DOM
    };
    this.checkCollision = function (cell) {
        // retourne true si la cellule est aux mÃªme coordonnÃ©es que cell
    };
    this.die = function () {
        // dÃ©truit l'objet et le remove de la map
    };
};

var Input = function (keys) {
    this.keys = {};
    // Input rÃ©cupÃ¨re les touches actives du clavier
}

var Map = function (model) {
    this.map = [];
    this.generateMap = function () {
        // instancie les classes correspondants au schema
        // avec :
        //      w => Cell
        //      k => Koopa
        //      m => Mario
    };
    this.checkCollision = function (cell) {
        // parcourt la map et renvoie la cellule aux mÃªmes coordonnÃ©es que cell
    };
    this.delete = function (cell) {
        // retire la cell de map
        // retire la cell du dom
        // delete la cell
    };
};

var schema = [
    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
    'w                                      w',
    'w                                 k    w',
    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww    w',
    'w                                      w',
    'w                                      w',
    'w                                      w',
    'w                                      w',
    'w                                      w',
    'w          k    w                      w',
    'wwwwwwwwwwwwwwwww                      w',
    'w                   w           k      w',
    'w            wwwww  wwwwwwwwwwwwwwwwwwww',
    'w            w                         w',
    'w           ww                         w',
    'w          www                         w',
    'w         wwww                         w',
    'wm       wwwww k     w      k          w',
    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'
];
var map = new Map(schema);
map.generateMap();
