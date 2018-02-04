class Game {
    constructor() {
        this.paused = true;
        this.colors = [
            null,
            '#324D5C',
            '#4678b2',
            '#F0CA4D',
            '#E37B40',
            '#F53855',
            '#46B277',
            '#9f4de3',
        ]
    }

    togglePause() {
        this.paused = !this.paused;
    }
    draw() {
        context.fillStyle = '#000000';
        context.fillRect(0, 0, canvas.width, canvas.height);

        this.drawMatrix(board.playMatrix, {x: 0, y: 0});
        this.drawMatrix(player.currentPiece, player.pos);
    }

    drawMatrix(matrix, positionOffset) {
        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    context.fillStyle = this.colors[value];
                    context.fillRect(x + positionOffset.x,
                                     y  + positionOffset.y,
                                     1, 1);
                }
            });
        });
    }
}