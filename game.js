const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
const page = document.getElementById('page');
const mc = new Hammer(page);

context.scale(20, 20);
function arenaSweep() {
    let rowCount = 1;
    outer: for (let y = arena.length - 1; y > 0; --y) {
        for (let x = 0; x < arena[y].length; ++x) {
            if (arena[y][x] === 0) {
                continue outer;
            }
        }
        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        y++;

        player.score += rowCount * 10;
        rowCount *= 2;
    }
}
const matrix = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
];
function collide(arena, player) {
    const m = player.matrix;
    const o = player.pos;
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
                (arena[y + o.y] &&
                arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}
function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

function createPiece(type) {
    switch (type) {
        case 'T':
                return [
                        [0, 0, 0],
                        [1, 1, 1],
                        [0, 1, 0],
                    ];
        case 'O': return [
                        [2, 2],
                        [2, 2],
                    ];
        case 'L': return [
                        [0, 3, 0],
                        [0, 3, 0],
                        [0, 3, 3],
                    ];
        case 'J': return [
                        [0, 4, 0],
                        [0, 4, 0],
                        [4, 4, 0],
                    ];
        case 'I': return [
                        [0, 5, 0, 0],
                        [0, 5, 0, 0],
                        [0, 5, 0, 0],
                        [0, 5, 0, 0],
                    ];
        case 'S': return [
                        [0, 6, 6],
                        [6, 6, 0],
                        [0, 0, 0],
                    ];
        case 'Z': return [
                        [7, 7, 0],
                        [0, 7, 7],
                        [0, 0, 0],
                    ];
                }
}
function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawMatrix(arena, {x: 0, y: 0});
    drawMatrix(player.matrix, player.pos);
}

function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = colors[value];
                context.fillRect(x + offset.x,
                                 y  + offset.y,
                                 1, 1);
            }
        });
    });
}

function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

function playerDrop() {
    player.pos.y++;
    if (collide(arena, player)) {
        player.pos.y--;
        merge(arena, player);
        playerReset();
        arenaSweep();
        updateScore();
    }
    dropCounter = 0;
}

function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [
                matrix[x][y],
                matrix[y][x],
            ] = [
                matrix[y][x],
                matrix[x][y],
            ];
        }
    }
    if (dir > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}

let dropCounter = 0;
let dropInterval = 500;

let lastTime = 0;

function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
    }

    draw();
    requestAnimationFrame(update);
}
function updateScore() {
    document.getElementById('score').innerText = player.score;
}

const colors = [
    null,
    '#324D5C',
    '#46B29D',
    '#F0CA4D',
    '#E37B40',
    '#F53855',
    '#46B277',
    '#E34D84',
]
const arena = createMatrix(12, 20);

const player = {
    pos: {x: 0, y:  0},
    matrix: null,
    score: 0,
}

function playerMove(dir) {
    player.pos.x += dir;
    if (collide(arena, player)) {
        player.pos.x -= dir;
    }
}
function playerReset() {
    const pieces = 'ILJOTSZ';
    player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
    player.pos.y = 0;
    player.pos.x = (arena[0].length / 2 | 0) -
                    (player.matrix[0].length / 2 | 0);
    if (collide(arena, player)) {
        arena.forEach(row => row.fill(0));
        player.score = 0;
        updateScore();
    }
}
function playerRotate(dir) {
    const pos = player.pos;
    let offset = 1;
    rotate(player.matrix, dir);
    while (collide(arena, player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1))
        if (offset > player.matrix[0].length) {
            rotate(player.matrix, -dir);
            player.pos.x = pos;
            return;
        }
    }
}
document.addEventListener('keydown', event => {
    switch(event.keyCode) {
        case 65:
            playerMove(-1);
            break;

        case 68:
            playerMove(1);
            break;
        case 83:
            playerDrop();
            break;
        case 87:
                player.pos.y--;
                alert('CHEATER');
                break;
        case 188:
                playerRotate(-1);
                break;
        case 190:
                playerRotate(1);
                break;
        case 49:
                arena = createMatrix(12, 20);
                playerReset();
                break;
    }
});

// mc.on('swipeleft', function(ev) {
//     playerMove(-1);
// });
// mc.on('swiperight', function(ev) {
//     playerMove(1);
// });
// mc.on('swipedown', function(ev) {
//     playerDrop();
// });
// mc.on('tap', function(ev) {
//     playerRotate(1);
// });
mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
 mc.on("swipeleft swiperight swipeup swipedown tap press", function(ev) {
     switch(ev.type) {
        case 'swipeleft':
            playerMove(-1);
            break;
        case 'swiperight':
            playerMove(1);
            break;
        case 'swipedown':
            playerDrop();
            break;
        case 'tap':
            playerRotate(1);
     }
 })



playerReset();
updateScore();
update();