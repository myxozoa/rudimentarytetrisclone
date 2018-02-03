const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
const page = document.getElementById('page');
const swyper = new Hammer(page);

context.scale(20, 20);

const player = new Player();
const board = new Board();
const game = new Game();

const colors = [
    null,
    '#324D5C',
    '#4678b2',
    '#F0CA4D',
    '#E37B40',
    '#F53855',
    '#46B277',
    '#9f4de3',
]

function decreaseInterval() {
    dropInterval -= 10;
    console.log('dropping');
}

function scoreMultIncrease() {
    scoreMult++;
    console.log('level up');
}

board.createMatrix(12, 20);

let lastTime = 0;
let dropCounter = 0;
let dropInterval = 500;
let scoreMult = 1;

const decrem = setInterval(decreaseInterval, 4000);
const levelUp = setInterval(scoreMultIncrease, 20000);

function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        player.drop();
    }

    game.draw();
    window.requestAnimationFrame(update);
}

document.addEventListener('keydown', event => {
    switch(event.keyCode) {
        case 65:
            player.move(-1);
            break;

        case 68:
            player.move(1);
            break;
        case 83:
            player.drop();
            break;
        case 87:
                player.pos.y--;
                alert('CHEATER');
                break;
        case 188:
                player.rotate(-1);
                break;
        case 190:
                player.rotate(1);
                break;
        case 49:
                board.createMatrix(12, 20);
                player.reset();
                break;
    }
});

swyper.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
 swyper.on("swipeleft swiperight swipeup swipedown tap press", function(ev) {
     switch(ev.type) {
        case 'swipeleft':
            player.move(-1);
            break;
        case 'swiperight':
            player.move(1);
            break;
        case 'swipedown':
            player.drop();
            break;
        case 'tap':
            player.rotate(1);
     }
 });

player.reset();
game.updateScore();
update();