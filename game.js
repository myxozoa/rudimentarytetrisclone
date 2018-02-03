class Game {
    constructor() {

    }

    draw() {
        context.fillStyle = '#000';
        context.fillRect(0, 0, canvas.width, canvas.height);

        this.drawMatrix(board.playMatrix, {x: 0, y: 0});
        this.drawMatrix(player.currentPiece, player.pos);
    }

    drawMatrix(matrix, positionOffset) {
        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    context.fillStyle = colors[value];
                    context.fillRect(x + positionOffset.x,
                                     y  + positionOffset.y,
                                     1, 1);
                }
            });
        });
    }

    updateScore() {
        document.getElementById('score').innerText = player.score;
    }
}