const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const page = document.getElementById('page');
const swyper = new Hammer(page);

context.scale(20, 20);

const player = new Player();
const board = new Board();
const game = new Game();

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
let paused = true;

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
    player.updateScore();
    if (!game.paused) {
        window.requestAnimationFrame(update);
    }
}

player.newPiece();
update();