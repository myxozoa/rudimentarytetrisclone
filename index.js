const canvas = document.getElementById('game');
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
        player.drop(1);
    }

    game.draw();
    window.requestAnimationFrame(update);
}

document.addEventListener('keydown', event => {
    switch(event.key) {
        case "a":
            player.move(-1, 1);
            break;
        case "A":
            player.move(-1, 5);
            break;
        case "d":
            player.move(1, 1);
            break;
        case "D":
            player.move(1, 5);
            break;
        case "s":
            player.drop(1);
            break;
        case "S":
            player.drop(15);
            break;
        case " ":
                player.pos.y--;
                alert('PAUSE');
                break;
        case ",":
                player.rotate(-1);
                break;
        case ".":
                player.rotate(1);
                break;
        case "Backspace":
                board.createMatrix(12, 20);
                player.reset();
                break;
    }
});

swyper.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
 swyper.on("swipeleft swiperight swipeup swipedown tap press", function(ev) {
     switch(ev.type) {
        case 'swipeleft':
            player.move(-1, 1);
            break;
        case 'swiperight':
            player.move(1, 1);
            break;
        case 'swipedown':
            player.drop(1);
            break;
        case 'tap':
            player.rotate(1);
     }
 });

player.reset();
game.updateScore();
update();